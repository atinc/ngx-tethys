import {
    OnInit,
    Component,
    TemplateRef,
    ViewContainerRef,
    NgZone,
    ChangeDetectionStrategy,
    ElementRef
} from '@angular/core';
import {
    ConnectionPositionPair,
    OriginConnectionPosition,
    OverlayConnectionPosition,
    Overlay,
    OverlayRef
} from '@angular/cdk/overlay';
import { TemplatePortal, ComponentPortal } from '@angular/cdk/portal';
import { POSITION_MAP } from '../../../../../src/core/overlay/overlay-position-map';
import { take, takeUntil } from 'rxjs/operators';
import { mixinUnsubscribe, MixinBase } from '../../../../../src/core';
import { ThyPopover } from 'ngx-tethys/popover';
import { ThyPlacement } from 'ngx-tethys/core';
import { apiPopoverConfigParameters } from './api-config-parameters';
import { DemoPopoverBasicComponent, DemoPopoverContentComponent } from './basic/popover-basic.component';
import { LiveDemoCodeExample } from '../../core/live-demo/live-demo.component';
import { DemoPopoverDirectiveComponent } from './directive/popover-directive.component';
import { apiPopoverParameters } from './api-directive-parameters';

@Component({
    selector: 'app-demo-popover-section',
    templateUrl: './popover-section.component.html',
    styleUrls: ['./popover-section.scss']
})
export class DemoPopoverSectionComponent extends mixinUnsubscribe(MixinBase) implements OnInit {
    apiConfigParameters = apiPopoverConfigParameters;

    apiPopoverParameters = apiPopoverParameters;

    liveDemos: LiveDemoCodeExample[] = [
        {
            title: 'Popover Basic',
            component: DemoPopoverBasicComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: 'popover-basic.component.html',
                    content: require('!!raw-loader!./basic/popover-basic.component.html')
                },
                {
                    type: 'ts',
                    name: 'popover-basic.component.ts',
                    content: require('!!raw-loader!./basic/popover-basic.component.ts')
                }
            ]
        },
        {
            title: 'Popover Directive',
            description: `使用 thy-popover 指令弹出 Popover, 自动在绑定的元素上添加事件, 触发事件后弹出指定的组件或者模版 `,
            component: DemoPopoverDirectiveComponent,
            codeExamples: [
                {
                    type: 'html',
                    name: 'popover-directive.component.html',
                    content: require('!!raw-loader!./directive/popover-directive.component.html')
                },
                {
                    type: 'ts',
                    name: 'popover-directive.component.ts',
                    content: require('!!raw-loader!./directive/popover-directive.component.ts')
                }
            ]
        }
    ];

    constructor() {
        super();
    }

    ngOnInit() {}
}
