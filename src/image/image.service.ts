import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { Inject, Injectable, Injector, OnDestroy, Optional, StaticProvider, TemplateRef } from '@angular/core';
import { ThyAbstractOverlayRef, ThyAbstractOverlayService, ThyClickPositioner } from 'ngx-tethys/core';
import { imageAbstractOverlayOptions, ThyImagePreviewConfig, THY_IMAGE_DEFAULT_PREVIEW_OPTIONS } from './image-config';
import { ThyImageInfo, ThyImagePreviewOptions } from './image.interface';
import { ThyImagePreviewRef, ThyInternalImageRef } from './preview/image-preview-ref';
import { ThyImagePreviewComponent } from './preview/image-preview.component';
import { ThyImagePreviewContainerComponent } from './preview/image-preview.container.component';

@Injectable()
export class ThyImageService extends ThyAbstractOverlayService<ThyImagePreviewConfig, ThyImagePreviewContainerComponent>
    implements OnDestroy {
    constructor(
        overlay: Overlay,
        injector: Injector,
        clickPositioner: ThyClickPositioner,
        @Optional()
        @Inject(THY_IMAGE_DEFAULT_PREVIEW_OPTIONS)
        defaultConfig: ThyImagePreviewConfig
    ) {
        super(imageAbstractOverlayOptions, overlay, injector, defaultConfig);
        clickPositioner.initialize();
    }

    protected buildOverlayConfig(config: ThyImagePreviewConfig<any>): OverlayConfig {
        const overlayConfig = this.buildBaseOverlayConfig(config);
        overlayConfig.positionStrategy = this.overlay.position().global();
        overlayConfig.scrollStrategy = this.overlay.scrollStrategies.block();
        return overlayConfig;
    }

    protected createAbstractOverlayRef<T, TResult>(
        overlayRef: OverlayRef,
        containerInstance: ThyImagePreviewContainerComponent,
        config: ThyImagePreviewConfig<any>
    ): ThyAbstractOverlayRef<T, ThyImagePreviewContainerComponent, TResult> {
        return new ThyInternalImageRef(overlayRef, containerInstance, config);
    }

    protected attachOverlayContainer(overlay: OverlayRef, config: ThyImagePreviewConfig<any>): ThyImagePreviewContainerComponent {
        const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        const injector = Injector.create({
            parent: userInjector || this.injector,
            providers: [{ provide: ThyImagePreviewConfig, useValue: config }]
        });
        const containerPortal = new ComponentPortal(ThyImagePreviewContainerComponent, config.viewContainerRef, injector);
        const containerRef = overlay.attach<ThyImagePreviewContainerComponent>(containerPortal);
        return containerRef.instance;
    }

    protected createInjector<T>(
        config: ThyImagePreviewConfig,
        imagePreviewRef: ThyImagePreviewRef<T>,
        imagePreviewContainer: ThyImagePreviewContainerComponent
    ): Injector {
        const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        const injectionTokens: StaticProvider[] = [
            { provide: ThyImagePreviewContainerComponent, useValue: imagePreviewContainer },
            {
                provide: ThyImagePreviewRef,
                useValue: imagePreviewRef
            }
        ];

        return Injector.create({ parent: userInjector || this.injector, providers: injectionTokens });
    }

    open<T, TData = unknown, TResult = unknown>(
        componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
        config?: ThyImagePreviewConfig<TData>
    ): ThyImagePreviewRef<T, TResult> {
        const imagePreviewRef = this.openOverlay(componentOrTemplateRef, config);
        imagePreviewRef.updatePosition();
        return imagePreviewRef as ThyImagePreviewRef<T, TResult>;
    }

    preview(images: ThyImageInfo[], options?: ThyImagePreviewOptions) {
        return this.open(ThyImagePreviewComponent, {
            initialState: {
                images
            },
            ...options
        });
    }

    ngOnDestroy() {
        this.dispose();
    }
}
