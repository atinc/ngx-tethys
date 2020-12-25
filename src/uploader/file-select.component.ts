import {
    Component,
    Input,
    Output,
    Renderer2,
    Inject,
    ViewChild,
    ElementRef,
    OnInit,
    OnDestroy,
    HostListener,
    EventEmitter
} from '@angular/core';
import { coerceBooleanProperty, isArray, isString } from 'ngx-tethys/util';
import { mimeTypeConvert } from './util';
import { ThyFileSizeExceedsContext } from './types';
import { THY_UPLOADER_DEFAULT_OPTIONS, ThyUploaderConfig } from './uploader.config';
import { UploaderBase } from './uploader-base';

@Component({
    selector: '[thyFileSelect],thy-file-select',
    templateUrl: './file-select.component.html'
})
export class ThyFileSelectComponent extends UploaderBase implements OnInit, OnDestroy {
    _multiple: boolean;

    _acceptFolder: boolean;

    acceptType: string;

    @Output() thyOnFileSelect = new EventEmitter();

    @ViewChild('fileInput', { static: true }) fileInput: ElementRef<HTMLInputElement>;

    @Input() thySizeExceedsHandler: (data: ThyFileSizeExceedsContext) => {};

    @Input()
    set thyMultiple(value: boolean) {
        this._multiple = coerceBooleanProperty(value);
        if (this._multiple) {
            this.fileInput.nativeElement.setAttribute('multiple', '');
        } else {
            this.fileInput.nativeElement.removeAttribute('multiple');
        }
    }

    @Input()
    set thyAcceptFolder(value: boolean) {
        this._acceptFolder = coerceBooleanProperty(value);
        if (this._acceptFolder) {
            this.fileInput.nativeElement.setAttribute('webkitdirectory', '');
        } else {
            this.fileInput.nativeElement.removeAttribute('webkitdirectory');
        }
    }

    @Input()
    set thyAcceptType(value: Array<string> | string) {
        this.acceptType = mimeTypeConvert(value);
    }

    @Input() thySizeThreshold: number;

    get sizeThreshold() {
        return this.thySizeThreshold ? this.thySizeThreshold : this.defaultConfig.thySizeThreshold;
    }

    @HostListener('click', ['$event'])
    click($event: any) {
        this.fileInput.nativeElement.click();
    }

    constructor(public elementRef: ElementRef, @Inject(THY_UPLOADER_DEFAULT_OPTIONS) public defaultConfig: ThyUploaderConfig) {
        super(elementRef, defaultConfig);
    }

    _isInputTypeFile() {
        const nativeElement = this.elementRef.nativeElement;
        return nativeElement.tagName.toLowerCase() === 'input' && nativeElement.type && nativeElement.type.toLowerCase() === 'file';
    }

    selectFile($event: Event) {
        const files = this.fileInput.nativeElement.files;
        if (files && files.length > 0) {
            let uploadFiles = Array.from(files);
            if (!!this.sizeThreshold) {
                uploadFiles = this.handleSizeExceeds(
                    { sizeThreshold: this.sizeThreshold, files: Array.from(files), event: $event },
                    this.thySizeExceedsHandler
                );
            }
            if (uploadFiles.length > 0) {
                this.thyOnFileSelect.emit({
                    files: uploadFiles,
                    nativeEvent: $event
                });
            }
            this.fileInput.nativeElement.value = '';
        }
    }

    ngOnInit() {}

    ngOnDestroy() {}
}
