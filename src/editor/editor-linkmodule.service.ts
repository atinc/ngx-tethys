import { Injectable } from '@angular/core';

export abstract class ThyEditorLinkModuleService {
    abstract open(event: Event, callBack: Function): void;
}

@Injectable()
export class ThyDefaultEditorLinkModuleService extends ThyEditorLinkModuleService {
    open(event: Event, callBack: Function): void {
        callBack('test');
    }
}
