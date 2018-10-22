import {
    Directive, Input, OnInit, ElementRef, Injectable, ContentChild,
    Inject, ChangeDetectorRef, Renderer2, NgZone, OnDestroy, ViewChildren, QueryList, ContentChildren
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { helpers, dom } from '../util';
import { ThyKeySelectConfig } from './key-select.config';
import { ThyKeySelectService } from './key-select.service';
import { ThyKeySelectItemDirective } from './key-select-item.directive';

@Directive({
    selector: '[thyKeySelect]',
    providers: [
        ThyKeySelectService
    ]
})
export class ThyKeySelectDirective implements OnInit, OnDestroy {

    @Input() thyKeySelect: ThyKeySelectConfig;

    @ContentChildren(ThyKeySelectItemDirective)
    set selectItems(items: QueryList<ThyKeySelectItemDirective>) {
        this._thyKeySelectRef.setAllItems(items.toArray());
    }

    get thyKeySelectRef() {
        return this._thyKeySelectRef;
    }

    constructor(
        private elementRef: ElementRef,
        private _thyKeySelectRef: ThyKeySelectService
    ) {
    }

    ngOnInit(): void {
        this._thyKeySelectRef.initialize(this.elementRef.nativeElement, this.thyKeySelect);
    }

    ngOnDestroy() {
        if (this._thyKeySelectRef) {
            this._thyKeySelectRef.destroy();
            delete this._thyKeySelectRef;
        }
    }
}
