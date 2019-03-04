import {
    Component,
    OnInit,
    OnDestroy,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    NgZone,
    Inject
} from '@angular/core';
import { ThyDialogRef } from '../dialog-ref';
import { ThyConfirmConfig, THY_CONFIRM_DEFAULT_OPTIONS } from '../confirm.config';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'thy-confirm-default',
    templateUrl: './confirm.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyConfirmComponent implements OnInit, OnDestroy {
    loading: boolean;

    options: ThyConfirmConfig;

    public title: string;

    public content: string;

    public okText: string;

    public okType: string;

    public cancelText: string;

    public okLoadingText: string;

    constructor(
        private dialogRef: ThyDialogRef<ThyConfirmComponent>,
        private changeDetectorRef: ChangeDetectorRef,
        @Inject(THY_CONFIRM_DEFAULT_OPTIONS) private defaultConfig: ThyConfirmConfig
    ) {}

    ngOnInit() {
        if (this.options) {
            this.title = this.options.title || this.defaultConfig.title;
            this.content = this.options.content;
            this.okText = this.options.okText || this.defaultConfig.okText;
            this.okType = this.options.okType || this.defaultConfig.okType;
            this.cancelText = this.options.cancelText || this.defaultConfig.cancelText;
            this.okLoadingText = this.options.okLoadingText || this.okText;
            this.options.okLoadingText = this.options.okLoadingText || this.options.okText;
        }
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
