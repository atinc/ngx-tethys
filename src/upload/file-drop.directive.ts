import { isEmpty, isString } from 'ngx-tethys/util';
import { fromEvent } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { DestroyRef, Directive, ElementRef, Inject, NgZone, OnInit, Renderer2, inject, input, output, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { FileSelectBaseDirective } from './file-select-base';
import { THY_UPLOAD_DEFAULT_OPTIONS, ThyUploadConfig } from './upload.config';
import { ThyFileSelectEvent } from './types';

/**
 * @name thyFileDrop
 */
@Directive({
    selector: '[thyFileDrop]',
    host: {
        '[class.thy-drop-over]': 'isDragOver()',
        '[class.drop-over]': 'isDragOver()'
    }
})
export class ThyFileDropDirective extends FileSelectBaseDirective implements OnInit {
    protected isDragOver = signal(false);

    readonly thyFileDropClassName = input<string>();

    readonly thyOnDrop = output<ThyFileSelectEvent>();

    /**
     * 当拖拽的文件中有不符合 thyAcceptType 中定义的类型时触发
     * @description.en-us It is triggered when there are files in the dragged files that do not conform to the types defined in thyAcceptType.
     */
    readonly thyFilesReject = output<File[]>();

    private destroyRef = inject(DestroyRef);

    constructor(
        public elementRef: ElementRef,
        public renderer: Renderer2,
        public ngZone: NgZone,
        @Inject(THY_UPLOAD_DEFAULT_OPTIONS) public defaultConfig: ThyUploadConfig
    ) {
        super(elementRef, defaultConfig);
    }

    public ngOnInit(): void {
        this.ngZone.runOutsideAngular(() => {
            fromEvent(this.elementRef.nativeElement, 'dragenter')
                .pipe(
                    takeUntilDestroyed(this.destroyRef),
                    tap((event: DragEvent) => {
                        event.preventDefault();
                    }),
                    filter(event => event.dataTransfer.items && event.dataTransfer.items.length > 0)
                )
                .subscribe((event: DragEvent) => {
                    if (this.checkRejectFolderAndHtmlElement(event)) {
                        const files = this.filterFilesOrItems(Array.from(event.dataTransfer.items));
                        if (!isEmpty(files)) {
                            this.ngZone.run(() => {
                                this.isDragOver.set(true);
                                this.toggleDropOverClassName();
                            });
                        }
                    }
                });

            fromEvent(this.elementRef.nativeElement, 'dragover')
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe((event: any) => {
                    event.preventDefault();
                });

            fromEvent(this.elementRef.nativeElement, 'dragleave')
                .pipe(takeUntilDestroyed(this.destroyRef))
                .subscribe((event: any) => {
                    this.ngZone.run(() => {
                        if (!this.elementRef.nativeElement.contains(event.fromElement)) {
                            this.resetDragOver();
                            this.toggleDropOverClassName();
                        }
                    });
                });

            fromEvent(this.elementRef.nativeElement, 'drop')
                .pipe(
                    takeUntilDestroyed(this.destroyRef),
                    tap((event: DragEvent) => {
                        event.preventDefault();
                    })
                )
                .subscribe((event: DragEvent) => {
                    this.ngZone.run(() => {
                        if (this.checkRejectFolderAndHtmlElement(event)) {
                            const originFiles = event.dataTransfer ? Array.from(event.dataTransfer.files) : [];
                            const files = this.filterFilesOrItems(originFiles) as File[];

                            if (files.length !== originFiles.length) {
                                const differentFiles = originFiles.filter(item => !files.includes(item));
                                this.thyFilesReject.emit(differentFiles);
                            }
                            if (!isEmpty(files)) {
                                this.selectFiles(event, files, this.thyOnDrop);
                            }
                        }
                        this.resetDragOver();
                        this.toggleDropOverClassName();
                    });
                });
        });
    }

    private checkRejectFolderAndHtmlElement(event: DragEvent) {
        // 排除文件夹和HTML元素拖拽
        const items: DataTransferItemList | DataTransferItem[] = event.dataTransfer ? event.dataTransfer.items : [];
        let res = true;
        for (let index = 0; index < items.length; index++) {
            const item = items[index];
            const entry = this.getAsEntry(item);
            if (item.kind !== 'file' || (entry && !entry.isFile)) {
                res = false;
                // console.error(`file extensions not support drag upload, kind: ${item.kind}, type: ${item.type}`);
            }
        }
        return res;
    }

    private getAsEntry(item: DataTransferItem): FileSystemEntry {
        let entry: FileSystemEntry;
        if ((item as unknown as { getAsEntry: () => FileSystemEntry })['getAsEntry']) {
            // https://wiki.whatwg.org/wiki/DragAndDropEntries
            entry = (item as unknown as { getAsEntry: () => FileSystemEntry })['getAsEntry']();
        } else if (item.webkitGetAsEntry) {
            entry = item.webkitGetAsEntry();
        }
        return entry;
    }

    private filterFilesOrItems(items: Array<DataTransferItem | File>): Array<DataTransferItem | File> {
        const acceptType = this.thyAcceptType();
        if (acceptType && acceptType != '*/*') {
            return items.filter(item => {
                const isValidType = isString(item.type) && item.type.length > 0;
                return isValidType && acceptType.includes(item.type);
            });
        } else {
            return Array.from(items);
        }
    }

    private toggleDropOverClassName() {
        const dragOverCustomClass = this.thyFileDropClassName();
        if (dragOverCustomClass) {
            if (this.isDragOver()) {
                this.renderer.addClass(this.elementRef.nativeElement, dragOverCustomClass);
            } else {
                this.renderer.removeClass(this.elementRef.nativeElement, dragOverCustomClass);
            }
        }
    }
    private resetDragOver() {
        this.isDragOver.set(false);
    }
}
