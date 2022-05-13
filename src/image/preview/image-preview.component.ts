import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, ViewEncapsulation } from '@angular/core';
import { ThyImageInfo, ThyImagePreviewOptions } from '../image.interface';
import { MixinBase, mixinUnsubscribe } from 'ngx-tethys/core';

@Component({
    selector: 'thy-image-preview',
    exportAs: 'thyImagePreview',
    templateUrl: './image-preview.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        class: 'thy-image-preview-wrap'
    }
})
export class ThyImagePreviewComponent extends mixinUnsubscribe(MixinBase) implements OnInit {
    images: ThyImageInfo[] = [];
    previewConfig: ThyImagePreviewOptions;
    containerClick = new EventEmitter<void>();

    constructor() {
        super();
    }

    ngOnInit(): void {}
}
