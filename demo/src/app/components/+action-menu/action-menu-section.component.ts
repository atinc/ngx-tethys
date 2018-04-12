import { Component, ElementRef, TemplateRef, OnInit } from '@angular/core';
import { ComponentExample } from '../../docs/model/component-example';
import { ThyPopBoxService } from '../../../../../src/pop-box/pop-box.service';
import { PopBoxRef } from '../../../../../src/pop-box/pop-box-ref.service';

@Component({
    selector: 'demo-action-menu-section',
    templateUrl: './action-menu-section.component.html',
    // styleUrls: ['./action-menu-section.component.scss']
})
export class DemoActionMenuSectionComponent {

    constructor() {

    }

    itemClick(value) {
        console.log(value);
    }

}
