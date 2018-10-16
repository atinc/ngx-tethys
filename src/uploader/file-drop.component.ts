import { Component, OnInit, ElementRef, Renderer2, HostListener, Output, EventEmitter, HostBinding, Input } from '@angular/core';
import { ThyUploaderService } from './uploader';
import { mimeTypeConvert } from './util';

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

        this._state.isDragOver = true;
        this._dropOverClassName();
        event.preventDefault();
    }

    @HostListener('dragleave', ['$event'])
    dragleave(event: any) {
        if (!this.elementRef.nativeElement.contains(event.fromElement)) {
            this._state.isDragOver = false;
            this._dropOverClassName();
        }
    }

    @HostListener('drop', ['$event'])
    drop(event: any) {
        event.preventDefault();
        this._state.isDragOver = false;
        this.thyOnDrop.emit({
            files: event.dataTransfer.files,
            nativeEvent: event
        });
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
