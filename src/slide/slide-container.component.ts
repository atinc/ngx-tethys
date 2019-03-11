import { Component, HostListener, ElementRef, HostBinding, Renderer2, OnInit } from '@angular/core';
import { ThySlideRef } from './slide-ref.service';
import { ThySlideOption } from './slide-options.class';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'thy-slide-container',
    template: `<div [class]="'slide-dialog' + (thySlideContainerClass ? ' ' + thySlideContainerClass : '')" [@flyInOut]="flyInOut">
    <ng-container *ngIf="isShow"><ng-content></ng-content></ng-container></div>`,
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

    @HostBinding('class.slide') slideClass = true;

    public flyInOut: string;

    public thySlideContainerClass: string;

    public isShow = false;

    public isHide: boolean;

    thySlideService: any;

    constructor(
        private thySlideRef: ThySlideRef,
        private elementRef: ElementRef,
        private thySlideOption: ThySlideOption,
        private renderer: Renderer2
    ) { }

    ngOnInit() {
        this.slideClass = this.thySlideOption.hasBackdrop;
        this.flyInOut = this.thySlideOption.from;
        this.thySlideContainerClass = this.thySlideOption.class;
        setTimeout(() => {
            this.isShow = true;
        }, 200);
    }

    @HostListener('click', ['$event'])
    onClick(event: any): void {
        if (this.thySlideService._isHide || event.target === this.elementRef.nativeElement) {
            this.flyInOut = 'void';
            this.thySlideRef.hide();
        }
    }

}
