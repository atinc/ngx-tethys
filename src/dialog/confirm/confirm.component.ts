import { ThyFormDirective, ThyFormGroupFooterAlign, ThyFormGroupFooter } from 'ngx-tethys/form';
import { finalize } from 'rxjs/operators';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, Signal, inject, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ThyButton } from 'ngx-tethys/button';
import { ThyDialogBody } from '../body/dialog-body.component';
import { ThyConfirmConfig, THY_CONFIRM_DEFAULT_OPTIONS } from '../confirm.config';
import { ThyDialogRef } from '../dialog-ref';
import { ThyDialogHeader } from '../header/dialog-header.component';
import { injectLocale, ThyDialogLocale } from 'ngx-tethys/i18n';

/**
 * @private
 */
@Component({
    selector: 'thy-confirm-default',
    templateUrl: './confirm.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ThyDialogHeader, ThyDialogBody, FormsModule, ThyFormDirective, ThyFormGroupFooter, NgClass, ThyButton]
})
export class ThyConfirm implements OnInit, OnDestroy {
    private dialogRef = inject<ThyDialogRef<ThyConfirm>>(ThyDialogRef);
    private changeDetectorRef = inject(ChangeDetectorRef);
    private defaultConfig = inject(THY_CONFIRM_DEFAULT_OPTIONS);
    private locale: Signal<ThyDialogLocale> = injectLocale('dialog');

    loading!: boolean;

    readonly options = input<ThyConfirmConfig>();

    public title: string | undefined;

    public content!: string;

    public okText: string | undefined;

    public okType: string | undefined;

    public cancelText: string | undefined;

    public okLoadingText: string | undefined;

    public footerAlign: ThyFormGroupFooterAlign | undefined;

    constructor() {
        this.defaultConfig = {
            ...{
                title: this.locale().title,
                okText: this.locale().ok,
                okType: 'danger',
                cancelText: this.locale().cancel,
                footerAlign: 'left'
            },
            ...this.defaultConfig
        };
    }

    ngOnInit() {
        this.defaultConfig = { ...this.defaultConfig, ...this.options() };
        this.title = this.defaultConfig.title;
        this.content = this.defaultConfig.content;
        this.okText = this.defaultConfig.okText;
        this.okType = this.defaultConfig.okType;
        this.cancelText = this.defaultConfig.cancelText;
        this.okLoadingText = this.defaultConfig.okLoadingText || this.okText;
        this.footerAlign = this.defaultConfig.footerAlign;
    }

    confirm() {
        this.loading = true;
        const result = this.options()!.onOk!();
        if (result && result!.subscribe!) {
            result
                .pipe(
                    finalize(() => {
                        this.loading = false;
                        this.changeDetectorRef.markForCheck();
                    })
                )
                .subscribe(success => {
                    if (success) {
                        this.close();
                    }
                });
        } else {
            this.close();
        }
    }

    close() {
        this.options()?.onCancel?.();
        this.dialogRef.close();
    }

    ngOnDestroy() {}
}
