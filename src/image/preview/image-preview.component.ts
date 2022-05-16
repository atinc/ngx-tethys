import {
    ChangeDetectionStrategy,
    Component,
    OnInit,
    ViewEncapsulation,
    ChangeDetectorRef,
    ElementRef,
    ViewChild,
    NgZone
} from '@angular/core';
import { ThyImageInfo, ThyImagePreviewContainerOperation, ThyImagePreviewOptions } from '../image.interface';
import { MixinBase, mixinUnsubscribe } from 'ngx-tethys/core';
import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ThyDialog } from 'ngx-tethys/dialog';
import { getClientSize, getFitContentPosition, getOffset, isNotNil } from 'ngx-tethys/util';

const initialPosition = {
    x: 0,
    y: 0
};
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
export class ThyImagePreviewComponent extends mixinUnsubscribe(MixinBase) implements OnInit {
    images: ThyImageInfo[] = [];
    previewIndex: number = 0;
    previewConfig: ThyImagePreviewOptions;
    previewImageTransform = '';
    previewImageWrapperTransform = '';
    zoomDisabled = false;
    zoom: number;
    position = { ...initialPosition };
    isDragging = false;
    previewOperations: ThyImagePreviewContainerOperation[] = [
        {
            icon: 'zoom-out',
            tooltip: '缩小',
            action: () => {
                this.zoomOut();
            },
            type: 'zoomOut'
        },
        {
            icon: 'zoom-in',
            tooltip: '放大',
            action: () => {
                this.zoomIn();
            },
            type: 'zoomIn'
        },
        // {
        //     icon: 'one-to-one',
        //     tooltip: '原始尺寸',
        //     action: () => {}
        // },
        // {
        //     icon: 'one-to-one',
        //     tooltip: '适应屏幕',
        //     action: () => {}
        // },
        {
            icon: 'rotate-right',
            tooltip: '向右旋转',
            action: () => {
                this.rotateRight();
            },
            type: 'rotateRight'
        },
        {
            icon: 'download',
            tooltip: '下载原图',
            action: () => {
                this.download();
            },
            type: 'download'
        }
        // {
        //     icon: 'preview',
        //     tooltip: '查看原图',
        //     action: () => {}
        // },
        // {
        //     icon: 'link-insert',
        //     tooltip: '链接打开',
        //     action: () => {}
        // }
    ];

    private rotate: number;

    get previewImage(): ThyImageInfo {
        return this.images[this.previewIndex];
    }

    @ViewChild('imgRef') imageRef!: ElementRef<HTMLImageElement>;
    @ViewChild('imagePreviewWrapper', { static: true }) imagePreviewWrapper!: ElementRef<HTMLElement>;

    constructor(
        public thyDialog: ThyDialog,
        private cdr: ChangeDetectorRef,
        private ngZone: NgZone,
        private host: ElementRef<HTMLElement>
    ) {
        super();
        this.rotate = this.previewConfig?.rotate ?? 0;
        this.zoom = this.previewConfig?.zoom ?? 1;
        this.updatePreviewImageTransform();
        this.updatePreviewImageWrapperTransform();
    }

    ngOnInit(): void {
        this.ngZone.runOutsideAngular(() => {
            fromEvent(this.host.nativeElement, 'click')
                .pipe(takeUntil(this.ngUnsubscribe$))
                .subscribe(event => {
                    if (event.target === event.currentTarget && !this.previewConfig?.disableClose) {
                        this.ngZone.run(() => this.thyDialog.close());
                    }
                });

            fromEvent(this.imagePreviewWrapper.nativeElement, 'mousedown')
                .pipe(takeUntil(this.ngUnsubscribe$))
                .subscribe(() => {
                    this.isDragging = true;
                });
        });
    }

    download() {
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
            a.download = this.previewImage.name || 'default.png';
            a.href = url;
            a.dispatchEvent(event);
        };
        img.src = this.previewImage.origin?.src || this.previewImage.src + '?v=' + Date.now();
    }

    zoomIn(): void {
        if (this.zoom < 5) {
            this.zoom += 1;
            this.updatePreviewImageTransform();
            this.position = { ...initialPosition };
        }
    }

    zoomOut(): void {
        if (this.zoom > 1) {
            this.zoom -= 1;
            this.updatePreviewImageTransform();
            this.position = { ...initialPosition };
        }
    }

    rotateRight(): void {
        this.rotate += 90;
        this.updatePreviewImageTransform();
    }

    prev() {
        if (this.previewIndex > 0) {
            this.reset();
            this.previewIndex--;
            this.updatePreviewImageTransform();
            this.cdr.markForCheck();
        }
    }

    next() {
        if (this.previewIndex < this.images.length - 1) {
            this.reset();
            this.previewIndex++;
            this.cdr.markForCheck();
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
        if (isNotNil(fitContentPos.x) || isNotNil(fitContentPos.y)) {
            this.position = { ...this.position, ...fitContentPos };
        }
    }

    private reset(): void {
        this.zoom = 1;
        this.rotate = 0;
        this.position = { ...initialPosition };
    }

    private updatePreviewImageTransform(): void {
        this.previewImageTransform = `scale3d(${this.zoom}, ${this.zoom}, 1) rotate(${this.rotate}deg)`;
    }

    private updatePreviewImageWrapperTransform(): void {
        this.previewImageWrapperTransform = `translate3d(${this.position.x}px, ${this.position.y}px, 0)`;
    }
}
