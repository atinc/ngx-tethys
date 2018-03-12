import { Component, Directive, Input, ElementRef, Renderer2 } from '@angular/core';
import { AfterContentInit, OnChanges, SimpleChanges } from '@angular/core';
import { inputValueToBoolean } from '../util/helpers';


export type ThyButtonType = 'primary' | 'success' | 'dashed' | 'danger';

@Component({
    selector: '[thy-button]',
    templateUrl: './button.component.html'
})
export class ThyButtonComponent implements AfterContentInit, OnChanges {

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

    setClassesByState() {
        const classNames = ['btn'];
        if (this.btnType) {
            classNames.push(`btn-${this.btnType}`);
        }
        const loading = inputValueToBoolean(this.btnLoading);
        if (loading) {
            classNames.push('disabled');
            if (this.btnLoadingText) {
                this.renderer.setProperty(this.nativeElement, 'innerText', this.btnLoadingText);
            }
        } else {
            this.renderer.setProperty(this.nativeElement, 'innerText', this.originalText);
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
        this.originalText = this.nativeElement.innerText;
        this.setClassesByState();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['btnLoading'] && !changes['btnLoading'].firstChange) {
            this.setClassesByState();
        }
    }
}
