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

    public demoPlacement = 'bottom center';

    public config = {
        outsideAutoClose: true,
        insideAutoClose: true
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
    contextMenu($event: any) {
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
                top: $event.clientY,
                left: $event.clientX,
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
