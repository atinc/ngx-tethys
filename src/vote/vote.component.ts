import { OnInit, Component, Input, HostBinding, ElementRef } from '@angular/core';
import { inputValueToBoolean } from '../util/helpers';
import { UpdateHostClassService } from '../shared';

export type ThySizes = 'sm' | 'md';

export type ThyType = 'primary' | 'success' | 'primary-weak' | 'success-weak' | 'emoji';

export type thyLayout = 'vertical' | 'horizontal';

@Component({
    selector: 'thy-vote,[thyVote]',
    templateUrl: './vote.component.html',
    providers: [UpdateHostClassService]
})
export class ThyVoteComponent implements OnInit {
    _size: ThySizes;

    _type: ThyType;

    _layout: thyLayout;

    _initialized = false;

    @HostBinding(`class.thy-vote`) class = true;

    @HostBinding(`class.has-voted`) _hasVoted = true;

    @Input()
    set thySize(value: ThySizes) {
        this._size = value;
        if (this._initialized) {
            this._setClassesByType();
        }
    }

    @Input() thySrc: string;

    @Input()
    set thyVote(value: ThyType) {
        this._type = value;
        if (this._initialized) {
            this._setClassesByType();
        }
    }

    @Input()
    set thyLayout(value: thyLayout) {
        this._layout = value;
        if (this._initialized) {
            this._setClassesByType();
        }
    }

    @Input() thyVoteCount: number | string;

    @Input()
    set thyHasVoted(value: boolean) {
        this._hasVoted = inputValueToBoolean(value);
        if (this._initialized) {
            this._setClassesByType();
        }
    }

    constructor(private elementRef: ElementRef, private updateHostClassService: UpdateHostClassService) {
        this.updateHostClassService.initializeElement(elementRef.nativeElement);
    }

    ngOnInit() {
        this._setClassesByType();
        this._initialized = true;
    }

    _setClassesByType() {
        const className = [];
        if (!this._type) {
            this._type = 'primary';
        }
        if (!this._layout) {
            this._layout = 'horizontal';
        }
        if (!this._size) {
            this._size = 'sm';
        }
        className.push(`thy-vote-${this._type}`);
        className.push(`thy-vote-${this._layout}`);
        if (this._type === 'emoji') {
            className.push(`thy-vote-${this._layout}-emoji-size-${this._size}`);
        } else {
            className.push(`thy-vote-${this._layout}-size-${this._size}`);
        }

        this.updateHostClassService.updateClass(className);
    }
}
