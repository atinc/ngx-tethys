import {
    Directive, Input, OnInit, ElementRef, Injectable,
    Inject, ChangeDetectorRef, Renderer2, NgZone, OnDestroy
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { helpers, dom } from '../util';
import { KeySelectConfig } from './key-select.config';
import { ThyKeySelectService } from './key-select.service';

@Directive({
    selector: '[thyKeySelection]',
    providers: [
        ThyKeySelectService
    ]
})
export class ThyKeySelectDirective implements OnInit, OnDestroy {

    @Input() thyKeySelection: KeySelectConfig;

    get thyKeySelectRef() {
        return this._thyKeySelectRef;
    }

    constructor(
        private elementRef: ElementRef,
        private _thyKeySelectRef: ThyKeySelectService
    ) {
    }

    ngOnInit(): void {
        this._thyKeySelectRef.initialize(this.elementRef.nativeElement, this.thyKeySelection);
    }

    ngOnDestroy() {
        if (this._thyKeySelectRef) {
            this._thyKeySelectRef.destroy();
            delete this._thyKeySelectRef;
        }
    }
}
