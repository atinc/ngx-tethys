import { ThyGuiderManager } from './guider-manager';
import { AfterViewInit, Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

@Directive({ selector: '[thyGuiderTarget]', exportAs: 'thyGuiderTarget' })
export class ThyGuiderTargetDirective implements OnInit, OnDestroy, AfterViewInit {
    @Input('thyGuiderTarget')
    target: string;

    constructor(private guiderManager: ThyGuiderManager, private el: ElementRef) {}

    ngOnInit() {
        this.guiderManager.addStepTarget(this.target, this.el.nativeElement);
    }

    ngAfterViewInit() {
        const { key, guiderRef } = this.guiderManager.getActive();
        if (key === this.target) {
            const index = guiderRef.steps.findIndex(step => step.key === this.target);
            guiderRef.active(index);
        }
    }

    ngOnDestroy() {
        const { guiderRef } = this.guiderManager.getActive();
        if (guiderRef) {
            guiderRef.close();
        }
        this.guiderManager.removeStepTarget(this.target);
    }
}
