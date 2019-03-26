import { Directive, ElementRef, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { thyEditorConstant } from '../../editor/editor.constant';
import { ThyMarkdownParserService } from './thy-markdown-parser.service';
import { $, liteMarked, mermaid, katex } from '../../typings';

@Directive({
    selector: '[thyMarkdownParser]'
})
export class ThyMarkdownParserDirective implements OnInit {
    public value: string;

    @Input()
    set thyMarkdownParser(value: string) {
        if (value) {
            this.value = value;
            this.translateHTML();
        }
    }

    private liteMarkedOptions: any = {
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: true,
        heading: true,
        link: true,
        list: true,
        wtlink: true,
        wthexcolor: true,
        wthexcolorRender: {
            className: 'msg-inline-color'
        },
        wtat: false,
        wthash: false,
        wtentity: true,
        wtentityRender: {
            className: 'slide-trigger'
        },
        wthashRender: {
            chlPrefix: '/messages/groups/'
        },
        wtexclamation: true,
        wtemoji: false,
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
        isDef: true,
        isImgPreview: true
    };

    constructor(private elementRef: ElementRef, private thyMarkdownParserService: ThyMarkdownParserService) {}

    initGantt() {
        if (mermaid) {
            mermaid.parseError = function(err: any, hash: any) {
                mermaid.error = err;
            };
            mermaid.ganttConfig = {
                // Configuration for Gantt diagrams
                numberSectionStyles: 4,
                axisFormatter: [
                    [
                        '%I:%M',
                        function(d: any) {
                            // Within a day
                            return d.getHours();
                        }
                    ],
                    [
                        'w. %U',
                        function(d: any) {
                            // Monday a week
                            return d.getDay() === 1;
                        }
                    ],
                    [
                        '%a %d',
                        function(d: any) {
                            // Day within a week (not monday)
                            return d.getDay() && d.getDate() !== 1;
                        }
                    ],
                    [
                        '%b %d',
                        function(d: any) {
                            // within a month
                            return d.getDate() !== 1;
                        }
                    ],
                    [
                        '%m-%y',
                        function(d: any) {
                            // Month
                            return d.getMonth();
                        }
                    ]
                ]
            };
        }
    }

    initMarked() {
        // 设置marked
        const renderer = new liteMarked.Renderer();
        renderer.listitem = function(text: string) {
            if (!/^\[[ x]\]\s/.test(text)) {
                return liteMarked.Renderer.prototype.listitem(text);
            }
            // 任务列表
            const checkbox = $('<input type="checkbox" disabled/>');
            if (/^\[x\]\s/.test(text)) {
                // 完成的任务列表
                checkbox.attr('checked', true);
            }
            return $(liteMarked.Renderer.prototype.listitem(text.substring(3)))
                .addClass('task-list-item')
                .prepend(checkbox)[0].outerHTML;
        };
        renderer.codespan = function(text: string) {
            // inline code
            if (/^\$.+\$$/.test(text)) {
                // inline math
                const raw = /^\$(.+)\$$/.exec(text)[1];
                const line = raw
                    .replace(/&lt;/g, '<')
                    .replace(/&gt;/g, '>')
                    .replace(/&amp;/g, '&')
                    .replace(/&quot;/g, '"')
                    .replace(/&#39;/g, "'"); // unescape html characters
                try {
                    return katex.renderToString(line, { displayMode: false });
                } catch (err) {
                    return '<code>' + err + '</code>';
                }
            }
            return liteMarked.Renderer.prototype.codespan.apply(this, arguments);
        };
        renderer.code = function(code: any, language: any, escaped: any, line_number: any) {
            code = code.trim();
            const firstLine = code.split(/\n/)[0].trim();
            if (language === 'math') {
                // 数学公式
                let tex = '';
                code.split(/\n\n/).forEach(function(line: any) {
                    // 连续两个换行，则开始下一个公式
                    line = line.trim();
                    if (line.length > 0) {
                        try {
                            tex += katex.renderToString(line, { displayMode: true });
                        } catch (err) {
                            tex += '<pre>' + err + '</pre>';
                        }
                    }
                });
                return '<div data-line="' + line_number + '">' + tex + '</div>';
            } else if (
                firstLine === 'gantt' ||
                firstLine === 'sequenceDiagram' ||
                firstLine.match(/^graph (?:TB|BT|RL|LR|TD);?$/)
            ) {
                // mermaid
                if (firstLine === 'sequenceDiagram') {
                    code += '\n'; // 如果末尾没有空行，则语法错误
                }
                if (mermaid && mermaid.parse(code)) {
                    return '<div class="mermaid" data-line="' + line_number + '">' + code + '</div>';
                } else {
                    if (mermaid && mermaid.error) {
                        return '<pre data-line="' + line_number + '">' + mermaid.error + '</pre>';
                    }
                }
            } else {
                return liteMarked.Renderer.prototype.code.apply(this, arguments);
            }
        };
        renderer.html = function(html: string) {
            const result = liteMarked.Renderer.prototype.html.apply(this, arguments);
            const h = $(result.bold());
            return h.html();
        };
        renderer.paragraph = function(text: string) {
            const result = liteMarked.Renderer.prototype.paragraph.apply(this, arguments);
            const h = $(result.bold());
            return h.html();
        };
        liteMarked.setOptions(this.liteMarkedOptions);
    }
    initComponent() {
        // 初始化甘特图
        this.initGantt();
        // 初始解析器
        this.initMarked();
    }

    parseMarked(_value: string) {
        if (liteMarked && _value) {
            return liteMarked(_value);
        } else {
            return _value;
        }
    }

    parseMermaid() {
        if (mermaid) {
            mermaid.init();
        }
    }

    translateHTML() {
        this.initComponent();
        let _value = this.thyMarkdownParserService.filterHTML(this.value);
        _value = this.parseMarked(_value);
        setTimeout(() => {
            this.parseMermaid();
        }, 100);
        this.elementRef.nativeElement.innerHTML = _value;
        $(this.elementRef.nativeElement)
            .find('a')
            .attr('target', function() {
                if (this.host !== location.host) {
                    return '_blank';
                } else {
                    let outer_path: any = [
                        'shared/',
                        'share/',
                        'club',
                        'videos',
                        'blog',
                        'plan',
                        'tour',
                        'mobile',
                        'security',
                        'uservoice',
                        'customers',
                        'press',
                        'help',
                        'guide',
                        'feedback',
                        'about',
                        'contact',
                        'privacy',
                        'terms'
                    ].join(')|(/');
                    outer_path = new RegExp('^(/' + outer_path + ')');
                    if (outer_path.test(this.pathname)) {
                        return '_blank';
                    }
                }
            });
    }

    ngOnInit() {
        const _emojiesSetting: any = this.thyMarkdownParserService.setEmoJies();
        if (_emojiesSetting) {
            this.liteMarkedOptions.wtemoji = true;
            this.liteMarkedOptions.wtemojiRender = _emojiesSetting;
        }
        this.translateHTML();
    }
}
