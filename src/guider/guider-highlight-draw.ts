import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { helpers } from 'ngx-tethys/util';
import { StepInfo } from './guider.class';

@Injectable()
export class GuiderDrawHighlightService {
    private renderer: Renderer2;
    private targetElement: Element;
    private targetAbsoluteTop: number;
    private targetAbsoluteLeft: number;
    private targetWidth: number;
    private targetHeight: number;
    private currentHighlightContainer: any;
    private lastHighlightContainer: any;

    constructor(private readonly rendererFactory: RendererFactory2) {
        this.setRenderer();
    }
    private setRenderer() {
        this.renderer = this.rendererFactory.createRenderer(null, null);
    }

    draw(step: StepInfo) {
        console.log(step);
        if (!step.target) {
            return;
        }
        this.targetElement = document.querySelector(step.target);
        if (helpers.isNull(this.targetElement)) {
            throw new Error(`there is no target called ${step.target}`);
        }
        const targetRect = this.targetElement.getBoundingClientRect();
        this.targetAbsoluteTop = targetRect.top;
        this.targetAbsoluteLeft = targetRect.left;
        this.targetWidth = targetRect.width;
        this.targetHeight = targetRect.height;

        this.currentHighlightContainer = this.renderer.createElement('div');
        this.renderer.setStyle(this.targetElement, 'position', 'relative');
        this.renderer.addClass(this.currentHighlightContainer, 'thy-guider-highlight-container');
        this.renderer.setStyle(this.currentHighlightContainer, 'position', 'absolute');
        this.setHighLightPosition(step);
        this.removeLastHighlightContainer();

        this.drawCurrentHighlight();
        this.lastHighlightContainer = this.currentHighlightContainer;
    }

    remove() {
        this.removeLastHighlightContainer();
    }

    private removeLastHighlightContainer() {
        if (this.lastHighlightContainer) {
            this.renderer.removeChild(document.body, this.lastHighlightContainer);
            this.lastHighlightContainer = undefined;
        }
    }

    private setHighLightPosition(step: StepInfo) {
        // 如果 element 超出 document 的高度/宽度，需要进行滚动展示
        // 先滚动再计算
        // 如果显示过程中进行滚动，那么需要监测滚动事件，再做进一步处理
        const setPosition = step.highLightPosition;
        if (helpers.isArray(setPosition)) {
            this.renderer.setStyle(this.currentHighlightContainer, 'left', setPosition[0] + 'px');
            this.renderer.setStyle(this.currentHighlightContainer, 'top', setPosition[1] + 'px');
        } else {
            // TODO ThyPlacement 的情况
        }
    }

    redraw(step: StepInfo) {
        // 当滚动或者 resize 事件发生后
        // update highlight position
    }

    private drawCurrentHighlight() {
        this.renderer.appendChild(this.targetElement, this.currentHighlightContainer);
    }
}
