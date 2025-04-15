import { Observable, Subject } from 'rxjs';
import { ThyGuiderConfig, ThyGuiderStep } from './guider.class';

export interface IThyGuiderRef {
    config: ThyGuiderConfig;
    steps: ThyGuiderStep[];
    stepChange: () => Observable<ThyGuiderStep>;
    ended: () => Subject<ThyGuiderStep>;
    closed: () => Subject<ThyGuiderStep>;
    targetClicked: () => Subject<ThyGuiderStep>;
    start: (startWith?: number) => void;
    next: () => void;
    previous: () => void;
    active: (indexOrKey: number | string) => void;
    close: () => void;
    end: () => void;
}

export interface IThyGuiderManager {
    updateActive: (key: string, guiderRef: IThyGuiderRef) => void;
    addStepTarget: (key: string, el: HTMLElement) => void;
    removeStepTarget: (key: string) => void;
    getActiveTarget: (key: string) => HTMLElement;
    getActive: () => { key: string; guiderRef: IThyGuiderRef };
}
