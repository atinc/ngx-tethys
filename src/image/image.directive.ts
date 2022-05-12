import { Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { InputBoolean } from '../core';
import { ThyImageMetaInfo } from './image.interface';
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
    @Input() ThyImageMetaInfo: ThyImageMetaInfo;
    @Input() @InputBoolean() thyDisablePreview: boolean;

    get previewable(): boolean {
        return !this.thyDisablePreview;
    }
    constructor(private thyImageService: ThyImageService, private elementRef: ElementRef) {}

    ngOnInit(): void {}

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
        const previewImages = [{ src: this.thySrc }];
        this.thyImageService.preview(previewImages);
    }
}
