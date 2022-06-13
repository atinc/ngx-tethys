import { isEmpty } from 'ngx-tethys/util';
import { fromEvent, Subject } from 'rxjs';
import { filter, takeUntil, tap } from 'rxjs/operators';

import {
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Inject,
    Input,
    NgZone,
    OnDestroy,
    OnInit,
    Output,
    Renderer2
} from '@angular/core';

import { FileSelectBaseComponent } from './file-select-base';
import { THY_UPLOAD_DEFAULT_OPTIONS, ThyUploadConfig } from './upload.config';
import { mimeTypeConvert } from './util';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[thyFileDrop]',
    template: `
        <ng-content></ng-content>
    `
})
export class ThyFileDropComponent extends FileSelectBaseComponent implements OnInit, OnDestroy {
    @HostBinding('class.drop-over')
    @HostBinding('class.thy-drop-over')
    isDragOver = false;
    private dragOverCustomClass: string;

    @Input() set thyFileDropClassName(value: string) {
        this.dragOverCustomClass = value;
    }

    @Input()
    set thyAcceptType(value: Array<string> | string) {
        this.acceptType = mimeTypeConvert(value);
    }

    @Output() thyOnDrop = new EventEmitter();

    private ngUnsubscribe$ = new Subject();

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
                            const files = this.filterFilesOrItems(event.dataTransfer ? Array.from(event.dataTransfer.files) : []);
                            if (!isEmpty(files)) {
                                this.selectFiles(event, Array.from(event.dataTransfer.files), this.thyOnDrop);
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
        if (item['getAsEntry']) {
            // https://wiki.whatwg.org/wiki/DragAndDropEntries
            entry = item['getAsEntry']();
        } else if (item.webkitGetAsEntry) {
            entry = item.webkitGetAsEntry();
        }
        return entry;
    }

    private filterFilesOrItems(items: Array<DataTransferItem | File>): Array<DataTransferItem | File> {
        if (this.acceptType && this.acceptType != '*/*') {
            return items.filter(item => {
                return this.acceptType.includes(item.type);
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
