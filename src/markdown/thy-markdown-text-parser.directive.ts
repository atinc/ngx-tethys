import { Directive, ElementRef, OnInit, Input } from '@angular/core';
import { ThyMarkdownPlanTextParserService } from './thy-markdown-parser.service';
import { liteMarked } from '../typings';

@Directive({
    selector: '[thyMarkdownPlanText]'
})
export class ThyMarkdownPlanTextParser implements OnInit {
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

    constructor(
        private elementRef: ElementRef,
        private thyMarkdownPlanTextParserService: ThyMarkdownPlanTextParserService
    ) {}

    translateHTML() {
        liteMarked.setOptions(this.liteMarkedOptions);
        let _value = liteMarked.toHTML(this.value, this.liteMarkedOptions.highLightWords);
        _value = this.thyMarkdownPlanTextParserService.filterHTML(_value);
        this.elementRef.nativeElement.innerHTML = _value;
    }

    ngOnInit() {
        const _emojiesSetting: any = this.thyMarkdownPlanTextParserService.setEmoJies();
        if (_emojiesSetting) {
            this.liteMarkedOptions.wtemoji = true;
            this.liteMarkedOptions.wtemojiRender = _emojiesSetting;
        }
        const _highLightWords = this.thyMarkdownPlanTextParserService.setHighLightWords();
        if (_highLightWords && _highLightWords instanceof Array) {
            this.liteMarkedOptions.highLightWords = _highLightWords;
        }
        this.translateHTML();
    }
}
