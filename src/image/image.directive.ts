import {
    Directive,
    ElementRef,
    InjectFlags,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    Injector,
    OnDestroy,
    AfterViewInit
} from '@angular/core';
import { InputBoolean } from 'ngx-tethys/core';
import { ThyImageGroup } from './image-group.component';
import { ThyImageMeta } from './image.class';
import { ThyImageService } from './image.service';

/**
 * thyImage: 预览图片指令，只可绑定到 img 标签上
 * @name img[thyImage]
 * @order 10
 */
@Directive({
    selector: 'img[thyImage]',
    exportAs: 'thyImage',
    host: {
        '(click)': 'onPreview($event)',
        class: 'thy-image',
        '[class.thy-image-disabled]': 'thyDisablePreview'
    },
    standalone: true
})
export class ThyImageDirective implements OnInit, OnChanges, AfterViewInit, OnDestroy {
    /**
     * 图片地址
     */
    @Input() thySrc: string;

    /**
     * 预览图片地址
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

    /**
     * 是否自动计算图片资源大小
     */
    @Input() @InputBoolean() thyResolveSize = false;

    get previewable(): boolean {
        return !this.thyDisablePreview;
    }

    private parentGroup: ThyImageGroup;

    constructor(private thyImageService: ThyImageService, private injector: Injector, private elementRef: ElementRef) {}

    ngOnInit(): void {
        this.getParentGroup();
    }

    ngAfterViewInit(): void {
        if (this.parentGroup) {
            this.addParentImage();
        }
    }

    getParentGroup() {
        while (true) {
            // 多层 thy-image-group 嵌套时，获取最外层 thy-image-group 下的所有图片
            const injector = this.parentGroup?.injector || this.injector;
            const parentGroup = injector.get(ThyImageGroup, null, InjectFlags.SkipSelf);
            if (!parentGroup) {
                break;
            }
            this.parentGroup = parentGroup;
        }
    }

    addParentImage() {
        setTimeout(() => {
            const parentElement: HTMLElement = this.parentGroup.element.nativeElement;
            const images = parentElement.querySelectorAll('img[thyImage]');
            const index = Array.prototype.indexOf.call(images, this.elementRef.nativeElement);
            if (index >= 0) {
                this.parentGroup.addImage(this, index);
            } else {
                this.parentGroup.addImage(this, this.parentGroup.images.length);
            }
        });
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
                src: e.thyPreviewSrc || e.thySrc,
                ...e.thyImageMeta,
                origin: {
                    src: e.thyOriginSrc
                }
            }));
            const startIndex = previewAbleImages.findIndex(el => this === el);
            this.thyImageService.preview(previewImages, {
                startIndex,
                resolveSize: this.thyResolveSize
            });
        } else {
            const previewImages = [
                {
                    src: this.thyPreviewSrc || this.thySrc,
                    ...this.thyImageMeta,
                    origin: {
                        src: this.thyOriginSrc
                    }
                }
            ];
            this.thyImageService.preview(previewImages, { resolveSize: this.thyResolveSize });
        }
    }

    ngOnDestroy(): void {
        if (this.parentGroup) {
            const index = this.parentGroup.images.findIndex(item => item === this);
            this.parentGroup.removeImage(index);
        }
    }
}
