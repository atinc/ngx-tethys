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
    selector: 'app-demo-popover-component',
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
            <a thyActionMenuItem="disabled" href="javascript:;">
                <span class="icon">
                    <i class="wtf wtf-task-o"></i>
                </span>
                <span>禁用</span>
            </a>
            <thy-action-menu-divider></thy-action-menu-divider>
            <a thyActionMenuItem href="javascript:;">
                <span class="icon">
                    <i class="wtf wtf-task-o"></i>
                </span>
                <span>有图标</span>
                <span class="meta">(默认排序)</span>
                <div class="info">默认排序下可拖拽移动任务；其他排序下只能显示，不可拖拽</div>
            </a>
            <a thyActionMenuItem href="javascript:;">
                <span class="icon">
                    <i class="wtf wtf-task-o"></i>
                </span>
                <span>有图标</span>
                <span class="extend-icon">
                    <i class="wtf wtf-angle-right"></i>
                </span>
                <div thyActionMenuSubItem>
                    <a thyActionMenuItem href="javascript:;">
                        <span class="icon">
                            <i class="wtf wtf-task-o"></i>
                        </span>
                        <span>有图标</span>
                    </a>
                    <a thyActionMenuItem href="javascript:;">
                        <span class="icon">
                            <i class="wtf wtf-task-o"></i>
                        </span>
                        <span>有图标</span>
                    </a>
                </div>
            </a>
        </thy-action-menu>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoPopoverContentComponent {}

@Component({
    selector: 'app-demo-popover-basic',
    templateUrl: './popover-basic.component.html'
})
export class DemoPopoverBasicComponent extends mixinUnsubscribe(MixinBase) implements OnInit {
    placement: ThyPlacement = 'bottom';
    trigger = 'click';
    hasBackdrop = true;

    constructor(private thyPopover: ThyPopover, private viewContainerRef: ViewContainerRef, private ngZone: NgZone) {
        super();
    }

    ngOnInit() {}

    openPopover(element: { elementRef: ElementRef }) {
        this.thyPopover.open(DemoPopoverContentComponent, {
            origin: element.elementRef,
            placement: this.placement,
            hasBackdrop: this.hasBackdrop,
            panelClass: 'demo-popover',
            insideClosable: true
        });
    }

    openTemplatePopover(element: { elementRef: ElementRef }, template: TemplateRef<HTMLElement>) {
        this.thyPopover.open(template, {
            origin: element.elementRef,
            hasBackdrop: this.hasBackdrop,
            placement: this.placement,
            panelClass: 'demo-popover'
        });
    }

    openTemplatePopoverManualClosure(element: { elementRef: ElementRef }, template: TemplateRef<HTMLElement>) {
        this.thyPopover.open(template, {
            origin: element.elementRef,
            manualClosure: true,
            hasBackdrop: this.hasBackdrop,
            placement: this.placement,
            panelClass: 'demo-popover'
        });
    }
}
