import { Injectable, Injector, Optional, Inject, OnDestroy } from '@angular/core';
import { ThySlideContainerComponent } from './slide-container.component';
import { OverlayConfig, OverlayRef, Overlay } from '@angular/cdk/overlay';
import { PortalInjector, ComponentPortal } from '@angular/cdk/portal';
import { ThyUpperOverlayService, ThyUpperOverlayRef, ComponentTypeOrTemplateRef } from '../core/overlay';
import { ThySlideConfig, THY_SLIDE_DEFAULT_OPTIONS, slideUpperOverlayOptions } from './slide.config';
import { ThySlideRef, ThyInternalSlideRef } from './slide-ref.service';
import { Directionality } from '@angular/cdk/bidi';
import { of } from 'rxjs';
import { coerceArray } from '../util/helpers';

@Injectable()
export class ThySlideService extends ThyUpperOverlayService<ThySlideConfig, ThySlideContainerComponent>
    implements OnDestroy {
    private getOverlayPanelClasses(slideConfig: ThySlideConfig) {
        const classes: string[] = ['slide'];
        // 兼容之前的 class
        if (slideConfig.class) {
            return classes.concat(coerceArray(slideConfig.class));
        }
        if (slideConfig.panelClass) {
            return classes.concat(coerceArray(slideConfig.panelClass));
        }
        return classes;
    }

    protected buildOverlayConfig(config: ThySlideConfig): OverlayConfig {
        const overlayConfig = this.buildBaseOverlayConfig(config);
        overlayConfig.panelClass = this.getOverlayPanelClasses(config);
        return overlayConfig;
    }

    protected attachUpperOverlayContainer(overlay: OverlayRef, config: ThySlideConfig): ThySlideContainerComponent {
        const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        const injector = new PortalInjector(userInjector || this.injector, new WeakMap([[ThySlideConfig, config]]));
        const containerPortal = new ComponentPortal(ThySlideContainerComponent, config.viewContainerRef, injector);
        const containerRef = overlay.attach<ThySlideContainerComponent>(containerPortal);
        return containerRef.instance;
    }

    protected createUpperOverlayRef<T>(
        overlayRef: OverlayRef,
        containerInstance: ThySlideContainerComponent,
        config: ThySlideConfig
    ): ThyUpperOverlayRef<T, ThySlideContainerComponent, any> {
        return new ThyInternalSlideRef(overlayRef, containerInstance, config);
    }

    protected createInjector<T>(
        config: ThySlideConfig,
        overlayRef: ThyUpperOverlayRef<T, ThySlideContainerComponent, any>,
        containerInstance: ThySlideContainerComponent
    ): PortalInjector {
        const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;

        const injectionTokens = new WeakMap<any, any>([
            [ThySlideContainerComponent, containerInstance],
            [ThySlideRef, overlayRef]
        ]);

        if (config.direction && (!userInjector || !userInjector.get<Directionality | null>(Directionality, null))) {
            injectionTokens.set(Directionality, {
                value: config.direction,
                change: of()
            });
        }

        return new PortalInjector(userInjector || this.injector, injectionTokens);
    }

    private overlayIsOpened(config: ThySlideConfig) {
        const overlayId = config.id || config.key;
        const openedOverlay = this.getUpperOverlayById(overlayId);
        this.close(openedOverlay);
        return openedOverlay;
    }

    constructor(
        overlay: Overlay,
        injector: Injector,
        @Optional()
        @Inject(THY_SLIDE_DEFAULT_OPTIONS)
        defaultConfig: ThySlideConfig
    ) {
        super(slideUpperOverlayOptions, overlay, injector, defaultConfig);
    }

    open<T, TData = undefined, TResult = undefined>(
        componentOrTemplateRef: ComponentTypeOrTemplateRef<T>,
        config?: ThySlideConfig
    ): ThySlideRef<T, TResult> {
        if (this.overlayIsOpened(config)) {
            return;
        }
        const popoverRef = this.openUpperOverlay(componentOrTemplateRef, config);
        return popoverRef as ThySlideRef<T, TResult>;
    }

    show<T, TData = undefined, TResult = undefined>(
        componentOrTemplateRef: ComponentTypeOrTemplateRef<T>,
        config?: ThySlideConfig
    ): ThySlideRef<T, TResult> {
        return this.open(componentOrTemplateRef, config);
    }

    hide<T>(result?: T) {
        this.close<T>(result);
    }

    ngOnDestroy() {
        this.dispose();
    }
}
