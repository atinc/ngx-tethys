import { RendererFactory2 } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { ThyPopover, ThyPopoverConfig } from 'ngx-tethys/popover';
import { helpers } from 'ngx-tethys/util';
import { fromEvent, Subscription } from 'rxjs';
import { ThyGuiderRef } from './guider-ref';
import { ThyGuiderTipComponent } from './guider-tip/guider-tip.component';
import { GuiderTargetPosition, StepInfo, defaultTipPosition } from './guider.class';

export class ThyGuiderStepRef {
    private renderer: Renderer2;

    private lastPointerContainer: any;

    private lastTargetElement: Element;

    private targetElementObserver: Subscription;

    private guiderRef: ThyGuiderRef;

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

        const pointContainer = this.setPointPosition(step, pointPosition);
        this.renderPoint(targetElement, pointContainer);
    }

    private getPointPosition(step: StepInfo, targetElement: Element): GuiderTargetPosition {
        const targetElementClientRect = targetElement.getBoundingClientRect();
        const { width: targetElementWidth, height: targetElementHeight } = targetElementClientRect;

        // 如果 element 超出 document 的高度/宽度，需要进行滚动展示
        // 先滚动再计算
        // 如果显示过程中进行滚动，那么需要监测滚动事件，再做进一步处理
        const pointOffset = step.pointOffset || [0, 0];
        // 只通过 pointOffset 控制point 的位置，为空默认在 target 的中间，
        // 有值则为target 的左上角
        if (!step.pointOffset) {
            return [targetElementWidth / 2, targetElementHeight / 2];
        }
        return pointOffset;
    }

    private setPointPosition(step: StepInfo, pointPosition: GuiderTargetPosition) {
        const currentPointContainer = this.renderer.createElement('div');

        this.renderer.addClass(currentPointContainer, 'thy-guider-highlight-container');
        this.renderer.setStyle(currentPointContainer, 'position', 'absolute');
        this.renderer.setStyle(currentPointContainer, 'left', pointPosition[0] + 'px');
        this.renderer.setStyle(currentPointContainer, 'top', pointPosition[1] + 'px');
        if (!step.pointOffset) {
            this.renderer.setStyle(currentPointContainer, 'transform', 'translate(-50%,-50%)');
        }

        return currentPointContainer;
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
        if (this.lastTargetElement && this.targetElementObserver) {
            this.targetElementObserver.unsubscribe();
            this.lastTargetElement = undefined;
            this.targetElementObserver = undefined;
        }
    }

    private createTip(step: StepInfo) {
        this.step = step;
        if (!step.target) {
            this.tooltipWithoutTarget(step);
        } else {
            this.tooltipWithTarget(step);
        }
    }

    private tooltipWithoutTarget(step: StepInfo) {
        const position = this.getTipPosition();
        this.popover.open(this.guiderRef.config.component || ThyGuiderTipComponent, {
            origin: null,
            originPosition: {
                x: position[0],
                y: position[1]
            },
            originActiveClass: '',
            backdropClosable: false,
            hasBackdrop: false,
            initialState: {
                stepTipData: step.data,
                guiderRef: this.guiderRef
            }
        });
    }

    private getTipPosition(): GuiderTargetPosition {
        if (!this.guiderRef.config.defaultTipPosition) {
            return defaultTipPosition;
        }
        return this.guiderRef.config.defaultTipPosition;
    }

    private tooltipWithTarget(step: StepInfo) {
        const popoverConfig = {
            origin: this.lastPointerContainer,
            placement: step.tipPlacement,
            backdropClosable: false,
            hasBackdrop: false,
            initialState: {
                stepTipData: step.data,
                guiderRef: this.guiderRef
            }
        } as ThyPopoverConfig<any>;

        if (step.tipOffset) {
            popoverConfig.offset = step.tipOffset;
        }
        this.popover.open(this.guiderRef.config.component || ThyGuiderTipComponent, popoverConfig);
    }

    private removeTip() {
        this.popover.close();
    }
}
