import { Injectable, Renderer2 } from '@angular/core';
import { isString } from '../util/helpers';

@Injectable()
export class UpdateHostClassService {

    // host element old classes
    private _classNames: string[] = [];

    private _hostElement: HTMLElement;

    constructor(private renderer: Renderer2) {

    }

    initializeElement(nativeElement: HTMLElement) {
        this._hostElement = nativeElement;
    }

    updateClass(classNames: string[]) {
        if (this._classNames) {
            this._classNames.forEach((className) => {
                if (classNames.indexOf(className) < 0) {
                    this.removeClass(className);
                }
            });
        }
        const newClasses: string[] = [];
        classNames.forEach((className) => {
            if (className) {
                newClasses.push(className);
                if (this._classNames.indexOf(className) < 0) {
                    this.addClass(className);
                }
            }
        });
        this._classNames = newClasses;
    }

    private addClass(className: string) {
        this.renderer.addClass(this._hostElement, className);
    }

    private removeClass(className: string) {
        this.renderer.removeClass(this._hostElement, className);
    }
}
