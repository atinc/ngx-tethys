import {
    Component, Input, Output, Renderer2, Inject,
    ViewChild, ElementRef, OnInit, OnDestroy, HostListener, EventEmitter
} from '@angular/core';
import { inputValueToBoolean } from '../util/helpers';
import { ThyUploaderService } from './uploader';
import { DOCUMENT } from '@angular/common';

@Component({
    selector: '[thyFileSelect],thy-file-select',
    templateUrl: './file-select.component.html'
})
export class ThyFileSelectComponent implements OnInit, OnDestroy {

    _multiple: boolean;

    @Output() thyOnFileSelect = new EventEmitter();

    @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement>;

    @Input()
    set thyMultiple(value: boolean) {
        this._multiple = inputValueToBoolean(value);
    }

    @HostListener('click', ['$event'])
    click($event: any) {
        this.fileInput.nativeElement.click();
    }

    constructor(
        private thyUploaderService: ThyUploaderService,
        private elementRef: ElementRef
    ) {

    }

    _isInputTypeFile() {
        const nativeElement = this.elementRef.nativeElement;
        return nativeElement.tagName.toLowerCase() === 'input' && nativeElement.type && nativeElement.type.toLowerCase() === 'file';
    }

    selectFile($event: any) {
        const files = this.fileInput.nativeElement.files;
        if (files && files.length > 0) {
            this.thyOnFileSelect.emit({
                files: files,
                nativeEvent: $event
            });
        }
    }

    ngOnInit() {

    }

    ngOnDestroy() {

    }
}
