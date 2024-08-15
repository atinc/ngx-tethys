import { ThyGuiderManager } from './guider-manager';
import { AfterViewInit, Directive, ElementRef, Input, OnDestroy, OnInit, NgZone } from '@angular/core';
import { take } from 'rxjs/operators';

/**
 * 标记新手引导的步骤的target，使用指令方式的新手引导支持多路由跳转
 * @name thyGuiderTarget
 * @order 40
 */
@Directive({
    selector: '[thyGuiderTarget]',
    exportAs: 'thyGuiderTarget',
    standalone: true
})
export class ThyGuiderTargetDirective implements OnInit, OnDestroy, AfterViewInit {
    /**
     * 标记当前元素对应的新手引导中 step 的 key
     */
    @Input('thyGuiderTarget')
    target: string;

    constructor(
        private guiderManager: ThyGuiderManager,
        private el: ElementRef,
        private ngZone: NgZone
    ) {}

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
