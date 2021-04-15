import { UpdateHostClassService } from 'ngx-tethys/core';
import { coerceBooleanProperty } from 'ngx-tethys/util';

import { Component, ContentChild, ElementRef, Inject, Input, OnInit, TemplateRef } from '@angular/core';

import { THY_DIALOG_LAYOUT_CONFIG, ThyDialogFooterAlign, ThyDialogLayoutConfig } from '../dialog.config';

@Component({
    selector: 'thy-dialog-footer',
    templateUrl: './dialog-footer.component.html',
    // changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'thyDialogFooter',
    providers: [UpdateHostClassService]
})
export class DialogFooterComponent implements OnInit {
    @ContentChild('description') description: TemplateRef<any>;

    @Input() set thyDivided(value: boolean) {
        this.divided = coerceBooleanProperty(value);
    }

    @Input() thyAlign: ThyDialogFooterAlign;

    private divided: boolean;

    private get align() {
        return !!this.thyAlign ? this.thyAlign : this.dialogLayoutConfig.footerAlign;
    }

    constructor(
        @Inject(THY_DIALOG_LAYOUT_CONFIG) private dialogLayoutConfig: ThyDialogLayoutConfig,
        private updateHostClassService: UpdateHostClassService,
        private elementRef: ElementRef
    ) {
        this.updateHostClassService.initializeElement(this.elementRef.nativeElement);
        this.divided = this.dialogLayoutConfig.footerDivided;
    }

    ngOnInit() {
        this.updateHostClassService.updateClassByMap({
            'dialog-footer': true,
            [`dialog-footer-actions-align-${this.align}`]: true,
            'dialog-footer-border-top': this.divided
        });
    }
}
