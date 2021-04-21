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

    private _options: ThyConfirmConfig = Object.assign(THY_CONFIRM_DEFAULT_OPTIONS_VALUE, this.defaultConfig);

    constructor(
        private dialogRef: ThyDialogRef<ThyConfirmComponent>,
        private changeDetectorRef: ChangeDetectorRef,
        @Inject(THY_CONFIRM_DEFAULT_OPTIONS) private defaultConfig: ThyConfirmConfig
    ) {}

    ngOnInit() {
        this._options = this.options ? Object.assign(this._options, this.options) : this._options;
        this.title = this._options.title;
        this.content = this._options.content;
        this.okText = this._options.okText;
        this.okType = this._options.okType;
        this.cancelText = this._options.cancelText;
        this.okLoadingText = this._options.okLoadingText;
        this.footerAlign = this._options.footerAlign;
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
