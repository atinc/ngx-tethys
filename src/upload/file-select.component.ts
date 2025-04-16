import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    NgZone,
    numberAttribute,
    OnChanges,
    OnDestroy,
    Output,
    SimpleChanges,
    ViewChild,
    inject,
    Inject
} from '@angular/core';

import { FileSelectBaseDirective } from './file-select-base';
import { THY_UPLOAD_DEFAULT_OPTIONS, ThyUploadConfig } from './upload.config';
import { mimeTypeConvert } from './util';
import { coerceBooleanProperty } from 'ngx-tethys/util';

/**
 * 文件上传组件
 * @name thy-file-select,[thyFileSelect]
 * @order 10
 */
@Component({
    selector: '[thyFileSelect],thy-file-select',
    templateUrl: './file-select.component.html'
})
export class ThyFileSelect extends FileSelectBaseDirective implements OnChanges, OnDestroy {
    /**
     * 文件选择事件
     */
    @Output() thyOnFileSelect = new EventEmitter();

    @ViewChild('fileInput', { static: true }) fileInput: ElementRef<HTMLInputElement>;

    /**
     * 文件是否多选
     * @default false
     */
    @Input({ transform: coerceBooleanProperty }) thyMultiple: boolean;

    @Input({ transform: coerceBooleanProperty }) thyAcceptFolder: boolean;

    /**
     * 指定文件后缀类型（MIME_Map），例如".xls,xlsx"，"[".doc",".docx"]"
     * @type Array<string> | string
     */
    @Input()
    set thyAcceptType(value: Array<string> | string) {
        this.acceptType = mimeTypeConvert(value);
    }

    /**
     * 文件上传大小限制，单位`kb`，`0`表示没有任何限制
     */
    @Input({ transform: numberAttribute })
    set thySizeThreshold(value: number) {
        this.sizeThreshold = value;
    }

    private destroy$ = new Subject<void>();

    constructor(
        public elementRef: ElementRef,
        @Inject(THY_UPLOAD_DEFAULT_OPTIONS) public defaultConfig: ThyUploadConfig,
        private ngZone: NgZone
    ) {
        super(elementRef, defaultConfig);

        this.ngZone.runOutsideAngular(() =>
            fromEvent(this.elementRef.nativeElement, 'click')
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                    this.fileInput.nativeElement.click();
                })
        );
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.thyMultiple) {
            if (changes.thyMultiple.currentValue) {
                this.fileInput.nativeElement.setAttribute('multiple', '');
            } else {
                this.fileInput.nativeElement.removeAttribute('multiple');
            }
        }

        if (changes.thyAcceptFolder) {
            if (changes.thyAcceptFolder.currentValue) {
                this.fileInput.nativeElement.setAttribute('webkitdirectory', '');
            } else {
                this.fileInput.nativeElement.removeAttribute('webkitdirectory');
            }
        }
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
