import { Component, Input, OnInit } from '@angular/core';
import { ThyTranslate } from 'ngx-tethys/core';

@Component({
    selector: 'thy-popover-header',
    templateUrl: './popover-header.component.html',
    exportAs: 'thyPopoverHeader'
})
export class ThyPopoverHeaderComponent {
    @Input() thyTitle: string;

    @Input()
    set thyTitleTranslationKey(key: string) {
        if (key && !this.thyTitle) {
            this.thyTitle = this.translate.instant(key);
        }
    }

    constructor(private translate: ThyTranslate) {}
}
