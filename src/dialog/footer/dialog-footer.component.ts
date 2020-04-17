import { Component, Input, HostBinding, ContentChild, TemplateRef, Inject, OnInit, ElementRef } from '@angular/core';
import { inputValueToBoolean } from '../../util/helpers';
import { THY_DIALOG_LAYOUT_CONFIG, ThyDialogLayoutConfig, ThyDialogFooterAlign } from '../dialog.config';
import { UpdateHostClassService } from '../../shared';

@Component({
    selector: 'thy-dialog-footer',
    templateUrl: './dialog-footer.component.html',
    // changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'thyDialogFooter',
    providers: [UpdateHostClassService]
})
export class DialogFooterComponent implements OnInit {
    @HostBinding(`class.dialog-footer`) _isDialogFooter = true;

    @HostBinding(`class.dialog-footer-border-top`)
    showBorderTop = false;

    @ContentChild('description') description: TemplateRef<any>;

    @Input()
    set thyShowBorderTop(value: string) {
        this.showBorderTop = inputValueToBoolean(value);
    }

    @Input() thyAlign: ThyDialogFooterAlign;

    private get align() {
        return !!this.thyAlign ? this.thyAlign : this.dialogLayoutConfig.footerAlign;
    }

    constructor(
        @Inject(THY_DIALOG_LAYOUT_CONFIG) private dialogLayoutConfig: ThyDialogLayoutConfig,
        private updateHostClassService: UpdateHostClassService,
        private elementRef: ElementRef
    ) {
        this.updateHostClassService.initializeElement(this.elementRef.nativeElement);
    }

    ngOnInit() {
        this.updateHostClassService.addClass(`dialog-footer-actions-align-${this.align}`);
    }
}
