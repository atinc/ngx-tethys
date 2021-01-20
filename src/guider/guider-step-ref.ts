import { RendererFactory2 } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { ThyPlacement } from 'ngx-tethys';
import { ThyPopover } from 'ngx-tethys/popover';
import { helpers } from 'ngx-tethys/util';
import { GuiderRef } from './guider-ref';
import { GuiderPlacement, StepInfo } from './guider.class';

export class ThyGuiderStepRef {
    private renderer: Renderer2;

    private lastPointerContainer: any;

    private defaultPosition: GuiderPlacement;

    private guiderRef: GuiderRef;

    constructor(
        private step: StepInfo,
        private readonly rendererFactory: RendererFactory2,
        private popover: ThyPopover,
        private document: any
    ) {
        this.step = step;
        this.renderer = this.rendererFactory.createRenderer(null, null);
    }

    public show(guiderRef: GuiderRef) {
        this.createPoint(this.step);
        this.createTip(this.step, guiderRef);
    }

    public dispose() {
        this.removeLastPointContainer();
        this.removeTip();
    }

    private createPoint(step: StepInfo) {
        if (!step.target) {
            return;
        }
        const targetElement = this.document.querySelector(step.target);
        if (helpers.isNull(targetElement)) {
            throw new Error(`there is no target called ${step.target}`);
        }

        this.renderer.setStyle(targetElement, 'position', 'relative');
        this.setStyleForPointContainer(step, targetElement);
    }

    private setStyleForPointContainer(step: StepInfo, targetElement: Element) {
        const currentPointContainer = this.renderer.createElement('div');

        this.renderer.addClass(currentPointContainer, 'thy-guider-highlight-container');
        this.renderer.setStyle(currentPointContainer, 'position', 'absolute');

        // 如果 element 超出 document 的高度/宽度，需要进行滚动展示
        // 先滚动再计算
        // 如果显示过程中进行滚动，那么需要监测滚动事件，再做进一步处理
        const setPosition = step.pointPosition;
        if (helpers.isArray(setPosition)) {
            this.renderer.setStyle(currentPointContainer, setPosition[0] > 0 ? 'left' : 'right', setPosition[0] + 'px');
            this.renderer.setStyle(currentPointContainer, setPosition[1] > 0 ? 'top' : 'bottom', setPosition[1] + 'px');
        } else {
            // TODO ThyPlacement 的情况
        }
        this.renderPoint(targetElement, currentPointContainer);
    }

    private renderPoint(targetElement: Element, pointContainer: any) {
        this.removeLastPointContainer();

        this.renderer.appendChild(targetElement, pointContainer);
        this.lastPointerContainer = pointContainer;
    }

    private removeLastPointContainer() {
        if (this.lastPointerContainer) {
            this.renderer.removeChild(this.document.body, this.lastPointerContainer);
            this.lastPointerContainer = undefined;
        }
    }

    private createTip(step: StepInfo, guiderRef: GuiderRef) {
        this.guiderRef = guiderRef;
        this.step = step;
        this.defaultPosition = this.getTipDefaultPosition(guiderRef.config.tipDefaultPosition);
        this.removeTip();

        if (this.defaultPosition && !step.target) {
            this.tooltipWithoutTarget(step);
        } else {
            this.tooltipWithTarget(step);
        }
    }

    private getTipDefaultPosition(defaultPosition: GuiderPlacement): GuiderPlacement {
        // TODO 默认位置 左下角100，100距离
        return defaultPosition ? defaultPosition : [100, -100];
    }

    private tooltipWithoutTarget(step: StepInfo) {
        this.popover.open(this.guiderRef.config.component, {
            origin: null,
            // TODO originPosition
            originPosition: {
                x: 100,
                y: 100
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
    private tooltipWithTarget(step: StepInfo) {
        this.popover.open(this.guiderRef.config.component, {
            origin: this.document.querySelector(this.step.target) as HTMLElement,
            placement: (this.step.tipPosition as ThyPlacement) || 'right', // TODO
            backdropClosable: false,
            hasBackdrop: false,
            initialState: {
                stepTipData: step.data,
                guiderRef: this.guiderRef
            }
        });
    }

    private removeTip() {
        this.popover.close();
    }
}
