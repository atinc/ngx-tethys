import { Directive, ElementRef, Input, OnChanges, OnInit, Optional, SimpleChanges } from '@angular/core';
import { InputBoolean } from 'ngx-tethys/core';
import { ThyImageGroupComponent } from './image-group.component';
import { ThyImageMeta } from './image.class';
import { ThyImageService } from './image.service';

@Directive({
    selector: 'img[thyImage]',
    exportAs: 'thyImage',
    host: {
        '(click)': 'onPreview()'
    }
})
export class ThyImageDirective implements OnInit, OnChanges {
    @Input() thySrc: string;
    @Input() thyPreviewSrc: string;
    @Input() thyOriginSrc: string;
    @Input() thyImageMeta: ThyImageMeta;

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

    onPreview() {
        if (!this.previewable) {
            return;
        }
        if (this.parentGroup) {
            const previewAbleImages = this.parentGroup.images.filter(e => e.previewable);
            const previewImages = previewAbleImages.map(e => ({ src: e.thySrc, ...e.thyImageMeta }));
            const startIndex = previewAbleImages.findIndex(el => this === el);
            this.thyImageService.preview(previewImages, {
                startIndex
            });
        } else {
            const previewImages = [{ src: this.thySrc, ...this.thyImageMeta }];
            this.thyImageService.preview(previewImages);
        }
    }
}
