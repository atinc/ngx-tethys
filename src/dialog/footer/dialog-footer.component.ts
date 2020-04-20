import { Component, Input, ContentChild, TemplateRef, Inject, OnInit, ElementRef } from '@angular/core';
import { coerceBooleanProperty } from '../../util/helpers';
import { THY_DIALOG_LAYOUT_CONFIG, ThyDialogLayoutConfig, ThyDialogFooterAlign } from '../dialog.config';
import { UpdateHostClassService } from '../../shared';
import { warnDeprecation } from '../../core';

@Component({
    selector: 'thy-dialog-footer',
    templateUrl: './dialog-footer.component.html',
    // changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'thyDialogFooter',
    providers: [UpdateHostClassService]
})
export class DialogFooterComponent implements OnInit {
    @ContentChild('description') description: TemplateRef<any>;

    /**
     * @deprecated thyShowBorderTop will be deprecated, please use thyDivided.
     */
    @Input()
    set thyShowBorderTop(value: string) {
        warnDeprecation(`thyShowBorderTop will be deprecated, please use thyDivided.`);
        this.divided = coerceBooleanProperty(value);
    }

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
