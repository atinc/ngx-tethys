import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, Injector } from '@angular/core';
import { ThyImageInfo, ThyImagePreviewOptions } from './image.interface';
import { ThyImagePreviewRef } from './preview/image-preview-ref';
import { ThyImagePreviewComponent } from './preview/image-preview.component';

@Injectable()
export class ThyImageService {
    constructor(private overlay: Overlay, private injector: Injector) {}

    preview(images: ThyImageInfo[], options?: ThyImagePreviewOptions): ThyImagePreviewRef {
        return this.display(images, options);
    }

    private display(images: ThyImageInfo[], config?: ThyImagePreviewOptions): ThyImagePreviewRef {
        const previewConfig = { ...new ThyImagePreviewOptions(), ...(config ?? {}) };
        const overlayRef = this.createOverlay(previewConfig);
        const previewComponent = this.attachPreviewComponent(overlayRef, previewConfig);
        previewComponent.setImages(images);
        previewComponent.previewConfig = previewConfig;
        const previewRef = new ThyImagePreviewRef(previewComponent, previewConfig, overlayRef);
        return previewRef;
    }

    private attachPreviewComponent(overlayRef: OverlayRef, config: ThyImagePreviewOptions): ThyImagePreviewComponent {
        const injector = Injector.create({
            parent: this.injector,
            providers: [
                { provide: OverlayRef, useValue: overlayRef },
                { provide: ThyImagePreviewOptions, useValue: config }
            ]
        });

        const containerPortal = new ComponentPortal(ThyImagePreviewComponent, null, injector);
        const containerRef = overlayRef.attach(containerPortal);
        return containerRef.instance;
    }

    createOverlay(config: ThyImagePreviewOptions) {
        const overLayConfig = new OverlayConfig({
            hasBackdrop: true,
            scrollStrategy: this.overlay.scrollStrategies.block(),
            positionStrategy: this.overlay.position().global(),
            disposeOnNavigation: config.closeOnNavigation || true
        });
        return this.overlay.create(overLayConfig);
    }
}
