import { fromEvent } from 'rxjs';
import { Component, ElementRef, NgZone, inject, viewChild, output, input, DestroyRef, effect } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FileSelectBaseDirective } from './file-select-base';
import { coerceBooleanProperty } from 'ngx-tethys/util';
import { ThyFileSelectEvent } from './types';

/**
 * 文件上传组件
 * @name thy-file-select,[thyFileSelect]
 * @order 10
 */
@Component({
    selector: '[thyFileSelect],thy-file-select',
    templateUrl: './file-select.component.html'
})
export class ThyFileSelect extends FileSelectBaseDirective {
    /**
     * 文件选择事件
     */
    readonly thyOnFileSelect = output<ThyFileSelectEvent>();

    protected readonly fileInput = viewChild<ElementRef<HTMLInputElement>>('fileInput');

    /**
     * 文件是否多选
     * @default false
     */
    readonly thyMultiple = input(false, { transform: coerceBooleanProperty });

    /**
     * 是否接受文件夹
     */
    readonly thyAcceptFolder = input(false, { transform: coerceBooleanProperty });

    private destroyRef = inject(DestroyRef);

    private ngZone: NgZone = inject(NgZone);

    constructor() {
        super();

        this.ngZone.runOutsideAngular(() =>
            fromEvent(this.elementRef.nativeElement, 'click')
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe(() => {
                    this.fileInput().nativeElement.click();
                })
        );

        effect(() => {
            const multiple = this.thyMultiple();
            const acceptFolder = this.thyAcceptFolder();
            const inputElement = this.fileInput().nativeElement;
            if (multiple) {
                inputElement.setAttribute('multiple', '');
            } else {
                inputElement.removeAttribute('multiple');
            }
            if (acceptFolder) {
                inputElement.setAttribute('webkitdirectory', '');
            } else {
                inputElement.removeAttribute('webkitdirectory');
            }
        });
    }

    selectFile($event: Event) {
        const files = this.fileInput().nativeElement.files;
        if (files && files.length > 0) {
            this.selectFiles($event, Array.from(files), this.thyOnFileSelect);
            this.fileInput().nativeElement.value = '';
        }
    }
}
