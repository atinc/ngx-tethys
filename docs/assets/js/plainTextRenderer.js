/**
 * Created by yanshi0429 on 16/11/10.
 */
;
(function () {
    function PlainTextRenderer(options) {
        this.options = options || {};
        this.whitespaceDelimiter = this.options.spaces ? ' ' : '\n';
    }
    PlainTextRenderer.prototype.code = function(code, lang, escaped) {
        return this.whitespaceDelimiter + this.whitespaceDelimiter + code + this.whitespaceDelimiter + this.whitespaceDelimiter;
    };
    PlainTextRenderer.prototype.blockquote = function(quote) {
        return '\t' + quote + this.whitespaceDelimiter;
    };
    PlainTextRenderer.prototype.html = function(html) {
        return html;
    };
    PlainTextRenderer.prototype.heading = function(text, level, raw) {
        return text;
    };
    PlainTextRenderer.prototype.hr = function() {
        return this.whitespaceDelimiter + this.whitespaceDelimiter;
    };
    PlainTextRenderer.prototype.list = function(body, ordered) {
        return body;
    };
    PlainTextRenderer.prototype.listitem = function(text) {
        return '\t' + text + this.whitespaceDelimiter;
    };
    PlainTextRenderer.prototype.paragraph = function(text) {
        return text;
    };
    PlainTextRenderer.prototype.table = function(header, body) {
        return  this.whitespaceDelimiter + header + this.whitespaceDelimiter + body + this.whitespaceDelimiter;
    };
    PlainTextRenderer.prototype.tablerow = function(content) {
        return content + this.whitespaceDelimiter;
    };
    PlainTextRenderer.prototype.tablecell = function(content, flags) {
        return content + '\t';
    };
    PlainTextRenderer.prototype.strong = function(text) {
        return text;
    };
    PlainTextRenderer.prototype.em = function(text) {
        return text;
    };
    PlainTextRenderer.prototype.codespan = function(text) {
        return text;
    };
    PlainTextRenderer.prototype.br = function() {
        return this.whitespaceDelimiter + this.whitespaceDelimiter;
    };
    PlainTextRenderer.prototype.del = function(text) {
        return text;
    };
    PlainTextRenderer.prototype.link = function(href, title, text) {
        return text;
    };
    PlainTextRenderer.prototype.image = function(href, title, text) {
        return text;
    };
    PlainTextRenderer.prototype.text = function(text) {
        return text;
    };


// [http://worktile.com] =>
// <a href=http://worktile.com target="_blank">http://worktile.com</a>
//
// [https://github.com/a/master|master] =>
// <a href=https://github.com/a/master target="_blank">master</a>
//
// https://worktile.com =>
// <a href=https://worktile.com target="_blank">https://worktile.com</a>
    PlainTextRenderer.prototype.wtlink = function (href, link, prefix) {
        return link?link:href;
    };

// [@e9dab10e0d5f40b492c7a85ec04a00a8|wanghao1891] =>
// <a href=/messages/groups/563212112aa22e1d139e95c5/members/e9dab10e0d5f40b492c7a85ec04a00a8 >@wanghao1891</a>
    PlainTextRenderer.prototype.wtat = function (href, link, prefix) {
        return '@' + link;
    };

// [#38347lslfds|开发小队] =>
// <a href="http://localhost/channel/38347lslfds">开发小队</a>
    PlainTextRenderer.prototype.wthash = function (href, link, prefix) {
        return '#' + link;
    };

// [!group|群组] =>
// <span class="mention group">@群组</span>
// [!channel|频道] =>
// <span class="mention group">@频道</span>
    PlainTextRenderer.prototype.wtexclamation = function (key, text, prefix) {
        if (key === 'channel' || key === 'group') {
            return '@' + text;
        }
        return;
    };


// replace hex color with a preview div use the color
    PlainTextRenderer.prototype.wthexcolor = function (color, prefix) {
        return color + '<div class="' + this.options.wthexcolorRender.className + '" style="background:' + color + '"></div>'
    };

    //[#task-5768f70268acfb33075b0943|任务123] [#event-581afdc86587fd8b2d186e47|日程123] [#file-56a87603df467f4012df12a0|网盘]
    PlainTextRenderer.prototype.wtentity = function(_origin,_type, _id, _name, prefix){
        return _name?_name:_origin;
    };
    //表情
    PlainTextRenderer.prototype.wtemoji = function(text, prefix) {
        return text;
    };


    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = PlainTextRenderer;
    } else if (typeof define === 'function' && define.amd) {
        define(function() { return PlainTextRenderer; });
    } else {
        this.PlainTextRenderer = PlainTextRenderer;
    }
}).call(function () {
        return this || (typeof window !== 'undefined' ? window : global);
    }());
