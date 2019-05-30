import { Injectable, ElementRef, NgZone } from '@angular/core';
import { isNumber } from '../util/helpers';
import { NewClientRect } from './client-rect';

export enum PlacementTypes {
    left = 'left',
    right = 'right',
    center = 'center',
    top = 'top',
    bottom = 'bottom'
}

export interface PositioningOptions {
    /** The DOM element, ElementRef, or a selector string of an element which will be moved */
    attach?: HTMLElement | ElementRef | string;

    /** The DOM element, ElementRef, or a selector string of an element which the element will be attached to  */
    target?: HTMLElement | ElementRef | string;

    /**
     * A string of the form 'vert-attachment horiz-attachment' or 'placement'
     * - placement can be "top", "bottom", "left", "right"
     * not yet supported:
     * - vert-attachment can be any of 'top', 'middle', 'bottom'
     * - horiz-attachment can be any of 'left', 'center', 'right'
     */
    placement?: string;

    // 直接传入位置，不用根据 attachment target 计算，右击菜单使用
    position?: {
        top: number;
        left: number;
    };

    /** A string of the form 'vert-offset horiz-offset'
     * - vert-offset and horiz-offset can be of the form "20px" or "55%"
     */
    offset?: number;

    /** If true component will be attached to body */
    appendToBody?: boolean;

    /** If true component auto adapt top or bottom */
    autoAdapt?: boolean;
}

export const defaultPositioningOptions: PositioningOptions = {
    offset: 10,
    appendToBody: true,
    placement: 'bottom center'
};

@Injectable()
export class ThyPositioningService {
    constructor(private ngZone: NgZone) {}

    static getHTMLElement(element: HTMLElement | ElementRef | string): HTMLElement {
        // it means that we got a selector
        if (typeof element === 'string') {
            return document.querySelector(element) as HTMLElement;
        }

        if (element instanceof ElementRef) {
            return element.nativeElement;
        }

        return element as HTMLElement;
    }

    private autoPosition(
        targetElPosition: ClientRect,
        hostElPosition: ClientRect,
        targetElement: HTMLElement,
        preferredPosition?: string
    ) {
        if (
            (!preferredPosition || preferredPosition === 'right') &&
            targetElPosition.left + hostElPosition.left - targetElement.offsetWidth < 0
        ) {
            return 'right';
        } else if (
            (!preferredPosition || preferredPosition === 'top') &&
            targetElPosition.bottom + hostElPosition.bottom + targetElement.offsetHeight > window.innerHeight
        ) {
            return 'top';
        } else if (
            (!preferredPosition || preferredPosition === 'bottom') &&
            targetElPosition.top + hostElPosition.top - targetElement.offsetHeight < 0
        ) {
            return 'bottom';
        } else if (
            (!preferredPosition || preferredPosition === 'left') &&
            targetElPosition.right + hostElPosition.right + targetElement.offsetWidth > window.innerWidth
        ) {
            return 'left';
        }
        return null;
    }

    private getAllStyles(element: HTMLElement) {
        return window.getComputedStyle(element);
    }

    private getStyle(element: HTMLElement, prop: string): string {
        return (this.getAllStyles(element) as any)[prop];
    }

    private isStaticPositioned(element: HTMLElement): boolean {
        return (this.getStyle(element, 'position') || 'static') === 'static';
    }

    private offsetParent(element: HTMLElement): HTMLElement {
        let offsetParentEl = <HTMLElement>element.offsetParent || document.documentElement;

        while (
            offsetParentEl &&
            offsetParentEl !== document.documentElement &&
            this.isStaticPositioned(offsetParentEl)
        ) {
            offsetParentEl = <HTMLElement>offsetParentEl.offsetParent;
        }

        return offsetParentEl || document.documentElement;
    }

    private calculateTopBottomPosition(
        placementSecondary: string,
        attachElPosition: ClientRect,
        targetElPosition: ClientRect,
        offset: number
    ): ClientRect {
        const documentClientHeight = document.documentElement.clientHeight;
        if (placementSecondary === PlacementTypes.top) {
            targetElPosition.top = attachElPosition.top;
            targetElPosition.bottom = null;
            // Top 对齐时，下面的内容超过了整个屏幕的高度, 为了可以看见全部内容，牺牲 Top 对齐
            if (targetElPosition.top + targetElPosition.height > documentClientHeight) {
                targetElPosition.top = documentClientHeight - targetElPosition.height;
            }
        } else if (placementSecondary === PlacementTypes.bottom) {
            targetElPosition.bottom = documentClientHeight - attachElPosition.top - attachElPosition.height;
            targetElPosition.top = null;
            // Bottom 对齐时，上面的内容超过了整个屏幕的高度，为了可以看见全部内容，牺牲 Bottom 对齐
            if (targetElPosition.bottom + targetElPosition.height > documentClientHeight) {
                targetElPosition.bottom = documentClientHeight - targetElPosition.height;
            }
        } else {
            targetElPosition.top = attachElPosition.top + attachElPosition.height / 2 - targetElPosition.height / 2;
            // 顶部的内容被遮挡，牺牲居中，让顶部侧内容可见
            if (targetElPosition.top < 0) {
                targetElPosition.top = offset;
            } else if (targetElPosition.top + targetElPosition.height > documentClientHeight) {
                // 下面的内容被遮挡，牺牲居中，让下方的内容可见
                targetElPosition.top = documentClientHeight - targetElPosition.height + offset;
            }
            targetElPosition.bottom = null;
        }
        return targetElPosition;
    }

    private calculateLeftRightPosition(
        placementSecondary: string,
        attachElPosition: ClientRect,
        targetElPosition: ClientRect,
        offset: number
    ): ClientRect {
        const documentClientWidth = document.documentElement.clientWidth;
        if (placementSecondary === PlacementTypes.right) {
            targetElPosition.right =
                document.documentElement.clientWidth - attachElPosition.left - attachElPosition.width;
            targetElPosition.left = null;
            // 右对齐时，左侧的内容超过了整个屏幕的宽度, 为了可以看见全部内容，牺牲右对齐
            if (targetElPosition.right + targetElPosition.width > documentClientWidth) {
                targetElPosition.right = documentClientWidth - targetElPosition.width - offset;
            }
        } else if (placementSecondary === PlacementTypes.left) {
            targetElPosition.left = attachElPosition.left;
            // 左对齐时，右侧的内容超过了整个屏幕的宽度, 为了可以看见全部内容，牺牲左对齐
            if (targetElPosition.left + targetElPosition.width > documentClientWidth) {
                targetElPosition.left = documentClientWidth - targetElPosition.width - offset;
            }
        } else {
            targetElPosition.left = attachElPosition.left + attachElPosition.width / 2 - targetElPosition.width / 2;
            // 左侧的内容被遮挡，牺牲居中，让左侧内容可见
            if (targetElPosition.left < 0) {
                targetElPosition.left = offset;
            } else if (targetElPosition.left + targetElPosition.width > documentClientWidth) {
                // 右侧的内容被遮挡，牺牲居中，让右侧内容可见
                targetElPosition.left = documentClientWidth - targetElPosition.width - offset;
            }
        }
        return targetElPosition;
    }

    private autoAdaptTopBottom(
        placementPrimary: string,
        hostElPosition: NewClientRect,
        targetElPosition: NewClientRect,
        offset: number,
        autoAdapt = true
    ) {
        if (!autoAdapt) {
            return;
        }
        const documentClientHeight = document.documentElement.clientHeight;
        if (placementPrimary === 'top') {
            // 如果 Top 空间不够，则自动适应 Bottom Top 和 Bottom 空间都不够，默认为可视区域Top
            if (hostElPosition.originBottom - hostElPosition.height - targetElPosition.height < 0) {
                if (documentClientHeight - hostElPosition.originBottom >= targetElPosition.height) {
                    targetElPosition.bottom =
                        targetElPosition.bottom - targetElPosition.height - hostElPosition.height - offset;
                } else {
                    targetElPosition.bottom = null;
                    targetElPosition.top = hostElPosition.top - hostElPosition.originTop;
                }
            }
        }
        if (placementPrimary === 'bottom') {
            // 如果 Bottom 空间不够，则自动适应 Top，如果 Bottom 和 Top 空间都不够，默认为可视区域Top
            if (hostElPosition.originBottom + targetElPosition.height > documentClientHeight) {
                const newTop = hostElPosition.top - targetElPosition.height - offset;
                if (newTop > hostElPosition.top - hostElPosition.originTop) {
                    targetElPosition.top = newTop;
                } else {
                    targetElPosition.top = hostElPosition.top - hostElPosition.originTop;
                }
            }
        }
    }

    public position(element: HTMLElement, round = true): NewClientRect {
        let elPosition: NewClientRect;
        let parentOffset: NewClientRect = {
            width: 0,
            height: 0,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
        };

        if (this.getStyle(element, 'position') === 'fixed') {
            const bcRect = element.getBoundingClientRect();
            elPosition = {
                width: bcRect.width,
                height: bcRect.height,
                top: bcRect.top,
                bottom: bcRect.bottom,
                left: bcRect.left,
                right: bcRect.right,
                originTop: bcRect.top,
                originBottom: bcRect.bottom,
                originLeft: bcRect.left,
                originRight: bcRect.right
            };
        } else {
            const offsetParentEl = this.offsetParent(element);

            elPosition = this.offset(element, false);

            if (offsetParentEl !== document.documentElement) {
                parentOffset = this.offset(offsetParentEl, false);
            }

            parentOffset.top += offsetParentEl.clientTop;
            parentOffset.left += offsetParentEl.clientLeft;
        }

        elPosition.top -= parentOffset.top;
        elPosition.bottom -= parentOffset.top;
        elPosition.left -= parentOffset.left;
        elPosition.right -= parentOffset.left;

        if (round) {
            elPosition.top = Math.round(elPosition.top);
            elPosition.bottom = Math.round(elPosition.bottom);
            elPosition.left = Math.round(elPosition.left);
            elPosition.right = Math.round(elPosition.right);
        }

        return elPosition;
    }

    public offset(element: HTMLElement, round = true): NewClientRect {
        const elBcr = element.getBoundingClientRect();
        const viewportOffset = {
            top: window.pageYOffset - document.documentElement.clientTop,
            left: window.pageXOffset - document.documentElement.clientLeft
        };

        const elOffset = {
            height: elBcr.height || element.offsetHeight,
            width: elBcr.width || element.offsetWidth,
            top: elBcr.top + viewportOffset.top,
            bottom: elBcr.bottom + viewportOffset.top,
            left: elBcr.left + viewportOffset.left,
            right: elBcr.right + viewportOffset.left,
            originTop: elBcr.top,
            originBottom: elBcr.bottom,
            originLeft: elBcr.left,
            originRight: elBcr.right
        };

        if (round) {
            elOffset.height = Math.round(elOffset.height);
            elOffset.width = Math.round(elOffset.width);
            elOffset.top = Math.round(elOffset.top);
            elOffset.bottom = Math.round(elOffset.bottom);
            elOffset.left = Math.round(elOffset.left);
            elOffset.right = Math.round(elOffset.right);
        }

        return elOffset;
    }

    /**
     * 计算弹出层的位置
     * @param hostElement 被追加的元素
     * @param targetElement 弹出层内元素
     * @param options 参数
     */
    public calculatePosition(
        hostElement: HTMLElement,
        targetElement: HTMLElement,
        options: PositioningOptions
    ): ClientRect {
        const { placement, appendToBody, offset, position, autoAdapt } = options;
        let hostElPosition: NewClientRect = null;
        // 外部传入已经算好的位置, 需要设置 hostElPosition 宽度和高度为 0，不计算位置，主要使用于右击弹出位置计算
        if (position) {
            hostElPosition = {
                top: position.top || 0,
                left: position.left || 0,
                bottom: 0,
                right: 0,
                width: 0,
                height: 0
            };
        } else {
            hostElPosition = appendToBody ? this.offset(hostElement, false) : this.position(hostElement, false);
        }

        const targetElStyles = this.getAllStyles(targetElement);

        const documentClientWidth = document.documentElement.clientWidth;
        const documentClientHeight = document.documentElement.clientHeight;

        let placementPrimary = placement.split(' ')[0] || 'top';
        const placementSecondary = placement.split(' ')[1] || 'center';

        const targetElBCR = targetElement.getBoundingClientRect();
        const targetElPosition: NewClientRect = {
            height: targetElBCR.height || targetElement.offsetHeight,
            width: targetElBCR.width || targetElement.offsetWidth,
            top: null,
            bottom: null,
            left: null,
            right: null,
            originTop: targetElBCR.top,
            originBottom: targetElBCR.bottom,
            originLeft: targetElBCR.left,
            originRight: targetElBCR.right
        };

        if (placementPrimary === 'auto') {
            let newPlacementPrimary = this.autoPosition(
                targetElPosition,
                hostElPosition,
                targetElement,
                placementSecondary
            );
            if (!newPlacementPrimary) {
                newPlacementPrimary = this.autoPosition(targetElPosition, hostElPosition, targetElement);
            }
            if (newPlacementPrimary) {
                placementPrimary = newPlacementPrimary;
            }
            targetElement.classList.add(placementPrimary);
        }

        switch (placementPrimary) {
            case 'top':
                targetElPosition.bottom = documentClientHeight - hostElPosition.top + offset;
                targetElPosition.top = null;
                this.autoAdaptTopBottom(placementPrimary, hostElPosition, targetElPosition, offset, autoAdapt);
                this.calculateLeftRightPosition(placementSecondary, hostElPosition, targetElPosition, offset);
                break;
            case 'bottom':
                targetElPosition.top = hostElPosition.top + hostElPosition.height + offset;
                this.autoAdaptTopBottom(placementPrimary, hostElPosition, targetElPosition, offset, autoAdapt);
                this.calculateLeftRightPosition(placementSecondary, hostElPosition, targetElPosition, offset);
                break;
            case 'left':
                targetElPosition.right = documentClientWidth - hostElPosition.left + offset;
                targetElPosition.left = null;
                this.calculateTopBottomPosition(placementSecondary, hostElPosition, targetElPosition, offset);
                break;
            case 'right':
                targetElPosition.left = hostElPosition.left + hostElPosition.width + offset;
                targetElPosition.right = null;
                this.calculateTopBottomPosition(placementSecondary, hostElPosition, targetElPosition, offset);
                break;
        }

        // targetElPosition.top = Math.round(targetElPosition.top);
        // targetElPosition.bottom = Math.round(targetElPosition.bottom);
        // targetElPosition.left = Math.round(targetElPosition.left);
        // targetElPosition.right = Math.round(targetElPosition.right);

        return targetElPosition;
    }

    setPosition(options: PositioningOptions): void {
        const { attach, target } = options;
        const attachElement = ThyPositioningService.getHTMLElement(attach);
        const targetElement = ThyPositioningService.getHTMLElement(target);
        setTimeout(() => {
            this.ngZone.runOutsideAngular(() => {
                const pos = this.calculatePosition(attachElement, targetElement, options);
                if (isNumber(pos.top)) {
                    targetElement.style.top = `${pos.top}px`;
                } else if (isNumber(pos.bottom)) {
                    targetElement.style.bottom = `${pos.bottom}px`;
                }
                if (isNumber(pos.left)) {
                    targetElement.style.left = `${pos.left}px`;
                } else if (isNumber(pos.right)) {
                    targetElement.style.right = `${pos.right}px`;
                }
            });
        });
    }
}
