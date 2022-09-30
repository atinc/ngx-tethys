import { Injectable, Renderer2, inject, ElementRef, RendererStyleFlags2 } from '@angular/core';

export abstract class AbstractElementRenderer {
    private renderer = inject(Renderer2);

    protected abstract element: Element;

    private classNames: string[] = [];

    setElement(element: Element) {
        this.element = element;
    }

    updateClass(classNames: string[]) {
        if (this.classNames) {
            this.classNames.forEach(className => {
                if (classNames.indexOf(className) < 0) {
                    this.removeClass(className);
                }
            });
        }
        const newClasses: string[] = [];
        classNames.forEach(className => {
            if (className) {
                newClasses.push(className);
                if (this.classNames.indexOf(className) < 0) {
                    this.addClass(className);
                }
            }
        });
        this.classNames = newClasses;
        return this;
    }

    updateClassByMap(classMap: Record<string, boolean>) {
        const newClasses = [];
        for (const key in classMap) {
            if (classMap.hasOwnProperty(key) && classMap[key]) {
                newClasses.push(key);
            }
        }
        this.updateClass(newClasses);
    }

    addClass(className: string) {
        this.renderer.addClass(this.element, className);
        return this;
    }

    removeClass(className: string) {
        this.renderer.removeClass(this.element, className);
        return this;
    }

    setStyle(style: string, value: any, flags?: RendererStyleFlags2) {
        this.renderer.setStyle(style, value, flags);
        return this;
    }
}

export class DefaultElementRenderer extends AbstractElementRenderer {
    protected element: Element;

    constructor(element: Element) {
        super();
        this.element = element;
    }
}

export function useElementRenderer(element?: Element): AbstractElementRenderer {
    return new DefaultElementRenderer(element);
}
