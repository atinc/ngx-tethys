import { Injectable, ComponentRef, ComponentFactoryResolver, ApplicationRef, Injector, EmbeddedViewRef } from '@angular/core';
import { ThyPlacement } from 'ngx-tethys';
import { GuiderRef } from './guider-ref';
import { GuiderPosition, NOT_SET_POSITION, StepInfo } from './guider.class';
import { ThyPopover } from 'ngx-tethys/popover';
@Injectable()
export class GuiderDrawHintService {
    private refMap: { [key: string]: ComponentRef<any> } = {};
    private defaultPosition: GuiderPosition;
    private hintElem: HTMLElement;
    private step: StepInfo;
    private guiderRef: GuiderRef;
    constructor(
        private readonly componentFactoryResolver: ComponentFactoryResolver,
        private appRef: ApplicationRef,
        private injector: Injector,
        private popover: ThyPopover
    ) {}

    draw(step: StepInfo, guiderRef: GuiderRef) {
        this.guiderRef = guiderRef;
        this.step = step;
        this.defaultPosition = this.getHintDefaultPosition(guiderRef.option.hintDefaultPosition);
        // 1. 创建 componentRef
        const ref: ComponentRef<any> = this.componentFactoryResolver
            .resolveComponentFactory(guiderRef.option.component)
            .create(this.injector);

        // 2. 添加
        this.appRef.attachView(ref.hostView);

        // 3. DOM Element
        const domElem = (ref.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
        this.hintElem = domElem;

        // 4. class / styles position
        domElem.classList.add('thy-guider-hint-container');
        this.setStepHintStyle(step);

        const instance: any = ref.instance;
        // 设置基类的 Input
        console.log(step.data);
        instance.stepHintData = step.data;
        instance.guiderRef = guiderRef;
        ref.changeDetectorRef.detectChanges();

        this.refMap[step.key] = ref;
    }

    private getHintDefaultPosition(defaultPosition: GuiderPosition): GuiderPosition {
        // TODO 默认位置 左下角100，100距离
        return defaultPosition ? defaultPosition : [100, -100];
    }

    private setStepHintStyle(step: StepInfo) {
        if (this.defaultPosition && step.hintPosition === NOT_SET_POSITION) {
            document.body.appendChild(this.hintElem);

            const rowDirection = this.defaultPosition[0] > 0 ? 'left' : 'right';
            const columnDirection = this.defaultPosition[1] > 0 ? 'top' : 'bottom';
            this.hintElem.style.position = 'fixed';
            this.hintElem.style[rowDirection] = Math.abs(this.defaultPosition[0] as number) + 'px';
            this.hintElem.style[columnDirection] = Math.abs(this.defaultPosition[1] as number) + 'px';

            return;
        }
        this.popover.close();
        this.popover.open(this.guiderRef.option.component, {
            origin: document.querySelector(this.step.target) as HTMLElement,
            placement: this.step.hintPosition as ThyPlacement,
            backdropClosable: false,
            hasBackdrop: false,
            initialState: {
                stepHintData: step.data,
                guiderRef: this.guiderRef
            }
        });
    }

    remove(step: StepInfo) {
        if (this.refMap[step?.key]) {
            this.appRef.detachView(this.refMap[step.key].hostView);
            this.refMap[step.key].destroy();
            this.popover.close();
        }
    }
}
