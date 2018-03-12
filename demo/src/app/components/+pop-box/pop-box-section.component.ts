import { Component } from '@angular/core';
import { PopBoxService } from '../../../../../src/pop-box/pop-box.service';
import { PopBoxRef } from '../../../../../src/pop-box/pop-box-ref.service';

@Component({
    selector: 'demo-pop-box-section',
    templateUrl: './pop-box-section.component.html',
    styleUrls: ['./pop-box-section.component.scss']
})
export class PopBoxSectionComponent {

    constructor(private popBoxService: PopBoxService) {

    }

    add(viewRef: any) {
        const initialState = {
            name: 'hello'
        };
        this.popBoxService.show(PopBoxDemoShowComponent, {
            initialState: initialState
        });
    }
}


@Component({
    selector: 'demo-pop-box-show',
    template: `show demo, name from section:{{name}}  <a href="javascript:;" (click)="popBoxRef.hide()">关闭</a>`
})
export class PopBoxDemoShowComponent {

    name: string;
    constructor(public popBoxRef: PopBoxRef) {
    }
}

