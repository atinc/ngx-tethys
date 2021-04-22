import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, Inject, Input } from '@angular/core';
import { ThyDialogRef } from '../dialog-ref';
import { ThyConfirmConfig, THY_CONFIRM_DEFAULT_OPTIONS, THY_CONFIRM_DEFAULT_OPTIONS_VALUE } from '../confirm.config';
import { finalize } from 'rxjs/operators';
import { ThyFormGroupFooterAlign } from 'ngx-tethys/form';

@Component({
    selector: 'thy-confirm-default',
    templateUrl: './confirm.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyConfirmComponent implements OnInit, OnDestroy {
    loading: boolean;

    @Input() options: ThyConfirmConfig;

    public title: string;

    public content: string;

    public okText: string;

    public okType: string;

    public cancelText: string;

    public okLoadingText: string;

    public footerAlign: ThyFormGroupFooterAlign;

    constructor(
        private dialogRef: ThyDialogRef<ThyConfirmComponent>,
        private changeDetectorRef: ChangeDetectorRef,
        @Inject(THY_CONFIRM_DEFAULT_OPTIONS) private defaultConfig: ThyConfirmConfig
    ) {
        this.defaultConfig = { ...(THY_CONFIRM_DEFAULT_OPTIONS_VALUE as ThyConfirmConfig), ...this.defaultConfig };
    }

    ngOnInit() {
        this.defaultConfig = { ...this.defaultConfig, ...this.options };
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
        const result = this.options.onOk();
        if (result && result.subscribe) {
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
        this.dialogRef.close();
    }

    ngOnDestroy() {}
}
