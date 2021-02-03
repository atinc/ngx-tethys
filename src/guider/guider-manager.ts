import { Subject } from 'rxjs';
import { helpers } from 'ngx-tethys/util';
import { ThyGuiderRef } from './guider-ref';
import { Dictionary } from 'ngx-tethys/types';
import { ElementRef, Injectable } from '@angular/core';

export class Target {
    key: string;
    target: ElementRef;
}

@Injectable({
    providedIn: 'root'
})
export class ThyGuiderManager {
    private targetList: Target[] = [];

    private targetListMap: Dictionary<Target> = {};

    public activeStepKey$: Subject<string> = new Subject();

    public thyGuiderRef: ThyGuiderRef;

    public activeStepKey: string;

    constructor() {
        this.activeStepKey$.subscribe(key => {
            this.activeStepKey = key;
        });
    }

    public addStep(elementRef: ElementRef, key: string) {
        this.targetList.push({
            target: elementRef,
            key
        });
        this.targetListMap = helpers.keyBy(this.targetList, 'key');
    }

    public removeStep(key: string) {
        const index = this.targetList.findIndex(target => target.key === key);
        this.targetList.splice(index, 1);
        this.targetListMap = helpers.keyBy(this.targetList, 'key');
    }

    getTargetListMap(): Dictionary<Target> {
        return this.targetListMap;
    }
}
