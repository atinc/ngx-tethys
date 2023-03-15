import { ThyGuiderManager } from './guider-manager';
import { AfterViewInit, Directive, ElementRef, Input, OnDestroy, OnInit, NgZone } from '@angular/core';
import { take } from 'rxjs/operators';

@Directive({
    selector: '[thyGuiderTarget]',
    exportAs: 'thyGuiderTarget',
    standalone: true
})
export class ThyGuiderTargetDirective implements OnInit, OnDestroy, AfterViewInit {
    @Input('thyGuiderTarget')
    target: string;

    constructor(private guiderManager: ThyGuiderManager, private el: ElementRef, private ngZone: NgZone) {}

    ngOnInit() {
        this.guiderManager.addStepTarget(this.target, this.el.nativeElement);
        this.ngZone.onStable.pipe(take(1)).subscribe(() => {
            const { key, guiderRef } = this.guiderManager.getActive();
            if (key === this.target) {
                const index = guiderRef.steps.findIndex(step => step.key === this.target);
                this.ngZone.run(() => {
                    guiderRef.active(index);
                });
            }
        });
    }

    ngAfterViewInit() {}

    ngOnDestroy() {
        const { guiderRef } = this.guiderManager.getActive();
        if (guiderRef) {
            guiderRef.close();
        }
        this.guiderManager.removeStepTarget(this.target);
    }
}
