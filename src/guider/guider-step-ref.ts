import { RendererFactory2 } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { ThyPlacement } from 'ngx-tethys/core';
import { ThyPopover, ThyPopoverConfig } from 'ngx-tethys/popover';
import { helpers } from 'ngx-tethys/util';
import { ThyGuiderRef } from './guider-ref';
import { ThyGuiderTipComponent } from './guider-tip/guider-tip.component';
import { GuiderOriginPosition, GuiderPlacement, StepInfo } from './guider.class';

export class ThyGuiderStepRef {
    private renderer: Renderer2;

    private lastPointerContainer: any;

    private defaultPosition: GuiderPlacement;

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

    private createTip(step: StepInfo, guiderRef: ThyGuiderRef) {
        this.guiderRef = guiderRef;
        this.step = step;
        this.removeTip();
        if (!step.target) {
            this.tooltipWithoutTarget(step);
        } else {
            this.tooltipWithTarget(step);
        }
    }

    private tooltipWithoutTarget(step: StepInfo) {
        const position = this.setTipPosition(step);
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

    private setTipPosition(step: StepInfo): GuiderOriginPosition {
        // TODO 当无target时，并且 tipPosition 为 ThyPlacement 类型时，默认位置为[0,0]
        if (!helpers.isArray(step.tipPosition)) {
            return [0, 0];
        }
        return step.tipPosition as GuiderOriginPosition;
    }

    private tooltipWithTarget(step: StepInfo) {
        // TODO 当target 不为空时，目前 placement 只能设置为 ThyPlacement，

        const popoverConfig = {
            origin: this.document.querySelector(this.step.target) as HTMLElement,
            placement: helpers.isArray(this.step.tipPosition) ? 'right' : (this.step.tipPosition as ThyPlacement),
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
