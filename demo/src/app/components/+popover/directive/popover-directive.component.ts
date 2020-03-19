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
import { take, takeUntil } from 'rxjs/operators';
import { mixinUnsubscribe, MixinBase } from 'ngx-tethys/core';
import { ThyPopover } from 'ngx-tethys/popover';
import { ThyPlacement } from 'ngx-tethys/core';

@Component({
    selector: 'app-demo-popover-directive-content',
    template: `
        <thy-action-menu>
            <a thyActionMenuItem thyActionMenuItemActive="true" href="javascript:;">
                <span>有图标</span>
            </a>
            <a thyActionMenuItem href="javascript:;">
                <span class="icon">
                    <i class="wtf wtf-task-o"></i>
                </span>
                <span>有图标</span>
                <span class="extend-icon">
                    <i class="wtf wtf-checked"></i>
                </span>
            </a>
        </thy-action-menu>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoPopoverDirectiveContentComponent {}

@Component({
    selector: 'app-demo-popover-directive',
    templateUrl: './popover-directive.component.html'
})
export class DemoPopoverDirectiveComponent extends mixinUnsubscribe(MixinBase) implements OnInit {
    placement: ThyPlacement = 'bottom';
    trigger = 'hover';

    config = {
        panelClass: 'demo-popover'
    };

    contentComponent = DemoPopoverDirectiveContentComponent;

    constructor() {
        super();
    }

    ngOnInit() {}
}
