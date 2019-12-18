import { OnInit, Component, Input, HostBinding, ElementRef, Renderer2 } from '@angular/core';
import { inputValueToBoolean } from '../util/helpers';

export type ThyVoteSizes = 'sm' | 'md';

export type ThyType = 'primary' | 'success';

export type thyLayout = 'vertical' | 'horizontal';

@Component({
    selector: 'thy-vote,[thyVote]',
    templateUrl: './vote.component.html'
})
export class ThyVoteComponent implements OnInit {
    private _nativeElement: any;

    _size: ThyVoteSizes;

    _type: ThyType;

    _layout: thyLayout;

    _classNames: string[];

    @HostBinding(`class.thy-vote`) class = true;

    @HostBinding(`class.has-voted`) _hasVoted = true;

    @Input()
    set thyVoteSize(value: ThyVoteSizes) {
        this._size = value;
        this._setClassesByType();
    }

    @Input()
    set thyVote(value: ThyType) {
        this._type = value;
        this._setClassesByType();
    }

    @Input()
    set thyLayout(value: thyLayout) {
        this._layout = value;
        this._setClassesByType();
    }

    @Input() thyVoteCount: number | string;

    @Input()
    set thyHasVoted(value: boolean) {
        this._hasVoted = inputValueToBoolean(value);
    }

    constructor(private elementRef: ElementRef, private renderer: Renderer2) {
        this._nativeElement = this.elementRef.nativeElement;
    }

    ngOnInit() {
        this._setClassesByType();
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
        className.push(`thy-vote-${this._layout}-size-${this._size}`);

        (this._classNames || []).forEach((value: string) => {
            this.renderer.removeClass(this._nativeElement, value);
        });

        this._classNames = className;
        this._classNames.forEach((value: string) => {
            this.renderer.addClass(this._nativeElement, value);
        });
    }
}
