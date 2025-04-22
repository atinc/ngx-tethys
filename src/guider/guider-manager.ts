import { ThyGuiderRef } from './guider-ref';
import { Injectable } from '@angular/core';
import { IThyGuiderManager } from './guider.interface';

/**
 * @public
 * @order 60
 */
@Injectable({
    providedIn: 'root'
})
export class ThyGuiderManager implements IThyGuiderManager {
    private targetListMap: Record<string, HTMLElement> = {};

    private thyGuiderRef: ThyGuiderRef;

    private activeStepKey: string;

    constructor() {}

    public updateActive(key: string, guiderRef: ThyGuiderRef): void {
        this.activeStepKey = key;
        this.thyGuiderRef = guiderRef;
    }

    public addStepTarget(key: string, el: HTMLElement): void {
        this.targetListMap[key] = el;
    }

    public removeStepTarget(key: string): void {
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
