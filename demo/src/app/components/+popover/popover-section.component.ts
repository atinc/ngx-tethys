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

@Component({
    selector: 'app-demo-popover-section',
    templateUrl: './popover-section.component.html',
    styleUrls: ['./popover-section.scss']
})
export class DemoPopoverSectionComponent extends mixinUnsubscribe(MixinBase) implements OnInit {
    apiConfigParameters = apiPopoverConfigParameters;
    basicComponent = DemoPopoverBasicComponent;
    basicCodeExamples = [
        {
            type: 'html',
            content: require('!!raw-loader!./basic/popover-basic.component.html')
        },
        {
            type: 'ts',
            content: require('!!raw-loader!./basic/popover-basic.component.ts')
        }
    ];

    constructor() {
        super();
    }

    ngOnInit() {}
}
