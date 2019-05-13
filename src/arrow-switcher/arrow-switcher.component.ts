import { Component, HostBinding, Input, Output, EventEmitter } from '@angular/core';
import { ThyTranslate } from '../shared/translate';
import { htmlElementIsEmpty } from '../util/helpers';

@Component({
    selector: 'thy-arrow-switcher',
    templateUrl: './arrow-switcher.component.html'
})
export class ThyArrowSwitcherComponent {
    @HostBinding('class.thy-arrow-switcher') _isArrowSwitcher = true;

    @HostBinding('class.thy-arrow-switcher-small') _isSmallSize = false;

    @Input() thyIndex: number;

    @Input() thyTotal: number;

    @Input() thyDisabled: boolean;

    @Output() thyPrevious = new EventEmitter<{
        index: number;
    }>();

    @Output() thyNext = new EventEmitter<{
        index: number;
    }>();

    @Input()
    set thySize(size: string) {
        if (size === 'sm') {
            this._isSmallSize = true;
        }
    }

    constructor() {}

    getPreviousDisabled() {
        return this.thyIndex <= 0 || this.thyDisabled;
    }

    getNextDisabled() {
        return this.thyIndex >= this.thyTotal - 1 || this.thyDisabled;
    }

    onPreviousClick() {
        this.thyIndex--;
        this.thyPrevious.emit({ index: this.thyIndex });
    }

    onNextClick() {
        this.thyIndex++;
        this.thyNext.emit({ index: this.thyIndex });
    }
}
