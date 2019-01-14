import { Component, OnInit, ElementRef, Renderer2, HostListener, Output, EventEmitter, HostBinding, Input, NgZone } from '@angular/core';
import { mimeTypeConvert } from './util';

@Component({
    selector: '[thyFileDrop]',
    template: `
        <ng-content></ng-content>
    `
})
export class ThyFileDropComponent implements OnInit {
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

    @Output() thyOnDrop = new EventEmitter();

    @HostBinding('class.drop-over')
    get isDragOver() {
        return this._state.isDragOver;
    }

    constructor(private elementRef: ElementRef, private renderer: Renderer2, private ngZone: NgZone) {}

    ngOnInit(): void {
        this._state.isCustomClassName = !!this.thyFileDropClassName;
        this.ngZone.runOutsideAngular(() => {
            this.renderer.listen(this.elementRef.nativeElement, 'dragenter', this.dragenter.bind(this));
            this.renderer.listen(this.elementRef.nativeElement, 'dragover', this.dragover.bind(this));
            this.renderer.listen(this.elementRef.nativeElement, 'dragleave', this.dragleave.bind(this));
            this.renderer.listen(this.elementRef.nativeElement, 'drop', this.drop.bind(this));
        });
    }

    // @HostListener('dragenter', ['$event'])
    dragenter(event: any) {
        event.preventDefault();
        const items = event.dataTransfer.items;
        if (items.length > 0) {
            if (items[0].kind !== 'file' || items[0].type === '') {
                return;
            }
        }
        this.ngZone.run(() => {
            this._backToDefaultState();
            let isDataTransferAllAccept = true;
            if (this._state.isNeedCheckTypeAccept) {
                if (items.length > 0) {
                    for (let index = 0; index < items.length; index++) {
                        const n = items[index];
                        if (!n.type || this._state.acceptType.indexOf(n.type) === -1) {
                            isDataTransferAllAccept = false;
                            return;
                        }
                    }
                }
            }
            if (isDataTransferAllAccept) {
                this._state.isDragOver = true;
            }
            this._toggleDropOverClassName();
        });
    }

    // @HostListener('dragover', ['$event'])
    dragover(event: any) {
        event.preventDefault();
    }

    // @HostListener('dragleave', ['$event'])
    dragleave(event: any) {
        this.ngZone.run(() => {
            if (!this.elementRef.nativeElement.contains(event.fromElement)) {
                this._backToDefaultState();
                this._toggleDropOverClassName();
            }
        });
    }

    // @HostListener('drop', ['$event'])
    drop(event: any) {
        event.preventDefault();
        const df = event.dataTransfer;
        let dropFiles: File[]; // 拖拽的文件，会放到这里
        let dealFileCnt = 0; // 读取文件是个异步的过程，需要记录处理了多少个文件了
        let allFileLen = df.files.length; // 所有的文件的数量，给非Chrome浏览器使用的变量

        // 检测是否已经把所有的文件都遍历过了
        function checkDropFinish() {
            if (dealFileCnt === allFileLen - 1) {
                this.getDropFileCallBack(dropFiles);
            }
            dealFileCnt++;
        }

        if (df.items !== undefined) {
            // Chrome拖拽文件逻辑
            for (var i = 0; i < df.items.length; i++) {
                var item = df.items[i];
                if (item.kind === 'file' && item.webkitGetAsEntry().isFile) {
                    var file = item.getAsFile();
                    dropFiles.push(file);
                    console.log(file);
                }
            }
        } else {
            // 非Chrome拖拽文件逻辑
            for (var i = 0; i < allFileLen; i++) {
                const dropFile = df.files[i];
                if (dropFile.type) {
                    dropFiles.push(dropFile);
                    checkDropFinish();
                } else {
                    try {
                        var fileReader = new FileReader();
                        fileReader.readAsDataURL(dropFile.slice(0, 3));

                        fileReader.addEventListener(
                            'load',
                            function(e) {
                                console.log(e, 'load');
                                dropFiles.push(dropFile);
                                checkDropFinish();
                            },
                            false
                        );

                        fileReader.addEventListener(
                            'error',
                            function(e) {
                                console.log(e, 'error，不可以上传文件夹');
                                checkDropFinish();
                            },
                            false
                        );
                    } catch (e) {
                        console.log(e, 'catch error，不可以上传文件夹');
                        checkDropFinish();
                    }
                }
            }
        }

        // this.ngZone.run(() => {
        //     if (!this._state.isDragOver) {
        //         console.error('ngx-tethys Error: Uploaded files that do not support extensions.');
        //         return;
        //     }
        //     this.thyOnDrop.emit({
        //         files: event.dataTransfer.files,
        //         nativeEvent: event
        //     });
        //     this._backToDefaultState();
        //     this._toggleDropOverClassName();
        // });
    }
    // 获得拖拽文件的回调函数
    private getDropFileCallBack(dropFiles: File[]) {
        this.ngZone.run(() => {
            if (!this._state.isDragOver) {
                console.error('ngx-tethys Error: Uploaded files that do not support extensions.');
                return;
            }
            this.thyOnDrop.emit({
                files: dropFiles,
                nativeEvent: event
            });
            this._backToDefaultState();
            this._toggleDropOverClassName();
        });
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
}
