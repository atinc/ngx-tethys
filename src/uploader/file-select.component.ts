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
import { ERROR_TYPES } from './constant';

@Component({
    selector: '[thyFileSelect],thy-file-select',
    templateUrl: './file-select.component.html'
})
export class ThyFileSelectComponent implements OnInit, OnDestroy {
    _multiple: boolean;

    _acceptFolder: boolean;

    acceptType: string;

    sizeThreshold: number = 200;

    @Output() thyOnFileSelect = new EventEmitter();

    @Output() thyOnUploadError: EventEmitter<{
        type: string;
        data: { files: FileList; nativeEvent: Event; acceptMaxSize?: number };
    }> = new EventEmitter();

    @ViewChild('fileInput', { static: true }) fileInput: ElementRef<HTMLInputElement>;

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

    @Input()
    set thySizeThreshold(value: number) {
        this.sizeThreshold = value;
    }

    @HostListener('click', ['$event'])
    click($event: any) {
        this.fileInput.nativeElement.click();
    }

    constructor(private elementRef: ElementRef) {}

    _isInputTypeFile() {
        const nativeElement = this.elementRef.nativeElement;
        return nativeElement.tagName.toLowerCase() === 'input' && nativeElement.type && nativeElement.type.toLowerCase() === 'file';
    }

    selectFile($event: Event) {
        const files = this.fileInput.nativeElement.files;
        if (files && files.length > 0) {
            if (files[0].size / 1024 / 1024 > this.sizeThreshold) {
                this.thyOnUploadError.emit({
                    type: ERROR_TYPES.size_limit_exceeds,
                    data: {
                        files: files,
                        nativeEvent: $event,
                        acceptMaxSize: this.sizeThreshold
                    }
                });
                this.fileInput.nativeElement.value = '';
                return;
            }
            this.thyOnFileSelect.emit({
                files: files,
                nativeEvent: $event
            });
            this.fileInput.nativeElement.value = '';
        }
    }

    ngOnInit() {}

    ngOnDestroy() {}
}
