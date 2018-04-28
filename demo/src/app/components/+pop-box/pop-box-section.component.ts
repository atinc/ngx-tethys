import { Component, ElementRef, TemplateRef, OnInit } from '@angular/core';
import { ComponentExample } from '../../docs/model/component-example';
import { ThyPopBoxService } from '../../../../../src/pop-box/pop-box.service';
import { PopBoxRef } from '../../../../../src/pop-box/pop-box-ref.service';

@Component({
    selector: 'demo-pop-box-section',
    templateUrl: './pop-box-section.component.html',
    styleUrls: ['./pop-box-section.component.scss']
})
export class DemoPopBoxSectionComponent {

    public demoPlacement = 'bottom center';

    constructor(private popBoxService: ThyPopBoxService) {

    }

    openPopBoxMenu(templateRef: any) {
        const initialState = {
            title: 'hello'
        };

        this.popBoxService.show(PopBoxMenuDemoShowComponent, {
            initialState: initialState,
            insideAutoClose: true,
            target: templateRef.elementRef,
            placement: this.demoPlacement
        });
    }

    openPopBoxWithTemplate(templateRef: any, popBoxTemplate: any) {
        const initialState = {
            title: 'hello'
        };

        this.popBoxService.show(popBoxTemplate, {
            initialState: initialState,
            target: templateRef.elementRef
        });
    }
}

@Component({
    selector: 'demo-pop-box-menu-show',
    template: `
        <ul class="pop-box-menu">
            <li>
                <a class="pop-box-menu-item" href="javascript:;" (click)="itemClick(1)">
                    <span class="icon"><i class="wtf wtf-task-o"></i></span>
                    <span>有图标</span>
                </a>
            </li>
            <li>
                <a class="pop-box-menu-item" href="javascript:;" (click)="itemClick(2)">
                    <span class="icon"></span>
                    <span>空位图标</span>
                </a>
            </li>
            <li class="divider"></li>
            <li>
                <a class="pop-box-menu-item" href="javascript:;" (click)="itemClick(3)">
                    <span>复制</span>
                </a>
            </li>
            <li>
                <a class="pop-box-menu-item" href="javascript:;" (click)="itemClick(4)">
                    <span>删除</span>
                    <span class="extend-icon"><i class="wtf wtf-angle-right"></i></span>
                </a>
                <ul class="pop-box-sub-menu">
                    <li>
                        <a class="pop-box-sub-menu-item" href="javascript:;" (click)="itemClick(5)">
                            <span>二级菜单</span>
                        </a>
                    </li>
                    <li>
                        <a class="pop-box-sub-menu-item" href="javascript:;" (click)="itemClick(6)">
                            <span>二级菜单</span>
                        </a>
                    </li>
                </ul>
            </li>
        </ul>
    `
})
export class PopBoxMenuDemoShowComponent implements OnInit {

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
