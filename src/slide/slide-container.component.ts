import { Component, HostListener, ElementRef, HostBinding, Renderer2, OnInit } from '@angular/core';
import { ThySlideRef } from './slide-ref.service';
import { ThySlideOption } from './slide-options.class';
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

    @HostBinding('class') thySlideContainerClass: string;

    constructor(
        private thySlideRef: ThySlideRef,
        private elementRef: ElementRef,
        private thySlideOption: ThySlideOption,
        private renderer: Renderer2
    ) { }

    ngOnInit() {
        this.flyInOut = this.thySlideOption.from;
        this.thySlideContainerClass = this.thySlideOption.class;
        this.renderer.setStyle(this.elementRef.nativeElement, this.thySlideOption.from, 0);
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: any): void {
        event.stopPropagation();
        const isInnerClick = this.elementRef.nativeElement.contains(event.target);
        if (!isInnerClick) {
            this.flyInOut = 'void';
            this.thySlideRef.hide();
        }
    }

}
