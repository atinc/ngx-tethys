import { Component, ElementRef, TemplateRef, OnInit, HostListener } from '@angular/core';
import { ComponentExample } from '../../docs/model/component-example';
import { ThyPopBoxService } from '../../../../../src/pop-box/pop-box.service';
import { PopBoxRef } from '../../../../../src/pop-box/pop-box-ref.service';

@Component({
    selector: 'demo-pop-box-section',
    templateUrl: './pop-box-section.component.html',
    styleUrls: ['./pop-box-section.component.scss']
})
export class DemoPopBoxSectionComponent {

    apiParameters = [
        {
            property: 'target',
            description: '弹出组件位置计算的参照元素，会根据这个参照元素计算位置',
            type: 'ElementRef | HTMLElement',
            default: 'null'
        },
        {
            property: 'position',
            description: '不需要参照元素，直接传位置, 比如右击触发弹出，',
            type: '{ top: number, left: number}',
            default: 'null'
        },
        {
            property: 'placement',
            description: `弹出相对于参照物的位置，比如 bottom center, 空格前的字符串为 top | bottom | left | right，空格后的字符串是对齐方式，
            当位置为 top | bottom 时，对齐方式有 center | left | right, 当位置为 left | left 时，对齐方式有 center | top | bottom`,
            type: 'String',
            default: 'bottom center'
        },
        {
            property: 'offset',
            description: '弹出元素和参照物之间的位移',
            type: 'Number',
            default: '2'
        },
        {
            property: 'outsideAutoClose',
            description: '点击外部元素自动关闭',
            type: 'Boolean',
            default: 'true'
        },
        {
            property: 'insideAutoClose',
            description: '点击弹出组件内部元素自动关闭',
            type: 'Boolean',
            default: 'false'
        },
        {
            property: 'arrow',
            description: '是否有 arrow，暂时未实现此功能',
            type: 'Boolean',
            default: 'false'
        },
    ];

    public demoPlacement = 'bottom center';

    public config = {
        outsideAutoClose: true,
        insideAutoClose: false
    };

    constructor(private popBoxService: ThyPopBoxService) {

    }

    openPopBoxMenu(templateRef: any) {
        const initialState = {
            title: 'hello'
        };

        this.popBoxService.show(PopBoxMenuDemoShowComponent, {
            initialState: initialState,
            insideAutoClose: this.config.insideAutoClose,
            outsideAutoClose: this.config.outsideAutoClose,
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

    @HostListener('contextmenu', ['$event'])
    contextMenu($event: MouseEvent) {
        const initialState = {
            title: 'contextmenu'
        };
        this.popBoxService.show(PopBoxMenuDemoShowComponent, {
            initialState: initialState,
            insideAutoClose: this.config.insideAutoClose,
            outsideAutoClose: this.config.outsideAutoClose,
            target: null,
            placement: this.demoPlacement,
            position: {
                top: $event.pageY,
                left: $event.pageX,
            }
        });
        return false;
    }

    close() {
        this.popBoxService.hide();
    }
}

@Component({
    selector: 'demo-pop-box-menu-show',
    templateUrl: `./demo-pop-box-menu-show.component.html`
})
export class PopBoxMenuDemoShowComponent implements OnInit {

    title: string;

    step = 'menu';

    constructor(public popBoxRef: PopBoxRef) {
    }

    ngOnInit() {
        console.log(this.title);
    }

    itemClick(value) {
        alert(value);
    }

    toRename() {
        setTimeout(() => {
            this.step = 'rename';
        });

    }

    close() {
        this.popBoxRef.hide();
    }
}
