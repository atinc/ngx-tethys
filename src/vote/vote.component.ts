import { Component, OnInit, Input, HostBinding, ElementRef, Renderer2 } from '@angular/core';
import { inputValueToBoolean } from '../util/helpers';

export type voteSizes = 'sm' | 'md';

@Component({
    selector: 'thy-vote',
    templateUrl: './vote.component.html'
})
export class ThyVoteComponent implements OnInit {
    private _nativeElement: any;

    _class = 'size-sm';

    @Input()
    set voteSize(value: voteSizes) {
        this._class = `size-${value}`;
    }
    @HostBinding(`class.user-voice-vote`) class = true;

    @HostBinding(`class.has-voted`) _hasVoted = true;

    @Input() voteCount: number;

    @Input()
    set hasVoted(value: boolean) {
        this._hasVoted = inputValueToBoolean(value);
    }

    constructor(private elementRef: ElementRef, private renderer: Renderer2) {
        this._nativeElement = this.elementRef.nativeElement;
    }
    ngOnInit() {
        this.renderer.addClass(this._nativeElement, this._class);
    }
}
