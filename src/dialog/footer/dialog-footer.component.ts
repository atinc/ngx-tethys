import { coerceBooleanProperty } from 'ngx-tethys/util';
import { useHostRenderer } from '@tethys/cdk/dom';
import { Component, ContentChild, Inject, Input, OnInit, TemplateRef } from '@angular/core';

import { THY_DIALOG_LAYOUT_CONFIG, ThyDialogFooterAlign, ThyDialogLayoutConfig } from '../dialog.config';

@Component({
    selector: 'thy-dialog-footer',
    templateUrl: './dialog-footer.component.html',
    // changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'thyDialogFooter'
})
export class DialogFooterComponent implements OnInit {
    @ContentChild('description') description: TemplateRef<any>;

    @Input() set thyDivided(value: boolean) {
        this.divided = coerceBooleanProperty(value);
    }

    @Input() thyAlign: ThyDialogFooterAlign;

    private divided: boolean;

    private hostRenderer = useHostRenderer();

    private get align() {
        return !!this.thyAlign ? this.thyAlign : this.dialogLayoutConfig.footerAlign;
    }

    constructor(@Inject(THY_DIALOG_LAYOUT_CONFIG) private dialogLayoutConfig: ThyDialogLayoutConfig) {
        this.divided = this.dialogLayoutConfig.footerDivided;
    }

    ngOnInit() {
        this.hostRenderer.updateClassByMap({
            'dialog-footer': true,
            [`dialog-footer-actions-align-${this.align}`]: true,
            'dialog-footer-border-top': this.divided
        });
    }
}
