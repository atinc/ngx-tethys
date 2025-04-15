import { Overlay } from '@angular/cdk/overlay';
import { DOCUMENT } from '@angular/common';
import { Inject, Renderer2, RendererFactory2 } from '@angular/core';
import { ThyPopover, ThyPopoverConfig, ThyPopoverRef } from 'ngx-tethys/popover';
import { coerceArray, isArray, isNull, isString, isUndefinedOrNull } from 'ngx-tethys/util';
import { fromEvent, Subscription } from 'rxjs';
import { IThyGuiderManager, IThyGuiderRef } from './guider.interface';
import { ThyGuiderStep } from './guider.class';
import { isPositionDataType } from './utils';

const pointContainerSize = 28;

/**
 * @public
 * @order 50
 */
export class ThyGuiderStepRef {
    private renderer: Renderer2;

    private lastPointerContainer: any;

    private lastTargetElement: Element;

    private targetElementObserver: Subscription;

    private lastTipContainer: any;

    private guiderRef: IThyGuiderRef;

    private lastPopoverRef: ThyPopoverRef<any>;

    constructor(
        public step: ThyGuiderStep,
        public stepIndex: number,
        private readonly rendererFactory: RendererFactory2,
        private popover: ThyPopover,
        private guiderManager: IThyGuiderManager,
        private overlay: Overlay,
        @Inject(DOCUMENT) private document: Document
    ) {
        this.renderer = this.rendererFactory.createRenderer(null, null);
    }

    public show(guiderRef: IThyGuiderRef): void {
        this.guiderRef = guiderRef;
        this.createPoint(this.step, guiderRef);
    }

    public dispose() {
        this.removeLastPointContainer();
        this.removeTip();
    }

    private getTargetElement(step: ThyGuiderStep) {
        let targetElement: HTMLElement;

        if (step.target && !isPositionDataType(step.target)) {
            const target = [...coerceArray(step.target)];

            while (target.length && isUndefinedOrNull(targetElement)) {
                targetElement = this.document.querySelector(target.shift());
            }
        } else {
            targetElement = this.guiderManager.getActiveTarget(step.key);
        }
        return targetElement;
    }

    private createPoint(step: ThyGuiderStep, guiderRef: IThyGuiderRef) {
        // target 为空并且 guiderManager 中的 targetMap 也没有此step 的 key，或者 target 直接为 坐标数组
        // 则执行无 target 的显示
        if (!this.isTipHasTarget(step)) {
            this.createTip(this.step);
            return;
        }

        const targetElement = this.getTargetElement(step);

        if ((typeof ngDevMode === 'undefined' || ngDevMode) && isNull(targetElement)) {
            throw new Error(`there is no target called ${coerceArray(step.target).join(' or ')}`);
        }
        this.targetElementObserver = fromEvent(targetElement, 'click').subscribe(() => {
            guiderRef.targetClicked().next(step);
        });
        const positionValue = targetElement?.style?.position;
        if (!positionValue || positionValue === 'static') {
            this.renderer.setStyle(targetElement, 'position', 'relative');
        }
        this.setStyleForPointContainer(step, targetElement);
    }

    private setStyleForPointContainer(step: ThyGuiderStep, targetElement: Element) {
        const pointPosition = this.getPointPosition(step, targetElement);
        const pointContainer = this.setPointPosition(pointPosition);

        this.renderPoint(targetElement, pointContainer);
    }

    private getPointPosition(step: ThyGuiderStep, targetElement: Element): [number, number] {
        const targetElementClientRect = targetElement.getBoundingClientRect();
        const { width: targetElementWidth, height: targetElementHeight } = targetElementClientRect;
        const pointOffset = step.pointOffset;
        // 只通过 pointOffset 控制 point 的位置，默认在 target 的右下角，
        // offset 的基点也为默认位置
        return [targetElementWidth + pointOffset[0], targetElementHeight + pointOffset[1]];
    }

    private setPointPosition(pointPosition: [number, number]) {
        const currentPointContainer = this.renderer.createElement('div');

        this.renderer.addClass(currentPointContainer, 'thy-guider-highlight-container');
        if (this.guiderRef.config.pointClass) {
            this.addPointClass(currentPointContainer, this.guiderRef.config.pointClass);
        }
        this.renderer.setStyle(currentPointContainer, 'position', 'absolute');
        this.renderer.setStyle(currentPointContainer, 'left', pointPosition[0] + 'px');
        this.renderer.setStyle(currentPointContainer, 'top', pointPosition[1] + 'px');
        this.renderer.setStyle(currentPointContainer, 'transform', 'translate(-100%,-100%)');

        return currentPointContainer;
    }

    private addPointClass(el: any, pointClass: string | string[]) {
        if (isString(pointClass)) {
            this.renderer.addClass(el, pointClass);
        }
        if (isArray(pointClass)) {
            pointClass.forEach(classItem => {
                this.renderer.addClass(el, classItem);
            });
        }
    }

    private renderPoint(targetElement: Element, pointContainer: any) {
        this.renderer.appendChild(targetElement, pointContainer);
        this.lastPointerContainer = pointContainer;
        this.lastTargetElement = targetElement;
        this.createTip(this.step);
    }

    private removeLastPointContainer() {
        if (this.lastPointerContainer) {
            this.renderer.removeChild(this.document.body, this.lastPointerContainer);
            this.lastPointerContainer = undefined;
        }
    }

    private createTip(step: ThyGuiderStep) {
        if (this.isTipHasTarget(step)) {
            this.tipWithTarget(step);
        } else {
            this.tipWithoutTarget(step);
        }
    }

    private tipWithoutTarget(step: ThyGuiderStep) {
        const position = this.getTipPosition(step);
        this.lastPopoverRef = this.popover.open(this.guiderRef.config.hintComponent, {
            origin: null,
            originPosition: position,
            originActiveClass: '',
            panelClass: this.guiderRef.config.hintClass || '',
            backdropClosable: false,
            hasBackdrop: false,
            manualClosure: true,
            initialState: {
                guiderRef: this.guiderRef,
                stepRef: this
            },
            scrollStrategy: this.overlay.scrollStrategies.block()
        });
    }

    private getTipPosition(step: ThyGuiderStep): { x: number; y: number } {
        if (isPositionDataType(step.target)) {
            return step.target;
        }
        return this.guiderRef.config.defaultPosition;
    }

    private createTipContainer() {
        const tipContainer = this.renderer.createElement('div');
        this.renderer.addClass(tipContainer, 'thy-guider-content-container');
        this.renderer.setStyle(tipContainer, 'position', 'absolute');
        this.renderer.setStyle(tipContainer, 'top', '0px');
        this.renderer.setStyle(tipContainer, 'right', '0px');
        this.renderer.setStyle(tipContainer, 'bottom', '0px');
        this.renderer.setStyle(tipContainer, 'left', '0px');
        return tipContainer;
    }

    private tipWithTarget(step: ThyGuiderStep) {
        const targetElement = this.getTargetElement(step);
        const hintContainer = this.createTipContainer();

        this.renderer.appendChild(targetElement, hintContainer);
        this.lastTipContainer = hintContainer;

        const popoverConfig = {
            origin: hintContainer,
            placement: step.hintPlacement,
            panelClass: this.guiderRef.config.hintClass || '',
            backdropClosable: false,
            hasBackdrop: false,
            manualClosure: true,
            initialState: {
                guiderRef: this.guiderRef,
                stepRef: this
            },
            scrollStrategy: this.overlay.scrollStrategies.block()
        } as ThyPopoverConfig<any>;

        const pointPosition = this.getPointPosition(step, targetElement);
        const hintOffset = this.getTipOffset(step, pointPosition, targetElement);
        if (hintOffset) {
            popoverConfig.offset = hintOffset;
        }
        this.lastPopoverRef = this.popover.open(this.guiderRef.config.hintComponent, popoverConfig);
    }

    private getTipOffset(step: ThyGuiderStep, pointPosition: [number, number], targetElement: Element): number {
        const hintPlacement = step.hintPlacement;
        const targetElementClientRect = targetElement.getBoundingClientRect();
        const { width: targetElementWidth, height: targetElementHeight } = targetElementClientRect;
        let hintOffset: number = step.hintOffset || 0;
        const pointXAxisOffset = pointPosition[0];
        const pointYAxisOffset = pointPosition[1];

        if (hintPlacement.startsWith('top')) {
            if (pointYAxisOffset < pointContainerSize) {
                hintOffset = hintOffset + Math.abs(pointYAxisOffset) + pointContainerSize;
            }
        } else if (hintPlacement.startsWith('bottom')) {
            if (pointYAxisOffset > targetElementHeight) {
                hintOffset = hintOffset + (pointYAxisOffset - targetElementHeight) + 10; // 10 为空隙量
            }
        } else if (hintPlacement.startsWith('left')) {
            if (pointXAxisOffset < 0) {
                hintOffset = hintOffset + Math.abs(pointXAxisOffset) + pointContainerSize;
            }
        } else if (hintPlacement.startsWith('right')) {
            if (pointXAxisOffset > targetElementWidth) {
                hintOffset = hintOffset + (pointXAxisOffset - targetElementWidth) + 10; // 10 为空隙量
            }
        }
        return hintOffset;
    }

    private removeTip() {
        if (this.lastPopoverRef) {
            this.lastPopoverRef.close();
            this.lastPopoverRef = undefined;
        }
        if (this.lastTipContainer) {
            this.renderer.removeChild(this.document.body, this.lastTipContainer);
            this.lastTipContainer = undefined;
        }
        if (this.lastTargetElement && this.targetElementObserver) {
            this.targetElementObserver.unsubscribe();
            this.lastTargetElement = undefined;
            this.targetElementObserver = undefined;
        }
    }

    private isTipHasTarget(step: ThyGuiderStep): boolean {
        if (step.target) {
            return !isPositionDataType(step.target);
        } else {
            return !!this.guiderManager.getActiveTarget(step.key);
        }
    }
}
