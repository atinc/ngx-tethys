/**
 * liteMarked - a markdown parser
 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/chjj/marked
 */

;(function () {

    /**
     * Block-Level Grammar
     */

    var block = {
        newline: /^\n+/,
        code: /^( {4}[^\n]+\n*)+/,
        fences: noop,
        hr: /^( *[-*_]){3,} *(?:\n+|$)/,
        heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
        nptable: noop,
        lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
        blockquote: /^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,
        list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
        html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
        def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
        table: noop,
        paragraph: /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
        text: /^[^\n]+/
    };

    block.bullet = /(?:[*+-]|\d+\.)/;
    block.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;
    block.item = replace(block.item, 'gm')
    (/bull/g, block.bullet)
    ();

    block.list = replace(block.list)
    (/bull/g, block.bullet)
    ('hr', '\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))')
    ('def', '\\n+(?=' + block.def.source + ')')
    ();

    block.blockquote = replace(block.blockquote)
    ('def', block.def)
    ();

    block._tag = '(?!(?:'
        + 'a|em|strong|small|s|cite|q|dfn|abbr|data|time|code'
        + '|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo'
        + '|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b';

    block.html = replace(block.html)
    ('comment', /<!--[\s\S]*?-->/)
    ('closed', /<(tag)[\s\S]+?<\/\1>/)
    ('closing', /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)
    (/tag/g, block._tag)
    ();

    block.paragraph = replace(block.paragraph)
    ('hr', block.hr)
    ('heading', block.heading)
    ('lheading', block.lheading)
    ('blockquote', block.blockquote)
    ('tag', '<' + block._tag)
    ('def', block.def)
    ();

    /**
     * Normal Block Grammar
     */

    block.normal = merge({}, block);

    /**
     * GFM Block Grammar
     */

    block.gfm = merge({}, block.normal, {
        fences: /^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,
        paragraph: /^/,
        heading: /^ *(#{1,6})+([^\n]+?) *#* *(?:\n+|$)/
    });

    block.gfm.paragraph = replace(block.paragraph)
    ('(?!', '(?!'
        + block.gfm.fences.source.replace('\\1', '\\2') + '|'
        + block.list.source.replace('\\1', '\\3') + '|')
    ();

    /**
     * GFM + Tables Block Grammar
     */

    block.tables = merge({}, block.gfm, {
        nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
        table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
    });

    /**
     * Block Lexer
     */

    function Lexer(options) {
        this.tokens = [];
        this.tokens.links = {};
        this.options = options || liteMarked.defaults;
        this.rules = block.normal;

        if (this.options.gfm) {
            if (this.options.tables) {
                this.rules = block.tables;
            } else {
                this.rules = block.gfm;
            }
        }
    }

    /**
     * Expose Block Rules
     */

    Lexer.rules = block;

    /**
     * Static Lex Method
     */

    Lexer.lex = function (src, options) {
        var lexer = new Lexer(options);
        return lexer.lex(src);
    };

    /**
     * Preprocessing
     */

    Lexer.prototype.lex = function (src) {
        src = src
            .replace(/\r\n|\r/g, '\n')
            .replace(/\t/g, '    ')
            .replace(/\u00a0/g, ' ')
            .replace(/\u2424/g, '\n');

        return this.token(src, true);
    };

    /**
     * Lexing
     */

    Lexer.prototype.token = function (src, top, bq) {
        var src = src.replace(/^ +$/gm, '')
            , next
            , loose
            , cap
            , bull
            , b
            , item
            , space
            , i
            , l;

        while (src) {
            // newline
            if (cap = this.rules.newline.exec(src)) {
                src = src.substring(cap[0].length);
                if (cap[0].length > 1) {
                    this.tokens.push({
                        type: 'space'
                    });
                }
            }

            // code
            if (cap = this.rules.code.exec(src)) {
                var origin = cap[0];
                src = src.substring(cap[0].length);
                cap = cap[0].replace(/^ {4}/gm, '');
                this.tokens.push({
                    type: 'code',
                    text: !this.options.pedantic
                        ? cap.replace(/\n+$/, '')
                        : cap,
                    origin: origin
                });
                continue;
            }

            // fences (gfm)
            if (cap = this.rules.fences.exec(src)) {
                src = src.substring(cap[0].length);
                this.tokens.push({
                    type: 'code',
                    lang: cap[2],
                    text: cap[3] || ''
                });
                continue;
            }

            // heading
            if (this.options.heading && (cap = this.rules.heading.exec(src))) {
                src = src.substring(cap[0].length);
                this.tokens.push({
                    type: 'heading',
                    depth: cap[1].length,
                    text: cap[2],
                    origin: cap[0]
                });
                continue;
            }

            // table no leading pipe (gfm)
            if (top && (cap = this.rules.nptable.exec(src))) {
                src = src.substring(cap[0].length);

                item = {
                    type: 'table',
                    header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
                    align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
                    cells: cap[3].replace(/\n$/, '').split('\n')
                };

                for (i = 0; i < item.align.length; i++) {
                    if (/^ *-+: *$/.test(item.align[i])) {
                        item.align[i] = 'right';
                    } else if (/^ *:-+: *$/.test(item.align[i])) {
                        item.align[i] = 'center';
                    } else if (/^ *:-+ *$/.test(item.align[i])) {
                        item.align[i] = 'left';
                    } else {
                        item.align[i] = null;
                    }
                }

                for (i = 0; i < item.cells.length; i++) {
                    item.cells[i] = item.cells[i].split(/ *\| */);
                }

                this.tokens.push(item);

                continue;
            }

            // lheading
            if (cap = this.rules.lheading.exec(src)) {
                src = src.substring(cap[0].length);
                this.tokens.push({
                    type: 'heading',
                    depth: cap[2] === '=' ? 1 : 2,
                    text: cap[1]
                });
                continue;
            }

            // hr
            if (cap = this.rules.hr.exec(src)) {
                src = src.substring(cap[0].length);
                this.tokens.push({
                    type: 'hr',
                    origin: cap[0]
                });
                continue;
            }

            // blockquote
            if (cap = this.rules.blockquote.exec(src)) {
                src = src.substring(cap[0].length);

                this.tokens.push({
                    type: 'blockquote_start'
                });

                cap = cap[0].replace(/^ *> ?/gm, '');

                // Pass `top` to keep the current
                // "toplevel" state. This is exactly
                // how markdown.pl works.
                this.token(cap, top, true);

                this.tokens.push({
                    type: 'blockquote_end'
                });

                continue;
            }

            // list
            if (this.options.list && (cap = this.rules.list.exec(src))) {
                src = src.substring(cap[0].length);
                bull = cap[2];

                this.tokens.push({
                    type: 'list_start',
                    ordered: bull.length > 1,
                    origin: cap[0]
                });

                // Get each top-level item.
                cap = cap[0].match(this.rules.item);

                next = false;
                l = cap.length;
                i = 0;

                for (; i < l; i++) {
                    item = cap[i];

                    // Remove the list item's bullet
                    // so it is seen as the next token.
                    space = item.length;
                    item = item.replace(/^ *([*+-]|\d+\.) +/, '');

                    // Outdent whatever the
                    // list item contains. Hacky.
                    if (~item.indexOf('\n ')) {
                        space -= item.length;
                        item = !this.options.pedantic
                            ? item.replace(new RegExp('^ {1,' + space + '}', 'gm'), '')
                            : item.replace(/^ {1,4}/gm, '');
                    }

                    // Determine whether the next list item belongs here.
                    // Backpedal if it does not belong in this list.
                    if (this.options.smartLists && i !== l - 1) {
                        b = block.bullet.exec(cap[i + 1])[0];
                        if (bull !== b && !(bull.length > 1 && b.length > 1)) {
                            src = cap.slice(i + 1).join('\n') + src;
                            i = l - 1;
                        }
                    }

                    // Determine whether item is loose or not.
                    // Use: /(^|\n)(?! )[^\n]+\n\n(?!\s*$)/
                    // for discount behavior.
                    loose = next || /\n\n(?!\s*$)/.test(item);
                    if (i !== l - 1) {
                        next = item.charAt(item.length - 1) === '\n';
                        if (!loose) loose = next;
                    }

                    this.tokens.push({
                        type: loose
                            ? 'loose_item_start'
                            : 'list_item_start',
                        origin: cap[i]
                    });

                    // Recurse.
                    this.token(item, false, bq);

                    this.tokens.push({
                        type: 'list_item_end',
                        origin: cap[i]
                    });
                }

                this.tokens.push({
                    type: 'list_end',
                    origin: cap[0]
                });

                continue;
            }

            // html
            if (cap = this.rules.html.exec(src)) {
                src = src.substring(cap[0].length);
                this.tokens.push({
                    type: this.options.sanitize
                        ? 'paragraph'
                        : 'html',
                    pre: !this.options.sanitizer
                    && (cap[1] === 'pre' || cap[1] === 'script' || cap[1] === 'style'),
                    text: cap[0],
                    origin: cap[0]
                });
                continue;
            }

            // def
            if (this.options.isDef) {
                if ((!bq && top) && (cap = this.rules.def.exec(src))) {
                    src = src.substring(cap[0].length);
                    this.tokens.links[cap[1].toLowerCase()] = {
                        href: cap[2],
                        title: cap[3]
                    };
                    continue;
                }
            }
            // table (gfm)
            if (top && (cap = this.rules.table.exec(src))) {
                src = src.substring(cap[0].length);

                item = {
                    type: 'table',
                    header: cap[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
                    align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
                    cells: cap[3].replace(/(?: *\| *)?\n$/, '').split('\n')
                };

                for (i = 0; i < item.align.length; i++) {
                    if (/^ *-+: *$/.test(item.align[i])) {
                        item.align[i] = 'right';
                    } else if (/^ *:-+: *$/.test(item.align[i])) {
                        item.align[i] = 'center';
                    } else if (/^ *:-+ *$/.test(item.align[i])) {
                        item.align[i] = 'left';
                    } else {
                        item.align[i] = null;
                    }
                }

                for (i = 0; i < item.cells.length; i++) {
                    item.cells[i] = item.cells[i]
                        .replace(/^ *\| *| *\| *$/g, '')
                        .split(/ *\| */);
                }

                this.tokens.push(item);

                continue;
            }

            // top-level paragraph
            if (top && (cap = this.rules.paragraph.exec(src))) {
                src = src.substring(cap[0].length);
                this.tokens.push({
                    type: 'paragraph',
                    text: cap[1].charAt(cap[1].length - 1) === '\n'
                        ? cap[1].slice(0, -1)
                        : cap[1],
                    origin: cap[0]
                });
                continue;
            }

            // text
            if (cap = this.rules.text.exec(src)) {
                //console.log('text src:', src);
                //console.log('text cap:', cap);
                // Top-level should never reach here.
                src = src.substring(cap[0].length);
                this.tokens.push({
                    type: 'text',
                    text: cap[0]
                });
                continue;
            }

            if (src) {
                throw new
                    Error('Infinite loop on byte: ' + src.charCodeAt(0));
            }
        }

        return this.tokens;
    };

    /**
     * Inline-Level Grammar
     */

    var inline = {
        escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
        autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
        url: noop,
        tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,
        link: /^!?\[(inside)\]\(href\)/,
        reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
        nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
        strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
        //  htz: fix regex cpu bug
        em: /^\*(?=\S)([\s\S]*?\S)\*(?!\*)/,
//old YB em: /^\b_((?:__|[\s\S])+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
//new YB em: /^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
        code: /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,
        br: /^ {2,}\n(?!\s*$)/,
        del: noop,
        text: /^[\s\S]+?(?=[\\<!\[_*`:#]| {2,}\n|$)/,
        wtlink: /^\[([^@#!]{1}[^\[\]\|]{0,})(\|){1}([^\[\]]{0,}){0,1}\]|^(https{0,1}:\/\/[^\s]{0,})|^\[(https{0,1}:\/\/[^\]]{0,})\]/, // add by wh
        wthexcolor: /^#([a-fA-F0-9]{3}|[a-fA-F0-9]{6})\b/, // add by wh
        wtat: /^\[@(\w*)\|([^\]]+)\]/, // add by wh
        wthash: /^\[#(\w*)\|([^\]]+)\]/, // add by wh
        wtentity: /^\[#(task|event|file|approval)(-)(\w*)\|([^\]]+)\]/, // add by macj
        wtexclamation: /^\[!(\w*)\|([^\]]*)+\]/, // add by wh
        wtemoji: /^\:[a-z0-9_\-\+<>\/]+\:/ //add by wh
    };

    inline._inside = /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;
    inline._href = /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;

    inline.link = replace(inline.link)
    ('inside', inline._inside)
    ('href', inline._href)
    ();

    inline.reflink = replace(inline.reflink)
    ('inside', inline._inside)
    ();

    /**
     * Normal Inline Grammar
     */

    inline.normal = merge({}, inline);

    /**
     * Pedantic Inline Grammar
     */

    inline.pedantic = merge({}, inline.normal, {
        strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
        em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
    });

    /**
     * GFM Inline Grammar
     */

    inline.gfm = merge({}, inline.normal, {
        escape: replace(inline.escape)('])', '~|])')(),
        url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
        del: /^~~(?=\S)([\s\S]*?\S)~~/,
        text: replace(inline.text)
        (']|', '~]|')
        ('|', '|https?://|')
        ()
    });

    /**
     * GFM + Line Breaks Inline Grammar
     */

    inline.breaks = merge({}, inline.gfm, {
        br: replace(inline.br)('{2,}', '*')(),
        text: replace(inline.gfm.text)('{2,}', '*')()
    });

    /**
     * Inline Lexer & Compiler
     */

    function InlineLexer(links, options) {
        this.options = options || liteMarked.defaults;
        this.links = links;
        this.rules = inline.normal;
        this.renderer = this.options.renderer || new Renderer;
        this.renderer.options = this.options;

        if (!this.links) {
            throw new
                Error('Tokens array requires a `links` property.');
        }

        if (this.options.gfm) {
            if (this.options.breaks) {
                this.rules = inline.breaks;
            } else {
                this.rules = inline.gfm;
            }
        } else if (this.options.pedantic) {
            this.rules = inline.pedantic;
        }
    }

    /**
     * Expose Inline Rules
     */

    InlineLexer.rules = inline;

    /**
     * Static Lexing/Compiling Method
     */

    InlineLexer.output = function (src, links, options) {
        var inline = new InlineLexer(links, options);
        return inline.output(src);
    };

    /**
     * Lexing/Compiling
     */

    InlineLexer.prototype.output = function (src) {
        var out = ''
            , link
            , text
            , href
            , cap
            , origin
            , match;

        while (src) {
            // escape
            if (cap = this.rules.escape.exec(src)) {
                src = src.substring(cap[0].length);
                out += cap[1];
                continue;
            }

            // wtlink ;;add by wh
            //console.log('lex src:', src);
            if (this.options.wtlink && (cap = this.rules.wtlink.exec(src))) {
                //console.log('lex wtlink cap:', cap);
                //console.log('lex wtlink index:', cap.index);
                match = cap[0];
                src = src.substring(match.length);

                href = cap[1] || cap[4] || cap[5];
                link = cap[3] || cap[1] || cap[4] || cap[5];
                out += this.renderer.wtlink(href, link);

                //console.log('lex wtlink tokens:', JSON.stringify(this.tokens));
                continue;
            }

            // wtat ;;add by wh
            if (this.options.wtat && (cap = this.rules.wtat.exec(src))) {
                //console.log('lex wtat cap:', cap);
                //console.log('lex wtat index:', cap.index);
                match = cap[0];
                src = src.substring(match.length);

                href = cap[1];
                link = cap[2];
                out += this.renderer.wtat(href, link);

                continue;
            }
            if (this.options.wtentity && (cap = this.rules.wtentity.exec(src))) {
                match = cap[0];
                src = src.substring(match.length);

                var _origin = cap[0];
                var _type = cap[1];
                var _id = cap[3];
                var _name = cap[4];
                out += this.renderer.wtentity(_origin, _type, _id, _name);
                continue;
            }
            // wthash ;;add by wh
            if (this.options.wthash && (cap = this.rules.wthash.exec(src))) {
                //console.log('lex wthash cap:', cap);
                match = cap[0];
                src = src.substring(match.length);

                href = cap[1];
                link = cap[2];
                out += this.renderer.wthash(href, link);

                continue;
            }

            // wtexclamation ;;add by wh
            if (this.options.wtexclamation && (cap = this.rules.wtexclamation.exec(src))) {
                //console.log('lex wtexclamation cap:', cap);
                match = cap[0];
                src = src.substring(match.length);

                var key = cap[1];
                text = cap[2];
                out += this.renderer.wtexclamation(key, text);

                continue;
            }

            // wtemoji ;;add by wh
            if (this.options.wtemoji && (cap = this.rules.wtemoji.exec(src))) {
                //console.log('lex wtemoji cap:', cap);
                match = cap[0];
                src = src.substring(match.length);

                text = cap[0];
                out += this.renderer.wtemoji(text);

                continue;
            }

            // wthexcolor ;;add by wh
            if (this.options.wthexcolor && (cap = this.rules.wthexcolor.exec(src))) {
                //console.log('lex wthexcolor cap:', cap);
                match = cap[0];
                src = src.substring(match.length);

                var color = cap[0];
                out += this.renderer.wthexcolor(color);

                //console.log('lex wthexcolor tokens:', JSON.stringify(this.tokens));
                continue;
            }

            // autolink ;;modify by wh
            if (this.options.link && (cap = this.rules.autolink.exec(src))) {
                src = src.substring(cap[0].length);
                if (cap[2] === '@') {
                    text = cap[1].charAt(6) === ':'
                        ? this.mangle(cap[1].substring(7))
                        : this.mangle(cap[1]);
                    href = this.mangle('mailto:') + text;
                } else {
                    text = escape(cap[1]);
                    href = text;
                }
                origin = cap[0];
                out += this.renderer.link(href, null, text, origin);
                continue;
            }

            // url (gfm) ;;modify by wh
            if (this.options.link && !this.inLink && (cap = this.rules.url.exec(src))) {
                src = src.substring(cap[0].length);
                text = escape(cap[1]);
                href = text;
                origin = cap[0];
                out += this.renderer.link(href, null, text, origin);
                continue;
            }

            // tag
            if (cap = this.rules.tag.exec(src)) {
                if (!this.inLink && /^<a /i.test(cap[0])) {
                    this.inLink = true;
                } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
                    this.inLink = false;
                }
                src = src.substring(cap[0].length);
                out += this.options.sanitize
                    ? this.options.sanitizer
                        ? this.options.sanitizer(cap[0])
                        : escape(cap[0])
                    : cap[0]
                continue;
            }

            // link ;;modify by wh
            if (this.options.link && (cap = this.rules.link.exec(src))) {
                src = src.substring(cap[0].length);
                this.inLink = true;
                out += this.outputLink(cap, {
                    href: cap[2],
                    title: cap[3]
                });
                this.inLink = false;
                continue;
            }

            // reflink, nolink ;;modify by wh
            if (this.options.link && (cap = this.rules.reflink.exec(src))
                || (cap = this.rules.nolink.exec(src))) {
                src = src.substring(cap[0].length);
                link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
                link = this.links[link.toLowerCase()];
                if (!link || !link.href) {
                    out += cap[0].charAt(0);
                    src = cap[0].substring(1) + src;
                    continue;
                }
                this.inLink = true;
                out += this.outputLink(cap, link);
                this.inLink = false;
                continue;
            }

            // strong
            if (cap = this.rules.strong.exec(src)) {
                src = src.substring(cap[0].length);
                out += this.renderer.strong(this.output(cap[2] || cap[1]), cap[0]);
                continue;
            }

            // em
            if (cap = this.rules.em.exec(src)) {
                //console.log('em cap:', cap);
                src = src.substring(cap[0].length);
                out += this.renderer.em(this.output(cap[2] || cap[1]), cap[0]);
                continue;
            }

            // code
            if (cap = this.rules.code.exec(src)) {
                //console.log('code cap:', cap);
                src = src.substring(cap[0].length);
                out += this.renderer.codespan(escape(cap[2], true), cap[0]);
                continue;
            }

            // br
            if (cap = this.rules.br.exec(src)) {
                src = src.substring(cap[0].length);
                out += this.renderer.br();
                continue;
            }

            // del (gfm)
            if (cap = this.rules.del.exec(src)) {
                src = src.substring(cap[0].length);
                out += this.renderer.del(this.output(cap[1]), cap[0]);
                continue;
            }

            // text
            if (cap = this.rules.text.exec(src)) {
                //console.log('inline text cap:', cap);
                src = src.substring(cap[0].length);
                var _text = this.smartypants(cap[0]);
                if (this.options.isTextEscape) {
                    _text = escape(_text);
                }
                out += this.renderer.text(_text);
                continue;
            }

            if (src) {
                throw new
                    Error('Infinite loop on byte: ' + src.charCodeAt(0));
            }
        }

        return out;
    };

    /**
     * Compile Link
     */

    InlineLexer.prototype.outputLink = function (cap, link) {
        var href = escape(link.href)
            , title = link.title ? escape(link.title) : null;

        var origin = cap[0];
        return cap[0].charAt(0) !== '!'
            ? this.renderer.link(href, title, this.output(cap[1]), origin)
            : this.renderer.image(href, title, escape(cap[1]), origin);
    };

    /**
     * Smartypants Transformations
     */

    InlineLexer.prototype.smartypants = function (text) {
        if (!this.options.smartypants) return text;
        return text
        // em-dashes
            .replace(/---/g, '\u2014')
            // en-dashes
            .replace(/--/g, '\u2013')
            // opening singles
            .replace(/(^|[-\u2014/(\[{"\s])'/g, '$1\u2018')
            // closing singles & apostrophes
            .replace(/'/g, '\u2019')
            // opening doubles
            .replace(/(^|[-\u2014/(\[{\u2018\s])"/g, '$1\u201c')
            // closing doubles
            .replace(/"/g, '\u201d')
            // ellipses
            .replace(/\.{3}/g, '\u2026');
    };

    /**
     * Mangle Links
     */

    InlineLexer.prototype.mangle = function (text) {
        if (!this.options.mangle) return text;
        var out = ''
            , l = text.length
            , i = 0
            , ch;

        for (; i < l; i++) {
            ch = text.charCodeAt(i);
            if (Math.random() > 0.5) {
                ch = 'x' + ch.toString(16);
            }
            out += '&#' + ch + ';';
        }

        return out;
    };

    /**
     * Renderer
     */

    function Renderer(options) {
        this.options = options || {};
    }

    Renderer.prototype.code = function (code, lang, escaped, origin) {
        code = code.trim();
        var firstLine = code.split(/\n/)[0].trim();
        if (lang === 'math') { // 数学公式
            var tex = '';
            code.split(/\n\n/).forEach(function (line) { // 连续两个换行，则开始下一个公式
                line = line.trim();
                if (line.length > 0) {
                    try {
                        tex += katex.renderToString(line, {displayMode: true});
                    } catch (err) {
                        tex += '<pre>' + err + '</pre>';
                    }
                }
            });
            return '<div data-line="' + origin + '">' + tex + '</div>';
        } else if (firstLine === 'gantt' || firstLine === 'sequenceDiagram' || firstLine.match(/^graph (?:TB|BT|RL|LR|TD);?$/)) { // mermaid
            if (firstLine === 'sequenceDiagram') {
                code += '\n'; // 如果末尾没有空行，则语法错误
            }
            if (window.mermaid && mermaid.parse(code)) {
                return '<div class="mermaid" data-line="' + origin + '">' + code + '</div>';
            } else {
                if (window.mermaid && mermaid.error) {
                    return '<pre data-line="' + origin + '">' + mermaid.error + '</pre>';
                }
            }
        } else {
            if (this.options.highlight) {
                var out = this.options.highlight(code, lang);
                if (out != null && out !== code) {
                    escaped = true;
                    code = out;
                }
            }

            if (!lang) {
                return '<pre><code>'
                    + (escaped ? code : escape(code, true))
                    + '\n</code></pre>';
            }

            return '<pre><code class="'
                + this.options.langPrefix
                + escape(lang, true)
                + '">'
                + (escaped ? code : escape(code, true))
                + '\n</code></pre>\n';
        }
    };

    Renderer.prototype.blockquote = function (quote) {
        if (this.options.isBlockquoteDefault) {
            return '<blockquote>\n' + quote + '</blockquote>\n';
        } else {
            quote = quote.replace(/<br><br>/, '');
            return '<blockquote>' + quote + '</blockquote>';
        }
    };

    Renderer.prototype.html = function (html, origin) {
        if (this.options.isHtmlDefault) {
            return html;
        } else {
            return origin;
        }
    };

    Renderer.prototype.heading = function (text, level, raw) {
        return '<h'
            + level
            + ' id="'
            + this.options.headerPrefix
            + raw.toLowerCase().replace(/[^\w]+/g, '-')
            + '">'
            + text
            + '</h'
            + level
            + '>\n';
    };

    Renderer.prototype.hr = function (origin) {
        if (this.options.isHrDefault) {
            return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
        } else {
            return origin;
        }
    };

    Renderer.prototype.list = function (body, ordered) {
        var type = ordered ? 'ol' : 'ul';
        return '<' + type + '>\n' + body + '</' + type + '>\n';
    };

    Renderer.prototype.listitem = function (text) {
        if (!/^\[[ x]\]\s/.test(text)) {
            return '<li>' + text + '</li>\n';
        }
        // 任务列表
        var checkbox = $('<input type="checkbox" disabled/>');
        if (/^\[x\]\s/.test(text)) { // 完成的任务列表
            checkbox.attr('checked', true);
        }
        return $('<li>' + text.substring(3) + '</li>').addClass('task-list-item').prepend(checkbox)[0].outerHTML;


    };

    Renderer.prototype.paragraph = function (text, origin) {
        if (this.options.isParagraphDefault) {
            return '<p>' + text + '</p>\n';
        } else {
            var out = '';
            //console.log('paragraph origin:', origin, 'text:', text);

            if (origin && origin.match(/\n{2}/)) {//* 123\n\n* 123
                //console.log('match \n{2} result:', origin.match(/\n.{2}/));
                out = text + '<br><br>';
            } else if (origin && origin.match(/\n{1}/)) {//* 123\n* 123
                //console.log('match \n{1} result:', origin.match(/\n.{1}/));
                out = text + '<br>';
            } else {
                out = text;
            }
            //console.log('out:', out);
            return out;
        }

    };

    Renderer.prototype.table = function (header, body) {
        return '<table>\n'
            + '<thead>\n'
            + header
            + '</thead>\n'
            + '<tbody>\n'
            + body
            + '</tbody>\n'
            + '</table>\n';
    };

    Renderer.prototype.tablerow = function (content) {
        return '<tr>\n' + content + '</tr>\n';
    };

    Renderer.prototype.tablecell = function (content, flags) {
        var type = flags.header ? 'th' : 'td';
        var tag = flags.align
            ? '<' + type + ' style="text-align:' + flags.align + '">'
            : '<' + type + '>';
        return tag + content + '</' + type + '>\n';
    };

// span level renderer
    Renderer.prototype.strong = function (text, origin) {
        if (this.options.isStrongDefault) {
            return '<strong>' + text + '</strong>';
        } else {
            /*if(origin.match(/^\*{2}[^\*]{1}.{0,}/)) {// e.g. **123**
             return '<strong>' + text + '</strong>';
             } else {
             return origin;
             }*/
            if (origin.match(/^\*/)) {
                return '<strong>' + text + '</strong>';
            } else {
                return origin;
            }
        }
    };

    Renderer.prototype.em = function (text, origin) {
        if (this.options.isEmDefault) {
            return '<em>' + text + '</em>';
        } else {
            //            //console.log('em text:', text, 'origin:', origin);
//            if(origin.match(/^\*{1}[^\*]{1}.{0,}/)) {// e.g. *123*
//                //return '<strong>' + text + '</strong>';
//                return '<em>' + text + '</em>';
//            }/* else if(origin.match(/^_{1}[^_]{1}.{0,}/)){// e.g. _123_
//                return '<em>' + text + '</em>';
//            } */else {
//                return origin;
//            }

            if (origin.match(/^\*/)) {
                return '<em>' + text + '</em>';
            } else {
                return origin;
            }
        }
    };

    Renderer.prototype.codespan = function (text, origin) {
        if (this.options.isCodespanDefault) {
            if (/^\$.+\$$/.test(text)) { // inline math
                var raw = /^\$(.+)\$$/.exec(text)[1];
                var line = raw.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'"); // unescape html characters
                try {
                    return katex.renderToString(line, {displayMode: false});
                } catch (err) {
                    return '<code>' + err + '</code>';
                }
            }
            return '<code>' + text + '</code>';
        } else {
            if (origin.match(/^`{1}[^`]{1}.{0,}/)) {
                return '<code>' + text + '</code>';
            } else if (origin.match(/^`{3}[^`]{1}.{0,}/)) {
                return '<pre>' + text + '</pre>';
            } else {
                return origin;
            }
        }
    };

    Renderer.prototype.br = function () {
        return this.options.xhtml ? '<br/>' : '<br>';
    };

    Renderer.prototype.del = function (text, origin) {
        if (this.options.isDelDefault) {
            return '<del>' + text + '</del>';
        } else {
            return origin;
        }
    };

    Renderer.prototype.link = function (href, title, text) {
        if (this.options.sanitize) {
            try {
                var prot = decodeURIComponent(unescape(href))
                    .replace(/[^\w:]/g, '')
                    .toLowerCase();
            } catch (e) {
                return '';
            }
            if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
                return '';
            }
        }
        var out = '<a href="' + href + '"';
        if (title) {
            out += ' title="' + title + '"';
        }
        out += '>' + text + '</a>';
        return out;
    };

    Renderer.prototype.image = function (href, title, text, origin) {
        if (this.options.isImageDefault) {
            var out = '';
            if(this.options.isImgPreview){
                out+='<a class="fancybox attachment-thumb ng-scope" href="'+href+'" data-fancybox-group="filegroup-detail-img" data-fancybox-type="image">';
                out += '<img preview  src="' + href + '" alt="op ' + text + '"';
            }else{
                out += '<img src="' + href + '" alt="op ' + text + '"';
            }

            if (title) {
                out += ' title="' + title + '"';
            }
            out += this.options.xhtml ? '/>' : '>';
            if(this.options.isImgPreview) {
                out += '</a>';
            }
            return out;
        } else {
            return origin;
        }
    };

    Renderer.prototype.text = function (text) {
        return text;
    };

// add by wh
    Renderer.prototype.wtlink = function (href, link, prefix) {
        var out = '';
        if (prefix) {
            out += prefix;
        }
        if (href.match(/http:\/\/|https:\/\//)) {
            out += '<a href="' + href + '" target="_blank">' + link + '</a>';
        } else {// inner
            out += '<a href="' + href + '">' + link + '</a>';
        }
        return out;
    };

// add by wh
    Renderer.prototype.wthexcolor = function (color, prefix) {
        var out = '';
        if (prefix) {
            out += prefix;
        }
        if (this.options.wthexcolorRender.className) {
            out += color + '<div class="' + this.options.wthexcolorRender.className + '" style="background:' + color + '"></div>';
        } else {
            out += color;
        }
        return out;
    };

// add by wh
    Renderer.prototype.wtat = function (href, link, prefix) {
        var out = '';
        if (prefix) {
            out += prefix;
        }
        var memPrefix = this.options.wtatRender.memberPrefix;
        if (!memPrefix) {
            memPrefix = '#';
        } else {
            memPrefix += href;
        }
        out += '<a href="' + memPrefix + '" class="' + this.options.wtatRender.className + '" >@' + link + '</a>';
        return out;
    };

    Renderer.prototype.wtentity = function (_origin, _type, _id, _name, prefix) {
        var out = '';
        if (prefix) {
            out += prefix;
        }
        out += '<a token="' + _origin + '" class="hand ' + this.options.wtentityRender.className + ' marked-entity"><i class="wtf wtf-link-' + _type + '"></i>' + _name + '</a>';
        return out;
    };
// add by wh
    Renderer.prototype.wthash = function (href, link, prefix) {
        var out = '';
        if (prefix) {
            out += prefix;
        }
        out += '<a href="' + this.options.wthashRender.chlPrefix + href + '" >' + link + '</a>';
        return out;
    };

// add by wh
    Renderer.prototype.wtexclamation = function (key, text, prefix) {
        var out = '';
        if (prefix) {
            out += prefix;
        }
        if (key === 'channel' || key === 'group') {
            text = '@' + text;
        }
        out += '<span class="mention ' + key + '">' + text + '</span>';
        return out;
    };

// add by wh
    Renderer.prototype.wtemoji = function (text, prefix) {
        var self = this;
        var findEmoji = function (name) {
            var result = null;
            self.options.wtemojiRender.emojis.forEach(function (emoji) {
                if (!result && name == ":" + emoji.name + ":") {
                    result = emoji;
                }
            });
            return result;
        };

        var out = '';
        if (prefix) {
            out += prefix;
        }
        var emoji = findEmoji(text);
        if (emoji) {
            out += '<img class="' + this.options.wtemojiRender.className + '"'
                + ' title="' + text
                + '" alt="' + emoji.name
                + '" src="' + this.options.wtemojiRender.getImageSrc(emoji) + '" />';
        } else {
            out += text;
        }

        return out;
    };

    /**
     * Parsing & Compiling
     */

    function Parser(options) {
        this.tokens = [];
        this.token = null;
        this.options = options || liteMarked.defaults;
        this.options.renderer = this.options.renderer || new Renderer;
        this.renderer = this.options.renderer;
        this.renderer.options = this.options;
    }

    /**
     * Static Parse Method
     */

    Parser.parse = function (src, options, renderer) {
        var parser = new Parser(options, renderer);
        return parser.parse(src);
    };

    /**
     * Parse Loop
     */

    Parser.prototype.parse = function (src) {
        this.inline = new InlineLexer(src.links, this.options, this.renderer);
        this.tokens = src.reverse();

        var out = '';
        while (this.next()) {
            out += this.tok();
        }

        return out;
    };

    /**
     * Next Token
     */

    Parser.prototype.next = function () {
        return this.token = this.tokens.pop();
    };

    /**
     * Preview Next Token
     */

    Parser.prototype.peek = function () {
        return this.tokens[this.tokens.length - 1] || 0;
    };

    /**
     * Parse Text Tokens
     */

    Parser.prototype.parseText = function () {
        var body = this.token.text;

        while (this.peek().type === 'text') {
            body += '\n' + this.next().text;
        }

        return this.inline.output(body);
    };

    /**
     * Parse Current Token
     */

    Parser.prototype.tok = function () {
        switch (this.token.type) {
            case 'space': {
                return '';
            }
            case 'hr': {
                return this.renderer.hr(this.token.origin);
            }
            case 'heading': {
                return this.renderer.heading(
                    this.inline.output(this.token.text),
                    this.token.depth,
                    this.token.text,
                    this.token.origin);
            }
            case 'code': {
                return this.renderer.code(
                    this.token.text,
                    this.token.lang,
                    this.token.escaped,
                    this.token.origin);
            }
            case 'table': {
                var header = ''
                    , body = ''
                    , i
                    , row
                    , cell
                    , flags
                    , j;

                // header
                cell = '';
                for (i = 0; i < this.token.header.length; i++) {
                    flags = {header: true, align: this.token.align[i]};
                    cell += this.renderer.tablecell(
                        this.inline.output(this.token.header[i]),
                        {header: true, align: this.token.align[i]}
                    );
                }
                header += this.renderer.tablerow(cell);

                for (i = 0; i < this.token.cells.length; i++) {
                    row = this.token.cells[i];

                    cell = '';
                    for (j = 0; j < row.length; j++) {
                        cell += this.renderer.tablecell(
                            this.inline.output(row[j]),
                            {header: false, align: this.token.align[j]}
                        );
                    }

                    body += this.renderer.tablerow(cell);
                }
                return this.renderer.table(header, body);
            }
            case 'blockquote_start': {
                var body = '';

                while (this.next().type !== 'blockquote_end') {
                    body += this.tok();
                }

                return this.renderer.blockquote(body);
            }
            case 'list_start': {
                var body = ''
                    , ordered = this.token.ordered;

                while (this.next().type !== 'list_end') {
                    body += this.tok();
                }

                return this.renderer.list(body, ordered, this.token.origin);
            }
            case 'list_item_start': {
                var body = '';

                while (this.next().type !== 'list_item_end') {
                    body += this.token.type === 'text'
                        ? this.parseText()
                        : this.tok();
                }

                return this.renderer.listitem(body, this.token.origin);
            }
            case 'loose_item_start': {
                var body = '';

                while (this.next().type !== 'list_item_end') {
                    body += this.tok();
                }

                return this.renderer.listitem(body, this.token.origin);
            }
            case 'html': {
                var html = !this.token.pre && !this.options.pedantic
                    ? this.inline.output(this.token.text)
                    : this.token.text;
                return this.renderer.html(html, this.token.origin);
            }
            case 'paragraph': {
                return this.renderer.paragraph(this.inline.output(this.token.text),
                    this.token.origin);
            }
            case 'text': {
                return this.renderer.paragraph(this.parseText());
            }
            case 'wtlink': {// add by wh
                return this.renderer.wtlink(this.token.href, this.token.link, this.token.prefix);
            }
            case 'wthexcolor': {// add by wh
                return this.renderer.wthexcolor(this.token.color, this.token.prefix);
            }
            case 'wtat': {// add by wh
                return this.renderer.wtat(this.token.href, this.token.link, this.token.prefix);
            }
            case 'wthash': {// add by wh
                return this.renderer.wthash(this.token.href, this.token.link, this.token.prefix);
            }
            case 'wtentity': {
                return this.renderer.wtentity(this.token.href, this.token.link, this.token.prefix, this.token.className);
            }
            case 'wtexclamation': {// add by wh
                return this.renderer.wtexclamation(this.token.key, this.token.text, this.token.prefix);
            }
            case 'wtemoji': {// add by wh
                return this.renderer.wtemoji(this.token.text, this.token.prefix);
            }
        }
    };

    /**
     * Helpers
     */

    function escape(html, encode) {
        return html
            .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    function unescape(html) {
        return html.replace(/&([#\w]+);/g, function (_, n) {
            n = n.toLowerCase();
            if (n === 'colon') return ':';
            if (n.charAt(0) === '#') {
                return n.charAt(1) === 'x'
                    ? String.fromCharCode(parseInt(n.substring(2), 16))
                    : String.fromCharCode(+n.substring(1));
            }
            return '';
        });
    }

    function replace(regex, opt) {
        regex = regex.source;
        opt = opt || '';
        return function self(name, val) {
            if (!name) return new RegExp(regex, opt);
            val = val.source || val;
            val = val.replace(/(^|[^\[])\^/g, '$1');
            regex = regex.replace(name, val);
            return self;
        };
    }

    function noop() {
    }

    noop.exec = noop;

    function merge(obj) {
        var i = 1
            , target
            , key;

        for (; i < arguments.length; i++) {
            target = arguments[i];
            for (key in target) {
                if (Object.prototype.hasOwnProperty.call(target, key)) {
                    obj[key] = target[key];
                }
            }
        }

        return obj;
    }


    /**
     * LiteMarked
     */

    function liteMarked(src, opt, callback) {
        if (callback || typeof opt === 'function') {
            if (!callback) {
                callback = opt;
                opt = null;
            }

            opt = merge({}, liteMarked.defaults, opt || {});

            var highlight = opt.highlight
                , tokens
                , pending
                , i = 0;

            try {
                tokens = Lexer.lex(src, opt)
            } catch (e) {
                return callback(e);
            }

            pending = tokens.length;

            var done = function (err) {
                if (err) {
                    opt.highlight = highlight;
                    return callback(err);
                }

                var out;

                try {
                    out = Parser.parse(tokens, opt);
                } catch (e) {
                    err = e;
                }

                opt.highlight = highlight;

                return err
                    ? callback(err)
                    : callback(null, out);
            };

            if (!highlight || highlight.length < 3) {
                return done();
            }

            delete opt.highlight;

            if (!pending) return done();

            for (; i < tokens.length; i++) {
                (function (token) {
                    if (token.type !== 'code') {
                        return --pending || done();
                    }
                    return highlight(token.text, token.lang, function (err, code) {
                        if (err) return done(err);
                        if (code == null || code === token.text) {
                            return --pending || done();
                        }
                        token.text = code;
                        token.escaped = true;
                        --pending || done();
                    });
                })(tokens[i]);
            }

            return;
        }
        try {
            if (opt) opt = merge({}, liteMarked.defaults, opt);
            return Parser.parse(Lexer.lex(src, opt), opt);
        } catch (e) {
            e.message += '\nPlease report this to https://github.com/chjj/liteMarked.';
            if ((opt || liteMarked.defaults).silent) {
                return '<p>An error occured:</p><pre>'
                    + escape(e.message + '', true)
                    + '</pre>';
            }
            throw e;
        }
    }

    /**
     * Options
     */

    liteMarked.options =
        liteMarked.setOptions = function (opt) {
            merge(liteMarked.defaults, opt);
            return liteMarked;
        };

    liteMarked.defaults = {
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        sanitizer: null,
        mangle: true,
        smartLists: false,
        silent: false,
        highlight: null,
        langPrefix: 'lang-',
        smartypants: false,
        headerPrefix: '',
        renderer: new Renderer,
        xhtml: false,
        /* start add by wh */
        heading: true,
        link: true,
        list: true,
        wtlink: false,
        wthexcolor: false,
        wthexcolorRender: {
            className: ''
        },
        wtat: false,
        wtatRender: {
            memberPrefix: '',
            className: ''
        },
        wthash: false,
        wtentity: false,
        wtentityRender: {
            className: ''
        },
        wthashRender: {
            chlPrefix: ''
        },
        wtexclamation: false,
        wtemoji: false,
        /**表情解析参数配置**/
        wtemojiRender: {
            emojis: [],
            getImageSrc: '',
            className: ''
        },
        /**是否用marked的默认的render解析***/
        isParagraphDefault: true,
        isImageDefault: true,
        isBlockquoteDefault: true,
        isHrDefault: true,
        isStrongDefault: true,
        isEmDefault: true,
        isCodespanDefault: true,
        isCodeDefault: true,
        isDelDefault: true,
        isHtmlDefault: true,
        isTextEscape: true,
        isDef: false,
        isImgPreview:false
        /* end add by wh */
    };

    /**
     * Expose
     */

    liteMarked.Parser = Parser;
    liteMarked.parser = Parser.parse;

    liteMarked.Renderer = Renderer;

    liteMarked.Lexer = Lexer;
    liteMarked.lexer = Lexer.lex;

    liteMarked.InlineLexer = InlineLexer;
    liteMarked.inlineLexer = InlineLexer.output;

    liteMarked.parse = liteMarked;

    liteMarked.toHTML = function (src, highLightWord) {
        if (!src) {
            return;
        }
        var dest = liteMarked(src);
        dest = dest.replace(/<p>/, '')
            .replace(/<\/p>/, '')
            .replace(/^<br><br>/, '')
            .replace(/<br>$/, '');
        highLightWord = highLightWord ? highLightWord : [];
        dest = liteMarked.processHighLightWord(dest, highLightWord);
        return dest;
    };
    liteMarked.ignoreTags = function(event,names,attrs){
        if(event){
            var _node = event.target;
            if(_node){
                if(_.isArray(names)){
                    var _name = _node.tagName.toLocaleLowerCase();
                    if (_.indexOf(names,_name) != -1) {
                        return true;
                    }
                }
                if(_.isArray(attrs)){
                    var _hasAttr = false;
                    for(var i = 0; i< attrs.length;i++){
                        var _temp = attrs[i];
                        if(typeof($(_node).attr(_temp)) != "undefined"){
                            _hasAttr = true;
                            break;
                        }
                    }
                    if(_hasAttr){
                        return true;
                    }
                }
                return false;
            }
            return false;
        }
        return false;
    };

    liteMarked.toPlainText = function (text, plainTextRenderer) {
        if (!text) {
            return;
        }
        return liteMarked(text, {renderer: plainTextRenderer});
    };
    liteMarked.processHighLightWord = function (text, highLightWord) {
        if (highLightWord instanceof Array && highLightWord.length > 0) {
            text = text + '<';
            for (var i = 0; i < highLightWord.length; i++) {
                var regx = new RegExp(highLightWord[i] + '(?=[^<>]*<)', 'g');
                text = text.replace(regx, '<highlight>' + highLightWord[i] + '</highlight>');
            }
            text = text.replace(/<$/gi, '');
        }

        return text;
    };

    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = liteMarked;
    } else if (typeof define === 'function' && define.amd) {
        define(function () {
            return liteMarked;
        });
    } else {
        this.liteMarked = liteMarked;
    }

}).call(function () {
    return this || (typeof window !== 'undefined' ? window : global);
}());
