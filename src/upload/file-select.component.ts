import { coerceBooleanProperty } from 'ngx-tethys/util';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Component, ElementRef, EventEmitter, Inject, Input, NgZone, OnDestroy, Output, ViewChild } from '@angular/core';

import { FileSelectBaseDirective } from './file-select-base';
import { THY_UPLOAD_DEFAULT_OPTIONS, ThyUploadConfig } from './upload.config';
import { mimeTypeConvert } from './util';

@Component({
    selector: '[thyFileSelect],thy-file-select',
    templateUrl: './file-select.component.html',
    standalone: true
})
export class ThyFileSelectComponent extends FileSelectBaseDirective implements OnDestroy {
    private multiple: boolean;

    private acceptFolder: boolean;

    @Output() thyOnFileSelect = new EventEmitter();

    @ViewChild('fileInput', { static: true }) fileInput: ElementRef<HTMLInputElement>;

    @Input()
    set thyMultiple(value: boolean) {
        this.multiple = coerceBooleanProperty(value);
        if (this.multiple) {
            this.fileInput.nativeElement.setAttribute('multiple', '');
        } else {
            this.fileInput.nativeElement.removeAttribute('multiple');
        }
    }

    @Input()
    set thyAcceptFolder(value: boolean) {
        this.acceptFolder = coerceBooleanProperty(value);
        if (this.acceptFolder) {
            this.fileInput.nativeElement.setAttribute('webkitdirectory', '');
        } else {
            this.fileInput.nativeElement.removeAttribute('webkitdirectory');
        }
    }

    @Input()
    set thyAcceptType(value: Array<string> | string) {
        this.acceptType = mimeTypeConvert(value);
    }

    @Input() set thySizeThreshold(value: number) {
        this.sizeThreshold = value;
    }

    private destroy$ = new Subject<void>();

    constructor(public elementRef: ElementRef, @Inject(THY_UPLOAD_DEFAULT_OPTIONS) public defaultConfig: ThyUploadConfig, ngZone: NgZone) {
        super(elementRef, defaultConfig);

        ngZone.runOutsideAngular(() =>
            fromEvent(elementRef.nativeElement, 'click')
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                    this.fileInput.nativeElement.click();
                })
        );
    }

    selectFile($event: Event) {
        const files = this.fileInput.nativeElement.files;
        if (files && files.length > 0) {
            this.selectFiles($event, Array.from(files), this.thyOnFileSelect);
            this.fileInput.nativeElement.value = '';
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
    }
}
