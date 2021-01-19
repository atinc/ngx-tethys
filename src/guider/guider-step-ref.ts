import { ApplicationRef, ComponentFactoryResolver, ComponentRef, EmbeddedViewRef, Injector, RendererFactory2 } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { ThyPlacement } from 'ngx-tethys';
import { ThyPopover } from 'ngx-tethys/popover';
import { helpers } from 'ngx-tethys/util';
import { GuiderRef } from './guider-ref';
import { GuiderPlacement, NOT_SET_POSITION, StepInfo } from './guider.class';

export class ThyGuiderStepRef {
    private renderer: Renderer2;

    private step: StepInfo;

    private lastPointerContainer: any;

    private refMap: { [key: string]: ComponentRef<any> } = {};

    private defaultPosition: GuiderPlacement;

    private hintElem: HTMLElement;

    private guiderRef: GuiderRef;

    constructor(
        private readonly rendererFactory: RendererFactory2,
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector,
        private popover: ThyPopover
    ) {
        this.renderer = this.rendererFactory.createRenderer(null, null);
    }

    public attach(step: StepInfo, guiderRef: GuiderRef) {
        this.createPoint(step);
        this.createTooltip(step, guiderRef);
    }

    public dispose(step: StepInfo) {
        this.removeLastPointContainer();
        this.removeTooltip(step);
    }

    private createPoint(step: StepInfo) {
        if (!step.target) {
            return;
        }
        const targetElement = document.querySelector(step.target);
        if (helpers.isNull(targetElement)) {
            throw new Error(`there is no target called ${step.target}`);
        }

        // const currentHighlightContainer = this.renderer.createElement('div');
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
            this.renderer.removeChild(document.body, this.lastPointerContainer);
            this.lastPointerContainer = undefined;
        }
    }

    private createTooltip(step: StepInfo, guiderRef: GuiderRef) {
        this.guiderRef = guiderRef;
        this.step = step;
        this.defaultPosition = this.getTooltipDefaultPosition(guiderRef.option.tooltipDefaultPosition);
        this.removeTooltip(step);

        if (this.defaultPosition && !step.target) {
            this.tooltipWithoutTarget(step);
        } else {
            this.tooltipWithTarget(step);
        }
    }

    private getTooltipDefaultPosition(defaultPosition: GuiderPlacement): GuiderPlacement {
        // TODO 默认位置 左下角100，100距离
        return defaultPosition ? defaultPosition : [100, -100];
    }

    private tooltipWithoutTarget(step: StepInfo) {
        // this.removeTooltip(step);
        // 1. 创建 componentRef
        const ref: ComponentRef<any> = this.componentFactoryResolver
            .resolveComponentFactory(this.guiderRef.option.component)
            .create(this.injector);

        // 2. 添加
        this.appRef.attachView(ref.hostView);

        // 3. DOM Element
        const domElem = (ref.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        this.hintElem = domElem;

        // 4. class / styles position
        domElem.classList.add('thy-guider-hint-container');

        // 5. set position
        this.setTooltipWithoutTargetStyles();

        const instance: any = ref.instance;
        // 设置基类的 Input
        instance.stepTooltipData = step.data;
        instance.guiderRef = this.guiderRef;
        ref.changeDetectorRef.detectChanges();

        this.refMap[step.key] = ref;
    }

    private tooltipWithTarget(step: StepInfo) {
        this.popover.open(this.guiderRef.option.component, {
            origin: document.querySelector(this.step.target) as HTMLElement,
            placement: this.step.tooltipPosition as ThyPlacement,
            backdropClosable: false,
            hasBackdrop: false,
            initialState: {
                stepTooltipData: step.data,
                guiderRef: this.guiderRef
            }
        });
    }

    private setTooltipWithoutTargetStyles() {
        document.body.appendChild(this.hintElem);

        const rowDirection = this.defaultPosition[0] > 0 ? 'left' : 'right';
        const columnDirection = this.defaultPosition[1] > 0 ? 'top' : 'bottom';
        this.hintElem.style.position = 'fixed';
        this.hintElem.style[rowDirection] = Math.abs(this.defaultPosition[0] as number) + 'px';
        this.hintElem.style[columnDirection] = Math.abs(this.defaultPosition[1] as number) + 'px';
    }

    // private setStepTooltipStyle(step: StepInfo) {
    //     if (this.defaultPosition && step.tooltipPosition === NOT_SET_POSITION) {
    //         document.body.appendChild(this.hintElem);

    //         const rowDirection = this.defaultPosition[0] > 0 ? 'left' : 'right';
    //         const columnDirection = this.defaultPosition[1] > 0 ? 'top' : 'bottom';
    //         this.hintElem.style.position = 'fixed';
    //         this.hintElem.style[rowDirection] = Math.abs(this.defaultPosition[0] as number) + 'px';
    //         this.hintElem.style[columnDirection] = Math.abs(this.defaultPosition[1] as number) + 'px';

    //         return;
    //     }
    //     this.popover.close();
    //     this.popover.open(this.guiderRef.option.component, {
    //         origin: document.querySelector(this.step.target) as HTMLElement,
    //         placement: this.step.tooltipPosition as ThyPlacement,
    //         backdropClosable: false,
    //         hasBackdrop: false,
    //         initialState: {
    //             stepHintData: step.data,
    //             guiderRef: this.guiderRef
    //         }
    //     });
    // }

    private removeTooltip(step: StepInfo) {
        if (this.refMap[step?.key]) {
            this.appRef.detachView(this.refMap[step.key].hostView);
            this.refMap[step.key].destroy();
        } else {
            this.popover.close();
        }
    }
}
