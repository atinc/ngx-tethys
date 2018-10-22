import { Component, OnInit, ElementRef, Renderer2, HostListener, Output, EventEmitter, HostBinding, Input } from '@angular/core';
import { ThyUploaderService } from './uploader';
import { mimeTypeConvert } from './util';
import { MIME_Map } from './constant';
import { helpers } from '../util';

@Component({
    selector: '[thyFileDrop]',
    template: `<ng-content></ng-content>`,
})
export class ThyFileDropComponent implements OnInit {

    // state
    _state = {
        isDragOver: false,
        isCustomClassName: false,
        acceptType: '',
        isAllFileTypeAccept: true,
    };

    @Input() thyFileDropClassName: string;

    @Input()
    set thyAcceptType(value: Array<string> | string) {
        this._state.acceptType = mimeTypeConvert(value);
    }

    @Output() thyOnDrop = new EventEmitter();

    @HostBinding('class.drop-over')
    get isDragOver() {
        return this._state.isDragOver;
    }

    constructor(
        private elementRef: ElementRef,
        private renderer: Renderer2
    ) { }

    ngOnInit(): void {
        this._state.isCustomClassName = !!this.thyFileDropClassName;
    }

    @HostListener('dragover', ['$event'])
    dragover(event: any) {
        if (event.dataTransfer.items.length > 0) {
            for (let index = 0; index < event.dataTransfer.items.length; index++) {
                const n = event.dataTransfer.items[index];
                if (!n.type || this._state.acceptType.indexOf(n.type) === -1) {
                    this._state.isAllFileTypeAccept = false;
                }
            }
        }

        if (this._state.isAllFileTypeAccept) {
            this._state.isDragOver = true;
            this._dropOverClassName();
        }
        event.preventDefault();
    }

    @HostListener('dragleave', ['$event'])
    dragleave(event: any) {
        if (!this.elementRef.nativeElement.contains(event.fromElement)) {
            this._state.isDragOver = false;
            this._state.isAllFileTypeAccept = true;
            this._dropOverClassName();
        }
    }

    @HostListener('drop', ['$event'])
    drop(event: any) {
        event.preventDefault();
        this._state.isDragOver = false;

        if (this._state.isAllFileTypeAccept) {
            this._state.isAllFileTypeAccept = true;
            this.thyOnDrop.emit({
                files: event.dataTransfer.files,
                nativeEvent: event
            });
        } else {
            console.error('ngx-tethys Error: Uploaded files that do not support extensions.');
        }
    }

    private _dropOverClassName() {
        if (this._state.isCustomClassName) {
            if (this._state.isDragOver) {
                this.renderer.addClass(this.elementRef.nativeElement, this.thyFileDropClassName);
            } else {
                this.renderer.removeClass(this.elementRef.nativeElement, this.thyFileDropClassName);
            }
        }
    }
}
