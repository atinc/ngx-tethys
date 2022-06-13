import { Directive, ElementRef, Input, OnChanges, OnInit, Optional, SimpleChanges } from '@angular/core';
import { InputBoolean } from 'ngx-tethys/core';
import { ThyImageGroupComponent } from './image-group.component';
import { ThyImageMeta } from './image.class';
import { ThyImageService } from './image.service';

/**
 * thyImage: 预览图片指令，只可绑定到 img 标签上
 */
@Directive({
    selector: 'img[thyImage]',
    exportAs: 'thyImage',
    host: {
        '(click)': 'onPreview($event)'
    }
})
export class ThyImageDirective implements OnInit, OnChanges {
    /**
     * 图片地址
     */
    @Input() thySrc: string;
    /**
     * 缩略图片地址
     */
    @Input() thyPreviewSrc: string;
    /**
     * 图片原图地址
     */
    @Input() thyOriginSrc: string;
    /**
     * 图片附加信息，包含 { name: string, size?: string | number; }
     */
    @Input() thyImageMeta: ThyImageMeta;
    /**
     * 是否禁止预览
     * @default false
     */
    @Input() @InputBoolean() thyDisablePreview: boolean;

    get previewable(): boolean {
        return !this.thyDisablePreview;
    }

    constructor(
        private thyImageService: ThyImageService,
        @Optional() private parentGroup: ThyImageGroupComponent,
        private elementRef: ElementRef
    ) {}

    ngOnInit(): void {
        if (this.parentGroup) {
            this.parentGroup.addImage(this);
        }
    }

    ngOnChanges(changes: SimpleChanges): void {
        const { thySrc } = changes;
        if (thySrc) {
            this.elementRef.nativeElement.src = thySrc.currentValue;
        }
    }

    onPreview(event: MouseEvent) {
        if (!this.previewable || event.button !== 0) {
            return;
        }
        if (this.parentGroup) {
            const previewAbleImages = this.parentGroup.images.filter(e => e.previewable);
            const previewImages = previewAbleImages.map(e => ({
                src: e.thySrc,
                ...e.thyImageMeta,
                origin: {
                    src: e.thyOriginSrc
                }
            }));
            const startIndex = previewAbleImages.findIndex(el => this === el);
            this.thyImageService.preview(previewImages, {
                startIndex
            });
        } else {
            const previewImages = [
                {
                    src: this.thySrc,
                    ...this.thyImageMeta,
                    origin: {
                        src: this.thyOriginSrc
                    }
                }
            ];
            this.thyImageService.preview(previewImages);
        }
    }
}
