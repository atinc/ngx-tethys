import { ComponentTypeOrTemplateRef, ThyAbstractOverlayRef, ThyAbstractOverlayService } from 'ngx-tethys/core';
import { coerceArray, concatArray } from 'ngx-tethys/util';
import { of } from 'rxjs';

import { Directionality } from '@angular/cdk/bidi';
import { coerceElement } from '@angular/cdk/coercion';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Inject, Injectable, Injector, OnDestroy, Optional, StaticProvider } from '@angular/core';

import { ThySlideContainerComponent } from './slide-container.component';
import { ThyInternalSlideRef, ThySlideRef } from './slide-ref.service';
import { slideDefaultConfigValue, slideUpperOverlayOptions, THY_SLIDE_DEFAULT_CONFIG, ThySlideConfig } from './slide.config';

@Injectable()
export class ThySlideService extends ThyAbstractOverlayService<ThySlideConfig, ThySlideContainerComponent> implements OnDestroy {
    private originElementAddActiveClass(config: ThySlideConfig) {
        if (config.origin) {
            coerceElement<HTMLElement>(config.origin).classList.add(...coerceArray(config.originActiveClass));
        }
    }

    private originElementRemoveActiveClass(config: ThySlideConfig) {
        if (config.origin) {
            coerceElement<HTMLElement>(config.origin).classList.remove(...coerceArray(config.originActiveClass));
        }
    }

    protected buildOverlayConfig(config: ThySlideConfig): OverlayConfig {
        config.id = config.id || (config.key as string);
        const defaultClasses: string[] = ['thy-slide-overlay-pane', `thy-slide-${config.from}`];
        const overlayConfig = {
            ...this.buildBaseOverlayConfig(config, defaultClasses),
            width: config.width
        };
        // 兼容之前的 class
        if (config.class) {
            overlayConfig.panelClass = concatArray(overlayConfig.panelClass, config.class);
        }
        return overlayConfig;
    }

    protected attachUpperOverlayContainer(overlay: OverlayRef, config: ThySlideConfig): ThySlideContainerComponent {
        const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        const injector = Injector.create({
            parent: userInjector || this.injector,
            providers: [{ provide: ThySlideConfig, useValue: config }]
        });
        const containerPortal = new ComponentPortal(ThySlideContainerComponent, config.viewContainerRef, injector);
        const containerRef = overlay.attach<ThySlideContainerComponent>(containerPortal);
        return containerRef.instance;
    }

    protected createUpperOverlayRef<T>(
        overlayRef: OverlayRef,
        containerInstance: ThySlideContainerComponent,
        config: ThySlideConfig
    ): ThyAbstractOverlayRef<T, ThySlideContainerComponent, any> {
        return new ThyInternalSlideRef(overlayRef, containerInstance, config);
    }

    protected createInjector<T>(
        config: ThySlideConfig,
        overlayRef: ThyAbstractOverlayRef<T, ThySlideContainerComponent, any>,
        containerInstance: ThySlideContainerComponent
    ): Injector {
        const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;

        const injectionTokens: StaticProvider[] = [
            { provide: ThySlideContainerComponent, useValue: containerInstance },
            { provide: ThySlideRef, useValue: overlayRef }
        ];

        if (config.direction && (!userInjector || !userInjector.get<Directionality | null>(Directionality, null))) {
            injectionTokens.push({
                provide: Directionality,
                useValue: {
                    value: config.direction,
                    change: of()
                }
            });
        }

        return Injector.create({ parent: userInjector || this.injector, providers: injectionTokens });
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
        @Inject(THY_SLIDE_DEFAULT_CONFIG)
        defaultConfig: ThySlideConfig
    ) {
        const slideDefaultConfig = Object.assign({}, slideDefaultConfigValue, defaultConfig);
        super(slideUpperOverlayOptions, overlay, injector, slideDefaultConfig);
    }

    open<T, TData = undefined, TResult = undefined>(
        componentOrTemplateRef: ComponentTypeOrTemplateRef<T>,
        config: ThySlideConfig
    ): ThySlideRef<T, TResult> {
        if (this.overlayIsOpened(config)) {
            return;
        }
        const slideRef = this.openUpperOverlay(componentOrTemplateRef, config);
        this.originElementAddActiveClass(slideRef.containerInstance.config);
        slideRef.afterClosed().subscribe(() => {
            this.originElementRemoveActiveClass(slideRef.containerInstance.config);
        });
        return slideRef as ThySlideRef<T, TResult>;
    }

    /**
     * please use open,
     * @deprecated
     * @param componentOrTemplateRef
     * @param config
     */
    show<T, TData = undefined, TResult = undefined>(
        componentOrTemplateRef: ComponentTypeOrTemplateRef<T>,
        config: ThySlideConfig
    ): ThySlideRef<T, TResult> {
        return this.open(componentOrTemplateRef, config);
    }

    /**
     * please use close,
     * @deprecated
     * @param result
     */
    hide<T>(result?: T) {
        this.close<T>(result);
    }

    ngOnDestroy() {
        this.dispose();
    }
}
