import { isEmpty, isString } from 'ngx-tethys/util';
import { fromEvent, Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';

import {
    Directive,
    ElementRef,
    EventEmitter,
    HostBinding,
    Inject,
    Input,
    NgZone,
    OnDestroy,
    OnInit,
    Output,
    Renderer2,
    inject
} from '@angular/core';

import { FileSelectBaseDirective } from './file-select-base';
import { THY_UPLOAD_DEFAULT_OPTIONS, ThyUploadConfig } from './upload.config';

/**
 * @name thyFileDrop
 */
@Directive({
    selector: '[thyFileDrop]',
    standalone: true
})
export class ThyFileDropDirective extends FileSelectBaseDirective implements OnInit, OnDestroy {
    @HostBinding('class.drop-over')
    @HostBinding('class.thy-drop-over')
    isDragOver = false;
    private dragOverCustomClass: string;

    @Input() set thyFileDropClassName(value: string) {
        this.dragOverCustomClass = value;
    }

    @Output() thyOnDrop = new EventEmitter();

    /**
     * 当拖拽的文件中有不符合 thyAcceptType 中定义的类型时触发
     * @description.en-us It is triggered when there are files in the dragged files that do not conform to the types defined in thyAcceptType.
     */
    @Output() thyFilesReject = new EventEmitter<File[]>();

    private ngUnsubscribe$ = new Subject<void>();

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
                    takeUntil(this.ngUnsubscribe$),
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
                                this.isDragOver = true;
                                this.toggleDropOverClassName();
                            });
                        }
                    }
                });

            fromEvent(this.elementRef.nativeElement, 'dragover')
                .pipe(takeUntil(this.ngUnsubscribe$))
                .subscribe((event: any) => {
                    event.preventDefault();
                });

            fromEvent(this.elementRef.nativeElement, 'dragleave')
                .pipe(takeUntil(this.ngUnsubscribe$))
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
                    takeUntil(this.ngUnsubscribe$),
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
        if (this.acceptType && this.acceptType != '*/*') {
            return items.filter(item => {
                const isValidType = isString(item.type) && item.type.length > 0;
                return isValidType && this.acceptType.includes(item.type);
            });
        } else {
            return Array.from(items);
        }
    }

    private toggleDropOverClassName() {
        if (this.dragOverCustomClass) {
            if (this.isDragOver) {
                this.renderer.addClass(this.elementRef.nativeElement, this.dragOverCustomClass);
            } else {
                this.renderer.removeClass(this.elementRef.nativeElement, this.dragOverCustomClass);
            }
        }
    }

    private setDragOverState(isDragOver: boolean) {
        this.isDragOver = isDragOver;
    }

    private resetDragOver() {
        this.setDragOverState(false);
    }

    public ngOnDestroy(): void {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }
}
