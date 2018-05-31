import { Component, HostListener, ElementRef, HostBinding, Renderer2, OnInit } from '@angular/core';
import { ThySlideRef } from './slide-ref.service';
import { ThySliderOption } from './slide-options.class';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { DebugHelper } from 'protractor/built/debugger';

@Component({
    selector: 'thy-slide-container',
    template: `<ng-content></ng-content>`,
    animations: [
        trigger('flyInOut', [
            state('left', style({ transform: '*' })),
            state('right', style({ transform: '*' })),
            state('top', style({ transform: '*' })),
            state('bottom', style({ transform: '*' })),
            transition('void => left', [
                style({ transform: 'translateX(-100%)' }),
                animate('0.2s ease-in')
            ]),
            transition('left => void', [
                animate('0.2s', style({ transform: 'translateX(-100%)' })),
            ]),
            transition('void => right', [
                style({ transform: 'translateX(100%)' }),
                animate('0.2s ease-in')
            ]),
            transition('right => void', [
                animate('0.2s', style({ transform: 'translateX(100%)' })),
            ]),
            transition('void => top', [
                style({ transform: 'translateY(-100%)' }),
                animate('0.2s ease-in')
            ]),
            transition('top => void', [
                animate('0.2s', style({ transform: 'translateY(-100%)' })),
            ]),
            transition('void => bottom', [
                style({ transform: 'translateY(100%)' }),
                animate('0.2s ease-in')
            ]),
            transition('bottom => void', [
                animate('0.2s', style({ transform: 'translateY(100%)' })),
            ])
        ])
    ]
})
export class ThySlideContainerComponent implements OnInit {

    @HostBinding('@flyInOut') flyInOut: string;

    public thySlideClass: { name: string, value: number | string }[] = [];

    constructor(
        private thySlideRef: ThySlideRef,
        private elementRef: ElementRef,
        private thySliderOption: ThySliderOption,
        private renderer: Renderer2
    ) { }

    ngOnInit() {
        this.flyInOut = this.thySliderOption.from;
        this.thySlideClass.push({ name: 'height', value: this.thySliderOption.height });
        this.thySlideClass.push({ name: 'width', value: this.thySliderOption.width });
        if (this.thySliderOption.align === 'left') {
            this.thySlideClass.push({ name: 'left', value: 0 });
        } else {
            this.thySlideClass.push({ name: 'right', value: 0 });
        }

        if (this.thySliderOption.vertical === 'top') {
            this.thySlideClass.push({ name: 'top', value: 0 });
        } else {
            this.thySlideClass.push({ name: 'bottom', value: 0 });
        }

        this.thySlideClass.forEach((item) => {
            this.renderer.setStyle(this.elementRef.nativeElement, item.name, item.value);
        });
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: any): void {
        event.stopPropagation();
        const isInnerClick = this.elementRef.nativeElement.contains(event.target);
        if (!isInnerClick && !this.thySliderOption.target.nativeElement.contains(event.target)) {
            this.flyInOut = 'void';
            setTimeout(() => {
                this.thySlideRef.hide();
            }, 200);
        }
    }

}
