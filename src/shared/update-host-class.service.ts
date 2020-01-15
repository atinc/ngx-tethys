import { Injectable, Renderer2, ElementRef } from '@angular/core';
import { Dictionary } from '../typings';

@Injectable()
export class UpdateHostClassService {
    private _classNames: string[] = [];

    private _hostElement: HTMLElement;

    private classMap = {};

    constructor(private renderer: Renderer2) {}

    initializeElement(element: HTMLElement | ElementRef<HTMLElement>) {
        if (element instanceof ElementRef) {
            this._hostElement = element.nativeElement;
        } else {
            this._hostElement = element;
        }
        return this;
    }

    updateClass(classNames: string[]) {
        if (this._classNames) {
            this._classNames.forEach(className => {
                if (classNames.indexOf(className) < 0) {
                    this.removeClass(className);
                }
            });
        }
        const newClasses: string[] = [];
        classNames.forEach(className => {
            if (className) {
                newClasses.push(className);
                if (this._classNames.indexOf(className) < 0) {
                    this.addClass(className);
                }
            }
        });
        this._classNames = newClasses;
        return this;
    }

    updateClassByMap(classMap: Dictionary<boolean>) {
        const newClasses = [];
        for (const key in classMap) {
            if (classMap.hasOwnProperty(key) && classMap[key]) {
                newClasses.push(key);
            }
        }
        this.updateClass(newClasses);
    }

    addClass(className: string) {
        this.renderer.addClass(this._hostElement, className);
        return this;
    }

    removeClass(className: string) {
        this.renderer.removeClass(this._hostElement, className);
        return this;
    }

    updateHostClass(el: HTMLElement, classMap: object): void {
        this._removeClass(el, this.classMap);
        this.classMap = { ...classMap };
        this._addClass(el, this.classMap);
    }

    private _removeClass(el: HTMLElement, classMap: Dictionary<boolean>): void {
        for (const i in classMap) {
            if (classMap.hasOwnProperty(i)) {
                this.renderer.removeClass(el, i);
            }
        }
    }

    private _addClass(el: HTMLElement, classMap: Dictionary<boolean>): void {
        for (const i in classMap) {
            if (classMap.hasOwnProperty(i) && classMap[i]) {
                this.renderer.addClass(el, i);
            }
        }
    }
}
