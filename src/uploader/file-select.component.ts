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
import { ThySizeExceedsHandler } from './types';
import { THY_UPLOADER_DEFAULT_OPTIONS, ThyUploaderConfig } from './uploader.config';
import { FileSelectBaseComponent } from './file-select-base';

@Component({
    selector: '[thyFileSelect],thy-file-select',
    templateUrl: './file-select.component.html'
})
export class ThyFileSelectComponent extends FileSelectBaseComponent implements OnInit, OnDestroy {
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

    @HostListener('click', ['$event'])
    click($event: Event) {
        this.fileInput.nativeElement.click();
    }

    constructor(public elementRef: ElementRef, @Inject(THY_UPLOADER_DEFAULT_OPTIONS) public defaultConfig: ThyUploaderConfig) {
        super(elementRef, defaultConfig);
    }

    selectFile($event: Event) {
        const files = this.fileInput.nativeElement.files;
        if (files && files.length > 0) {
            this.selectFiles($event, Array.from(files), this.thyOnFileSelect);
            this.fileInput.nativeElement.value = '';
        }
    }

    ngOnInit() {}

    ngOnDestroy() {}
}
