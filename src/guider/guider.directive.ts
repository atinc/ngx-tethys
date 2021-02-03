import { ThyGuiderManager } from './guider-manager';
import { AfterViewInit, Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

@Directive({ selector: '[thyGuiderTarget]' })
export class ThyGuiderTargetDirective implements OnInit, OnDestroy, AfterViewInit {
    @Input('thyGuiderTarget')
    target: string;

    constructor(private guiderManager: ThyGuiderManager, private el: ElementRef) {}

    ngOnInit() {
        this.guiderManager.addStep(this.el, this.target);
    }

    ngAfterViewInit() {
        const activeKey = this.guiderManager.activeStepKey;
        if (activeKey === this.target) {
            const guiderRef = this.guiderManager.thyGuiderRef;
            const index = guiderRef.steps.findIndex(step => step.key === this.target);
            guiderRef.to(index);
        }
    }

    ngOnDestroy() {
        this.guiderManager.removeStep(this.target);
    }
}
