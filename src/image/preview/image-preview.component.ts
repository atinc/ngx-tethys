import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    ViewEncapsulation,
    ChangeDetectorRef,
    ElementRef,
    ViewChild,
    NgZone,
    OnDestroy
} from '@angular/core';
import { InternalImageInfo, ThyImageInfo, ThyImagePreviewMode, ThyImagePreviewOperation, ThyImagePreviewOptions } from '../image.class';
import { MixinBase, mixinUnsubscribe } from 'ngx-tethys/core';
import { fromEvent, Observable, of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ThyDialog } from 'ngx-tethys/dialog';
import { getClientSize, getFitContentPosition, getOffset, humanizeBytes, isNumber, isUndefinedOrNull } from 'ngx-tethys/util';
import { ThyFullscreen } from 'ngx-tethys/fullscreen';
import { ThyCopyEvent } from 'ngx-tethys/copy';
import { ThyNotifyService } from 'ngx-tethys/notify';
import { DomSanitizer } from '@angular/platform-browser';
import { fetchImageBlob } from '../utils';

const initialPosition = {
    x: 0,
    y: 0
};
const IMAGE_MAX_ZOOM = 3;
const IMAGE_MIN_ZOOM = 0.1;
const HORIZONTAL_SPACE = 100 * 2; // left: 100px; right: 100px
const VERTICAL_SPACE = 96 + 106; // top: 96px; bottom: 106px

/**
 * 图片预览组件
 */
@Component({
    selector: 'thy-image-preview',
    exportAs: 'thyImagePreview',
    templateUrl: './image-preview.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'thy-image-preview-wrap',
        '[class.thy-image-preview-moving]': 'isDragging'
    }
})
export class ThyImagePreviewComponent extends mixinUnsubscribe(MixinBase) implements OnInit, OnDestroy {
    images: InternalImageInfo[] = [];
    previewIndex: number = 0;
    previewConfig: ThyImagePreviewOptions;
    previewImageTransform = '';
    previewImageWrapperTransform = '';
    zoomDisabled = false;
    zoom: number = 1;
    position = { ...initialPosition };
    isDragging = false;
    isLoadingDone = false;
    isFullScreen = false;
    isInsideScreen = true;
    currentImageMode: ThyImagePreviewMode = 'original-scale';
    previewOperations: ThyImagePreviewOperation[];
    defaultPreviewOperations: ThyImagePreviewOperation[] = [
        {
            icon: 'zoom-out',
            name: '缩小',
            action: (image: ThyImageInfo) => {
                this.zoomOut();
            },
            type: 'zoom-out'
        },
        {
            icon: 'zoom-in',
            name: '放大',
            action: (image: ThyImageInfo) => {
                this.zoomIn();
            },
            type: 'zoom-in'
        },
        {
            icon: 'one-to-one',
            name: '原始比例',
            action: (image: ThyImageInfo) => {
                this.setOriginalSize();
            },
            type: 'original-scale'
        },
        {
            icon: 'max-view',
            name: '适应屏幕',
            action: () => {
                this.setFitScreen();
            },
            type: 'fit-screen'
        },
        {
            icon: 'expand-arrows',
            name: '全屏显示',
            action: () => {
                this.fullScreen();
            },
            type: 'full-screen'
        },
        {
            icon: 'rotate-right',
            name: '旋转',
            action: (image: ThyImageInfo) => {
                this.rotateRight();
            },
            type: 'rotate-right'
        },
        {
            icon: 'download',
            name: '下载',
            action: (image: ThyImageInfo) => {
                this.download(image);
            },
            type: 'download'
        },
        {
            icon: 'preview',
            name: '查看原图',
            action: () => {
                this.viewOriginal();
            },
            type: 'view-original'
        },
        {
            icon: 'link-insert',
            name: '复制链接',
            type: 'copyLink'
        }
    ];
    private rotate: number;

    get previewImage(): InternalImageInfo {
        const image = this.images[this.previewIndex];
        if (image.size) {
            return {
                ...image,
                size: isNumber(image.size) ? humanizeBytes(image.size) : image.size
            };
        }
        return image;
    }

    get previewImageOriginSrc() {
        let imageSrc = this.previewImage.origin?.src || this.previewImage.src;
        if (imageSrc.startsWith('./')) {
            return window.location.host + '/' + imageSrc.split('./')[1];
        }
        return imageSrc;
    }

    get defaultZoom(): number {
        if (this.previewConfig?.zoom && this.previewConfig?.zoom > 0) {
            return this.previewConfig.zoom >= IMAGE_MAX_ZOOM
                ? IMAGE_MAX_ZOOM
                : this.previewConfig.zoom <= IMAGE_MIN_ZOOM
                ? IMAGE_MIN_ZOOM
                : this.previewConfig.zoom;
        }
    }

    @ViewChild('imgRef', { static: false }) imageRef!: ElementRef<HTMLImageElement>;
    @ViewChild('imagePreviewWrapper', { static: true }) imagePreviewWrapper!: ElementRef<HTMLElement>;

    constructor(
        public thyDialog: ThyDialog,
        public thyFullscreen: ThyFullscreen,
        private cdr: ChangeDetectorRef,
        private ngZone: NgZone,
        private notifyService: ThyNotifyService,
        private host: ElementRef<HTMLElement>,
        private sanitizer: DomSanitizer
    ) {
        super();
    }

    ngOnInit(): void {
        this.initPreview();
        this.ngZone.runOutsideAngular(() => {
            fromEvent(this.host.nativeElement, 'click')
                .pipe(takeUntil(this.ngUnsubscribe$))
                .subscribe(event => {
                    if (
                        (event.target === event.currentTarget ||
                            (this.isInsideScreen && this.imagePreviewWrapper.nativeElement.contains(event.target as HTMLElement))) &&
                        !this.previewConfig?.disableClose
                    ) {
                        this.ngZone.run(() => !this.isFullScreen && this.thyDialog.close());
                    }
                });

            fromEvent(this.imagePreviewWrapper.nativeElement, 'mousedown')
                .pipe(takeUntil(this.ngUnsubscribe$))
                .subscribe(() => {
                    this.isDragging = !this.isInsideScreen && true;
                });
        });
    }

    setOriginalSize() {
        this.reset();
        this.currentImageMode = 'fit-screen';
        this.zoom = 1;
        this.updatePreviewImageTransform();
        this.calculateInsideScreen();
        this.isLoadingDone = true;
        this.cdr.detectChanges();
    }

    setFitScreen() {
        this.reset();
        this.isInsideScreen = true;
        this.updatePreviewImage();
    }

    useDefaultZoomUpdate(isUpdateImageWrapper: boolean) {
        this.zoom = this.defaultZoom;
        this.isLoadingDone = true;
        this.updatePreviewImageTransform();
        if (isUpdateImageWrapper) {
            this.updatePreviewImageWrapperTransform();
        }
        this.cdr.detectChanges();
    }

    useCalculateZoomUpdate(isUpdateImageWrapper?: boolean) {
        let img = new Image();
        img.src = this.previewImage.src;
        img.onload = () => {
            const { width: offsetWidth, height: offsetHeight } = getClientSize();
            const innerWidth = offsetWidth - HORIZONTAL_SPACE;
            const innerHeight = offsetHeight - VERTICAL_SPACE;
            const { naturalWidth, naturalHeight } = img;
            const xRatio = innerWidth / naturalWidth;
            const yRatio = innerHeight / naturalHeight;
            const zoom = Math.min(xRatio, yRatio);
            if (zoom > 1) {
                this.zoom = 1;
            } else {
                this.zoom = zoom;
            }
            this.isLoadingDone = true;
            this.updatePreviewImageTransform();
            if (isUpdateImageWrapper) {
                this.updatePreviewImageWrapperTransform();
            }
            this.cdr.detectChanges();
        };
    }

    updatePreviewImage() {
        this.resolvePreviewImage().subscribe(result => {
            if (!result) {
                // error
                this.isLoadingDone = true;
                return;
            }
            // image size
            if (!this.previewImage.size && this.previewImage.blob) {
                this.previewImage.size = humanizeBytes(this.previewImage.blob.size);
            }
            if (this.defaultZoom) {
                this.useDefaultZoomUpdate(true);
            } else {
                this.useCalculateZoomUpdate();
            }
        });
    }

    resolvePreviewImage() {
        return new Observable<Boolean>(subscriber => {
            if (this.previewImage.src.startsWith('blob:')) {
                this.previewImage.objectURL = this.sanitizer.bypassSecurityTrustUrl(this.previewImage.src);
                subscriber.next(true);
                subscriber.complete();
                return;
            }
            if (this.previewImage.objectURL || !this.previewConfig.resolveSize) {
                subscriber.next(true);
                subscriber.complete();
            } else {
                fetchImageBlob(this.previewImage.src).subscribe(
                    blob => {
                        const urlCreator = window.URL || window.webkitURL;
                        const objectURL = urlCreator.createObjectURL(blob);
                        this.previewImage.objectURL = this.sanitizer.bypassSecurityTrustUrl(objectURL);
                        this.previewImage.blob = blob;
                        subscriber.next(true);
                        subscriber.complete();
                    },
                    error => {
                        subscriber.next(false);
                        subscriber.complete();
                    }
                );
            }
        });
    }

    initPreview() {
        if (Array.isArray(this.previewConfig?.operations) && this.previewConfig?.operations.length) {
            this.previewOperations = this.defaultPreviewOperations.filter(item => this.previewConfig.operations.includes(item.type));
        } else {
            this.previewOperations = this.defaultPreviewOperations;
        }
        this.rotate = this.previewConfig?.rotate ?? 0;
        this.updatePreviewImage();
    }

    download(image: ThyImageInfo) {
        let img = new Image();
        img.setAttribute('crossOrigin', 'Anonymous');
        img.onload = () => {
            let canvas = document.createElement('canvas');
            let context = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0, img.width, img.height);
            let url = canvas.toDataURL('images/png');
            let a = document.createElement('a');
            let event = new MouseEvent('click');
            a.download = image.name || 'default.png';
            a.href = url;
            a.dispatchEvent(event);
        };
        img.onerror = () => {
            let a = document.createElement('a');
            a.download = image.name || 'default.png';
            a.target = '_blank';
            a.href = image.origin?.src || image.src;
            let event = new MouseEvent('click');
            a.dispatchEvent(event);
        };
        img.src = image.origin?.src || image.src;
    }

    zoomIn(): void {
        if (this.zoom < IMAGE_MAX_ZOOM) {
            this.zoom = Math.min(this.zoom + 0.1, IMAGE_MAX_ZOOM);
            this.calculateInsideScreen();
            this.updatePreviewImageTransform();
            this.position = { ...initialPosition };
        }
    }

    zoomOut(): void {
        if (this.zoom > IMAGE_MIN_ZOOM) {
            this.zoom = Math.max(this.zoom - 0.1, IMAGE_MIN_ZOOM);
            this.calculateInsideScreen();
            this.updatePreviewImageTransform();
            this.position = { ...initialPosition };
        }
    }

    calculateInsideScreen() {
        const width = this.imageRef.nativeElement.offsetWidth * this.zoom;
        const height = this.imageRef.nativeElement.offsetHeight * this.zoom;
        const { width: clientWidth, height: clientHeight } = getClientSize();
        if (width >= clientWidth || height >= clientHeight) {
            this.isInsideScreen = false;
        } else {
            this.isInsideScreen = true;
        }
    }

    viewOriginal() {
        window.open(this.previewImage?.origin?.src || this.previewImage.src, '_blank');
    }

    rotateRight(): void {
        this.rotate += 90;
        this.updatePreviewImageTransform();
    }

    fullScreen(): void {
        const targetElement = this.host.nativeElement.querySelector('.thy-image-preview');
        this.isFullScreen = true;
        const fullscreenRef = this.thyFullscreen.launch({
            target: targetElement
        });
        fullscreenRef.afterExited().subscribe(() => {
            this.isFullScreen = false;
            this.cdr.markForCheck();
        });
    }

    copyLink(event: ThyCopyEvent) {
        if (event.isSuccess) {
            this.notifyService.success('复制图片地址成功');
        } else {
            this.notifyService.error('复制图片地址失败');
        }
    }

    prev() {
        if (this.previewIndex > 0) {
            this.previewIndex--;
            this.isLoadingDone = false;
            this.reset();
            this.updatePreviewImage();
        }
    }

    next() {
        if (this.previewIndex < this.images.length - 1) {
            this.previewIndex++;
            this.isLoadingDone = false;
            this.reset();
            this.updatePreviewImage();
        }
    }

    dragReleased() {
        this.isDragging = false;
        const width = this.imageRef.nativeElement.offsetWidth * this.zoom;
        const height = this.imageRef.nativeElement.offsetHeight * this.zoom;
        const { left, top } = getOffset(this.imageRef.nativeElement, window);
        const { width: clientWidth, height: clientHeight } = getClientSize();
        const isRotate = this.rotate % 180 !== 0;
        const fitContentParams = {
            width: isRotate ? height : width,
            height: isRotate ? width : height,
            left,
            top,
            clientWidth,
            clientHeight
        };
        const fitContentPos = getFitContentPosition(fitContentParams);
        if (!isUndefinedOrNull(fitContentPos.x) || !isUndefinedOrNull(fitContentPos.y)) {
            this.position = { ...this.position, ...fitContentPos };
        }
    }

    private reset(): void {
        this.currentImageMode = 'original-scale';
        this.rotate = this.previewConfig?.rotate ?? 0;
        this.position = { ...initialPosition };
        this.cdr.detectChanges();
    }

    private updatePreviewImageTransform(): void {
        this.previewImageTransform = `scale3d(${this.zoom}, ${this.zoom}, 1) rotate(${this.rotate}deg)`;
    }

    private updatePreviewImageWrapperTransform(): void {
        this.previewImageWrapperTransform = `translate3d(${this.position.x}px, ${this.position.y}px, 0)`;
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
