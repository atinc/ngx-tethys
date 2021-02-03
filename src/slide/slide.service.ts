import { Injectable, Injector, Optional, Inject, OnDestroy, ElementRef } from '@angular/core';
import { ThySlideContainerComponent } from './slide-container.component';
import { OverlayConfig, OverlayRef, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ThyUpperOverlayService, ThyUpperOverlayRef, ComponentTypeOrTemplateRef } from 'ngx-tethys/core';
import { ThySlideConfig, THY_SLIDE_DEFAULT_CONFIG, slideUpperOverlayOptions, slideDefaultConfigValue } from './slide.config';
import { ThySlideRef, ThyInternalSlideRef } from './slide-ref.service';
import { Directionality } from '@angular/cdk/bidi';
import { of } from 'rxjs';
import { coerceArray } from 'ngx-tethys/util';
import { coerceElement } from '@angular/cdk/coercion';
import { StaticProvider } from '@angular/core';

@Injectable()
export class ThySlideService extends ThyUpperOverlayService<ThySlideConfig, ThySlideContainerComponent> implements OnDestroy {
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

    private getOverlayPanelClasses(slideConfig: ThySlideConfig) {
        const classes: string[] = ['thy-slide-overlay-pane', `thy-slide-${slideConfig.from}`];
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
        config.id = config.id || (config.key as string);
        const overlayConfig = {
            ...this.buildBaseOverlayConfig(config),
            width: config.width,
            panelClass: this.getOverlayPanelClasses(config)
        };
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
    ): ThyUpperOverlayRef<T, ThySlideContainerComponent, any> {
        return new ThyInternalSlideRef(overlayRef, containerInstance, config);
    }

    protected createInjector<T>(
        config: ThySlideConfig,
        overlayRef: ThyUpperOverlayRef<T, ThySlideContainerComponent, any>,
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
