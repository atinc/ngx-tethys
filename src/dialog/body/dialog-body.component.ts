import { Component, Input, OnInit, HostBinding, ElementRef, NgZone } from '@angular/core';
import { coerceBooleanProperty } from 'ngx-tethys/util';
import { CdkScrollable, ScrollDispatcher, ScrollingModule } from '@angular/cdk/scrolling';

/**
 * 模态框的主体组件
 * @name thy-dialog-body
 * @order 50
 */
@Component({
    selector: 'thy-dialog-body',
    template: '<ng-content></ng-content>',
    // changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'thyDialogBody',
    standalone: true,
    imports: [CdkScrollable, ScrollingModule],
    providers: [
        {
            provide: CdkScrollable,
            useExisting: DialogBodyComponent
        }
    ]
})
export class DialogBodyComponent extends CdkScrollable implements OnInit {
    @HostBinding(`class.dialog-body`) _isDialogBody = true;

    @HostBinding(`class.dialog-body-clear-padding`)
    thyClearPaddingClassName = false;

    /**
     * 清除间距
     * @default false
     */
    @Input()
    set thyClearPadding(value: string) {
        this.thyClearPaddingClassName = coerceBooleanProperty(value);
    }

    constructor(public elementRef: ElementRef, public scrollDispatcher: ScrollDispatcher, public ngZone: NgZone) {
        super(elementRef, scrollDispatcher, ngZone);
    }

    ngOnInit() {
        super.ngOnInit();
    }
}
