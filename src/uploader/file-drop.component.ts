import {
    Component,
    OnInit,
    ElementRef,
    Renderer2,
    Output,
    EventEmitter,
    HostBinding,
    Input,
    NgZone,
    OnDestroy,
    Inject
} from '@angular/core';
import { mimeTypeConvert } from './util';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil, filter, map, mapTo, tap, debounceTime, auditTime, catchError, retry } from 'rxjs/operators';
import { ThySizeExceedsHandler } from './types';
import { THY_UPLOADER_DEFAULT_OPTIONS, ThyUploaderConfig } from './uploader.config';
import { FileSelectBaseComponent } from './file-select-base';

@Component({
    selector: '[thyFileDrop]',
    template: `
        <ng-content></ng-content>
    `
})
export class ThyFileDropComponent extends FileSelectBaseComponent implements OnInit, OnDestroy {
    _state = {
        isDragOver: false,
        isCustomClassName: false,
        acceptType: '',
        isNeedCheckTypeAccept: false
    };

    @Input() thyFileDropClassName: string;

    @Input()
    set thyAcceptType(value: Array<string> | string) {
        this._state.acceptType = mimeTypeConvert(value);
        this._state.isNeedCheckTypeAccept = !!value;
    }

    @Input() thySizeThreshold: number;

    get sizeThreshold() {
        return this.thySizeThreshold !== undefined ? this.thySizeThreshold : this.defaultConfig.thySizeThreshold;
    }

    @Input() thySizeExceedsHandler: ThySizeExceedsHandler;

    @Output() thyOnDrop = new EventEmitter();

    @HostBinding('class.drop-over')
    get isDragOver() {
        return this._state.isDragOver;
    }

    private ngUnsubscribe$ = new Subject();

    constructor(
        public elementRef: ElementRef,
        public renderer: Renderer2,
        public ngZone: NgZone,
        @Inject(THY_UPLOADER_DEFAULT_OPTIONS) public defaultConfig: ThyUploaderConfig
    ) {
        super(elementRef, defaultConfig);
    }

    ngOnInit(): void {
        this._state.isCustomClassName = !!this.thyFileDropClassName;
        this.ngZone.runOutsideAngular(() => {
            fromEvent(this.elementRef.nativeElement, 'dragenter')
                .pipe(
                    takeUntil(this.ngUnsubscribe$),
                    tap((event: any) => {
                        event.preventDefault();
                    }),
                    filter(event => event.dataTransfer.items && event.dataTransfer.items.length > 0),
                    filter(this.checkRejectFolderAndHtmlElement.bind(this)),
                    filter(this.checkOptionAcceptType.bind(this))
                )
                .subscribe(() => {
                    this.ngZone.run(() => {
                        this._state.isDragOver = true;
                        this._toggleDropOverClassName();
                    });
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
                            this._backToDefaultState();
                            this._toggleDropOverClassName();
                        }
                    });
                });

            fromEvent(this.elementRef.nativeElement, 'drop')
                .pipe(
                    takeUntil(this.ngUnsubscribe$),
                    tap((event: any) => {
                        event.preventDefault();
                    }),
                    filter(event => event.dataTransfer.files && event.dataTransfer.files.length > 0),
                    filter(this.checkRejectFolderAndHtmlElement.bind(this)),
                    catchError(error => {
                        this.ngZone.run(() => {
                            this._backToDefaultState();
                            this._toggleDropOverClassName();
                        });
                        return [];
                    }),
                    filter(this.checkOptionAcceptType.bind(this))
                )
                .subscribe((event: any) => {
                    this.ngZone.run(() => {
                        if (!this._state.isDragOver) {
                            console.error('ngx-tethys Error: Uploaded files that do not support extensions.');
                            return;
                        }
                        if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
                            let uploadFiles = Array.from(event.dataTransfer.files);
                            if (!!this.sizeThreshold) {
                                uploadFiles = this.handleSizeExceeds(
                                    { sizeThreshold: this.sizeThreshold, files: event.dataTransfer.files, event: event },
                                    this.thySizeExceedsHandler
                                );
                            }
                            if (uploadFiles.length > 0) {
                                this.thyOnDrop.emit({
                                    files: uploadFiles,
                                    nativeEvent: event
                                });
                            }
                            this._backToDefaultState();
                            this._toggleDropOverClassName();
                        }
                    });
                });
        });
    }

    private checkRejectFolderAndHtmlElement(event: any) {
        // 排除文件夹和HTML元素拖拽
        const items = event.dataTransfer.items;
        let res = true;
        for (let index = 0; index < items.length; index++) {
            const element = items[index];
            const _entry = this._getAsEntry(element);
            if (_entry && !_entry.isFile) {
                res = false;
                throw new Error(`file extensions not support`);
            }
        }
        return res;
    }

    private _getAsEntry(item: any) {
        let entry;
        if (item.getAsEntry) {
            entry = item.getAsEntry();
        } else if (item.webkitGetAsEntry) {
            entry = item.webkitGetAsEntry();
        }
        return entry;
    }

    private checkOptionAcceptType(event: any) {
        const items = event.dataTransfer.items;
        let res = true;
        if (this._state.isNeedCheckTypeAccept) {
            for (let index = 0; index < items.length; index++) {
                const element = items[index];
                if (this._state.acceptType.indexOf(element.type) === -1) {
                    res = false;
                }
            }
        }
        return res;
    }

    private _toggleDropOverClassName() {
        if (this._state.isCustomClassName) {
            if (this._state.isDragOver) {
                this.renderer.addClass(this.elementRef.nativeElement, this.thyFileDropClassName);
            } else {
                this.renderer.removeClass(this.elementRef.nativeElement, this.thyFileDropClassName);
            }
        }
    }

    private _backToDefaultState() {
        this._state.isDragOver = false;
    }

    ngOnDestroy(): void {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }
}
