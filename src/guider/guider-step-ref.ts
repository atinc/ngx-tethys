import { RendererFactory2 } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { ThyPopover, ThyPopoverConfig, ThyPopoverRef } from 'ngx-tethys/popover';
import { helpers } from 'ngx-tethys/util';
import { fromEvent, Subscription } from 'rxjs';
import { ThyGuiderRef } from './guider-ref';
import { ThyGuiderTipComponent } from './guider-tip/guider-tip.component';
import { GuiderTargetPosition, StepInfo, defaultTipPosition, GuiderOffset } from './guider.class';

const pointContainerSize = 28;
export class ThyGuiderStepRef {
    private renderer: Renderer2;

    private lastPointerContainer: any;

    private lastTargetElement: Element;

    private targetElementObserver: Subscription;

    private guiderRef: ThyGuiderRef;

    private lastPopoverRef: ThyPopoverRef<any>;

    constructor(
        private step: StepInfo,
        private readonly rendererFactory: RendererFactory2,
        private popover: ThyPopover,
        private document: any
    ) {
        this.step = step;
        this.renderer = this.rendererFactory.createRenderer(null, null);
    }

    public show(guiderRef: ThyGuiderRef) {
        this.guiderRef = guiderRef;
        this.createPoint(this.step, guiderRef);
    }

    public dispose() {
        this.removeLastPointContainer();
        this.removeTip();
    }

    private createPoint(step: StepInfo, guiderRef: ThyGuiderRef) {
        if (!step.target) {
            this.createTip(this.step);
            return;
        }

        const targetElement = this.document.querySelector(step.target);

        this.targetElementObserver = fromEvent(targetElement, 'click').subscribe(() => {
            guiderRef.targetClicked().next(step);
        });

        if (helpers.isNull(targetElement)) {
            throw new Error(`there is no target called ${step.target}`);
        }
        const positionValue = targetElement?.style?.position;
        if (!positionValue || positionValue === 'static') {
            this.renderer.setStyle(targetElement, 'position', 'relative');
        }
        this.setStyleForPointContainer(step, targetElement);
    }

    private setStyleForPointContainer(step: StepInfo, targetElement: Element) {
        const pointPosition = this.getPointPosition(step, targetElement);

        const pointContainer = this.setPointPosition(pointPosition);
        this.renderPoint(targetElement, pointContainer);
    }

    private getPointPosition(step: StepInfo, targetElement: Element): GuiderTargetPosition {
        const targetElementClientRect = targetElement.getBoundingClientRect();
        const { width: targetElementWidth, height: targetElementHeight } = targetElementClientRect;

        // 如果 element 超出 document 的高度/宽度，需要进行滚动展示
        // 先滚动再计算
        // 如果显示过程中进行滚动，那么需要监测滚动事件，再做进一步处理
        const pointOffset = step.pointOffset;
        // 只通过 pointOffset 控制point 的位置，默认在 target 的右下角，
        // offset 的基点也为默认位置
        return [targetElementWidth + pointOffset[0], targetElementHeight + pointOffset[1]];
    }

    private setPointPosition(pointPosition: GuiderTargetPosition) {
        const currentPointContainer = this.renderer.createElement('div');

        this.renderer.addClass(currentPointContainer, 'thy-guider-highlight-container');
        this.renderer.setStyle(currentPointContainer, 'position', 'absolute');
        this.renderer.setStyle(currentPointContainer, 'left', pointPosition[0] + 'px');
        this.renderer.setStyle(currentPointContainer, 'top', pointPosition[1] + 'px');
        this.renderer.setStyle(currentPointContainer, 'transform', 'translate(-100%,-100%)');

        return currentPointContainer;
    }

    private renderPoint(targetElement: Element, pointContainer: any) {
        this.renderer.appendChild(targetElement, pointContainer);
        this.lastPointerContainer = pointContainer;
        this.lastTargetElement = targetElement;
        this.createTip(this.step);
    }

    private removeLastPointContainer() {
        const existedPointContainer = this.document.querySelector('.thy-guider-highlight-container');
        if (this.lastPointerContainer || existedPointContainer) {
            this.renderer.removeChild(this.document.body, this.lastPointerContainer || existedPointContainer);
            this.lastPointerContainer = undefined;
        }
        if (this.lastTargetElement && this.targetElementObserver) {
            this.targetElementObserver.unsubscribe();
            this.lastTargetElement = undefined;
            this.targetElementObserver = undefined;
        }
    }

    private createTip(step: StepInfo) {
        if (!step.target) {
            this.tipWithoutTarget(step);
        } else {
            this.tipWithTarget(step);
        }
    }

    private tipWithoutTarget(step: StepInfo) {
        const position = this.getTipPosition();
        this.lastPopoverRef = this.popover.open(this.guiderRef.config.component || ThyGuiderTipComponent, {
            origin: null,
            originPosition: {
                x: position[0],
                y: position[1]
            },
            originActiveClass: '',
            backdropClosable: false,
            hasBackdrop: false,
            manualClosure: true,
            initialState: {
                stepTipData: step.data,
                guiderRef: this.guiderRef,
                stepInfo: step
            }
        });
    }

    private getTipPosition(): GuiderTargetPosition {
        if (!this.guiderRef.config.tipPosition) {
            return defaultTipPosition;
        }
        return this.guiderRef.config.tipPosition;
    }

    private tipWithTarget(step: StepInfo) {
        const targetElement = this.document.querySelector(step.target);

        const popoverConfig = {
            origin: targetElement,
            placement: step.tipPlacement,
            backdropClosable: false,
            hasBackdrop: false,
            manualClosure: true,
            initialState: {
                stepTipData: step.data,
                guiderRef: this.guiderRef,
                stepInfo: step
            }
        } as ThyPopoverConfig<any>;

        const pointPosition = this.getPointPosition(step, targetElement);
        const tipOffset = this.getTipOffset(step, pointPosition, targetElement);
        if (tipOffset) {
            popoverConfig.offset = tipOffset;
        }
        this.lastPopoverRef = this.popover.open(this.guiderRef.config.component || ThyGuiderTipComponent, popoverConfig);
    }

    private getTipOffset(step: StepInfo, pointPosition: GuiderOffset, targetElement: Element): number {
        const tipPlacement = step.tipPlacement;
        const targetElementClientRect = targetElement.getBoundingClientRect();
        const { width: targetElementWidth, height: targetElementHeight } = targetElementClientRect;
        let tipOffset: number = step.tipOffset || 0;
        const pointXAxisOffset = pointPosition[0];
        const pointYAxisOffset = pointPosition[1];

        if (tipPlacement.startsWith('top')) {
            if (pointYAxisOffset < pointContainerSize) {
                tipOffset = tipOffset + Math.abs(pointYAxisOffset) + pointContainerSize;
            }
        } else if (tipPlacement.startsWith('bottom')) {
            if (pointYAxisOffset > targetElementHeight) {
                tipOffset = tipOffset + (pointYAxisOffset - targetElementHeight) + 10; // 10 为空隙量
            }
        } else if (tipPlacement.startsWith('left')) {
            if (pointXAxisOffset < 0) {
                tipOffset = tipOffset + Math.abs(pointXAxisOffset) + pointContainerSize;
            }
        } else if (tipPlacement.startsWith('right')) {
            if (pointXAxisOffset > targetElementWidth) {
                tipOffset = tipOffset + (pointXAxisOffset - targetElementWidth) + 10; // 10 为空隙量
            }
        } else {
            // do nothings
        }
        return tipOffset;
    }

    private removeTip() {
        if (this.lastPopoverRef) {
            this.lastPopoverRef.close();
            this.lastPopoverRef = undefined;
        }
    }
}
