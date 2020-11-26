import { Directive, ElementRef, OnInit, Input, HostBinding } from '@angular/core';
import { ThyMarkdownParserService } from './thy-markdown-parser.service';
import { liteMarked } from 'ngx-tethys/typings';

@Directive({
    selector: '[thyMarkdownPlanText]'
})
export class ThyMarkdownPlanTextParserDirective implements OnInit {
    private value = '';

    private prefix = '';

    private liteMarkedOptions: any = {
        gfm: true,
        tables: false,
        breaks: true,
        pedantic: false,
        sanitize: false,
        smartLists: false,
        smartypants: false,
        heading: false,
        link: false,
        list: false,
        wtlink: true,
        wthexcolor: true,
        wthexcolorRender: {
            className: 'msg-inline-color'
        },
        wtat: true,
        wtatRender: {
            memberPrefix: this.prefix,
            className: 'slide-trigger'
        },
        wthash: true,
        wtentity: true,
        wtentityRender: {
            className: 'slide-trigger'
        },
        wthashRender: {
            chlPrefix: '/messages/groups/'
        },
        wtexclamation: true,
        wtemoji: false,
        isParagraphDefault: false,
        isImageDefault: false,
        isBlockquoteDefault: false,
        isHrDefault: false,
        isStrongDefault: false,
        isEmDefault: false,
        isCodespanDefault: false,
        isCodeDefault: false,
        isDelDefault: false,
        isHtmlDefault: false,
        isTextEscape: true
    };

    @Input()
    set thyMarkdownPlanText(value: string) {
        if (value) {
            this.value = value;
            this.translateHTML();
        }
    }

    @HostBinding('class.thy-markdown-plan-text') hasClass = true;

    constructor(private elementRef: ElementRef, private thyMarkdownParserService: ThyMarkdownParserService) {}

    translateHTML() {
        liteMarked.setOptions(this.liteMarkedOptions);
        let _value = liteMarked.toHTML(this.value, this.liteMarkedOptions.highLightWords);
        _value = this.thyMarkdownParserService.sanitizeHTML(_value);
        this.elementRef.nativeElement.innerHTML = _value;
    }

    ngOnInit() {
        const emojisRender = this.thyMarkdownParserService.getEmojisRender();
        if (emojisRender) {
            this.liteMarkedOptions.wtemoji = true;
            this.liteMarkedOptions.wtemojiRender = emojisRender;
        }
        const _highLightWords = this.thyMarkdownParserService.setHighLightWords();
        if (_highLightWords && _highLightWords instanceof Array) {
            this.liteMarkedOptions.highLightWords = _highLightWords;
        }
        this.translateHTML();
    }
}
