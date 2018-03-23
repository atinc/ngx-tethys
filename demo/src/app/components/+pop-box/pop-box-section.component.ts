import { Component, ElementRef, TemplateRef, OnInit } from '@angular/core';
import { ComponentExample } from '../../docs/model/component-example';
import { PopBoxService } from '../../../../../src/pop-box/pop-box.service';
import { PopBoxRef } from '../../../../../src/pop-box/pop-box-ref.service';

@Component({
    selector: 'demo-pop-box-section',
    templateUrl: './pop-box-section.component.html',
    styleUrls: ['./pop-box-section.component.scss']
})
export class DemoPopBoxSectionComponent {

    constructor(private popBoxService: PopBoxService) {

    }

    openPopBoxMenu(templateRef: any) {
        const initialState = {
            title: 'hello'
        };

        this.popBoxService.show(PopBoxMenuDemoShowComponent, {
            initialState: initialState,
            target: templateRef.elementRef
        })
    }
}

@Component({
    selector: 'demo-pop-box-menu-show',
    template: `
        <ul class="pop-box-menu">
            <li (click)="itemClick(1)">
                <a class="pop-box-menu-item" href="javascript:;">
                    <span class="icon"><i class="wtf wtf-task-o"></i></span>
                    <span>有图标</span>
                </a>
            </li>
            <li (click)="itemClick(2)">
                <a class="pop-box-menu-item" href="javascript:;">
                    <span class="icon"></span>
                    <span>空位图标</span>
                </a>
            </li>
            <li class="divider"></li>
            <li (click)="itemClick(3)">
                <a class="pop-box-menu-item" href="javascript:;">
                    <span>复制</span>
                </a>
            </li>
            <li (click)="itemClick(4)">
                <a class="pop-box-menu-item" href="javascript:;">
                    <span>删除</span>
                </a>
            </li>
        </ul>
    `
})
export class PopBoxMenuDemoShowComponent {

    title: string;

    constructor(public popBoxRef: PopBoxRef) {
    }

    ngOnInit() {
        console.log(this.title);
    }

    itemClick(value) {
        alert(value);
    }
}
