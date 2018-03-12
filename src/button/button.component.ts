import { Component, Directive, Input, ElementRef, Renderer2 } from '@angular/core';
import { AfterContentInit, OnChanges, SimpleChanges } from '@angular/core';
import { inputValueToBoolean } from '../util/helpers';


export type ThyButtonType = 'primary' | 'success' | 'dashed' | 'danger';

@Directive({
    selector: '[thyButton]'
})
export class ThyButtonDirective implements AfterContentInit, OnChanges {

    @Input() thyButton: ThyButtonType;

    @Input() btnType: ThyButtonType;

    @Input() btnLoading: boolean;

    @Input() btnLoadingText: string;

    private nativeElement: any;

    private classNames: string[] = [];

    private originalText: string;

    constructor(private elementRef: ElementRef, private renderer: Renderer2) {
        this.nativeElement = this.elementRef.nativeElement;
        this.nativeElement = this.elementRef.nativeElement;
    }

    private isInLoadingStatus() {
        return inputValueToBoolean(this.btnLoading);
    }

    private setLoadingStatus() {
        const loading = this.isInLoadingStatus();
        if (loading) {
            // classNames.push('disabled');
            this.renderer.setProperty(this.nativeElement, 'disabled', true);
            if (this.btnLoadingText) {
                this.renderer.setProperty(this.nativeElement, 'innerText', this.btnLoadingText);
            }
        } else {
            this.renderer.setProperty(this.nativeElement, 'disabled', false);
            if (this.originalText) {
                this.renderer.setProperty(this.nativeElement, 'innerText', this.originalText);
            }
        }
    }

    setClassesByState() {
        const classNames = ['btn'];
        if (this.btnType || this.thyButton) {
            classNames.push(`btn-${this.btnType || this.thyButton}`);
        }
        this.classNames.forEach(className => {
            this.renderer.removeClass(this.nativeElement, className);
        });
        this.classNames = classNames;
        this.classNames.forEach((className) => {
            this.renderer.addClass(this.nativeElement, className);
        });
    }

    ngAfterContentInit() {
        this.setClassesByState();
        if (this.btnLoading) {
            this.setLoadingStatus();
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['btnLoading'] && !changes['btnLoading'].firstChange) {
            if (this.btnLoading) {
                this.originalText = this.nativeElement.innerText;
            }
            this.setClassesByState();
            this.setLoadingStatus();
        }

        if (changes['btnLoadingText'] && !changes['btnLoadingText'].firstChange) {
            const loading = inputValueToBoolean(this.btnLoading);
            if (loading) {
                this.renderer.setProperty(this.nativeElement, 'innerText', this.btnLoadingText)
            }
        }
    }
}
