import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    NgZone,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { ThyImageInfo, ThyImagePreviewOptions } from '../image.interface';
import { takeUntil } from 'rxjs/operators';
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

    constructor(private ngZone: NgZone, private host: ElementRef<HTMLElement>, private cdr: ChangeDetectorRef) {
        super();
    }

    ngOnInit(): void {
        this.ngZone.runOutsideAngular(() => {
            fromEvent(this.host.nativeElement, 'click')
                .pipe(takeUntil(this.ngUnsubscribe$))
                .subscribe(event => {
                    if (
                        event.target === event.currentTarget &&
                        this.previewConfig.backdropClosable &&
                        this.containerClick.observers.length
                    ) {
                        this.ngZone.run(() => this.containerClick.emit());
                    }
                });
        });
    }

    setImages(images: ThyImageInfo[]): void {
        this.images = images;
        this.cdr.markForCheck();
    }
}
