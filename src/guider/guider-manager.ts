import { ThyGuiderRef } from './guider-ref';
import { Injectable } from '@angular/core';

/**
 * @public
 * @order 60
 */
@Injectable({
    providedIn: 'root'
})
export class ThyGuiderManager {
    private targetListMap = {};

    private thyGuiderRef: ThyGuiderRef;

    private activeStepKey: string;

    constructor() {}

    public updateActive(key: string, guiderRef: ThyGuiderRef) {
        this.activeStepKey = key;
        this.thyGuiderRef = guiderRef;
    }

    public addStepTarget(key: string, el: HTMLElement) {
        this.targetListMap[key] = el;
    }

    public removeStepTarget(key: string) {
        delete this.targetListMap[key];
    }

    public getActiveTarget(key: string): HTMLElement {
        return this.targetListMap[key];
    }

    public getActive(): { key: string; guiderRef: ThyGuiderRef } {
        return {
            key: this.activeStepKey,
            guiderRef: this.thyGuiderRef
        };
    }
}
