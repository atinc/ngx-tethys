import { Component, TemplateRef } from '@angular/core';
import { ThyPopover } from 'ngx-tethys/popover';

@Component({
    selector: 'thy-basic-example',
    templateUrl: './basic.component.html',
    styles: [
        `
            .box {
                width: 30px;
                height: 30px;
                cursor: pointer;
            }
        `
    ]
})
export class ThyBasicExampleComponent {
    color = '#ddd';

    constructor(private popover: ThyPopover) {}
    change(color: string) {
        console.log(color);
    }

    openToolbar($event: Event, template: TemplateRef<unknown>) {
        // 打开工具栏
        const popoverRef = this.popover.open(template, {
            origin: $event.currentTarget as HTMLElement,
            hasBackdrop: false,
            manualClosure: true,
            outsideClosable: false
        });
        popoverRef
            .getOverlayRef()
            .outsidePointerEvents()
            .subscribe(event => {
                // 已经打开的最后一个弹框有 color-picker 的不关闭
                const openedPopovers = this.popover.getOpenedPopovers();
                if (openedPopovers && openedPopovers[openedPopovers.length - 1]) {
                    const hostElement = openedPopovers[openedPopovers.length - 1].getOverlayRef().hostElement;
                    if (hostElement.querySelector('thy-color-picker-panel') || hostElement.querySelector('thy-picker-panel')) {
                        return;
                    }
                }
                const hostElement = popoverRef.getOverlayRef()?.hostElement;
                if (hostElement && !hostElement.contains(event.target as Node)) {
                    popoverRef.close();
                }
            });
    }
}
