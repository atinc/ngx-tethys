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

    @Output() thyPreviousClick = new EventEmitter<{
        index: number;
    }>();

    @Output() thyNextClick = new EventEmitter<{
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
        return this.thyIndex <= 0;
    }

    getNextDisabled() {
        return this.thyIndex >= this.thyTotal - 1;
    }

    onPreviousClick() {
        this.thyIndex--;
        this.thyPreviousClick.emit({ index: this.thyIndex });
    }

    onNextClick() {
        this.thyIndex++;
        this.thyNextClick.emit({ index: this.thyIndex });
    }
}
