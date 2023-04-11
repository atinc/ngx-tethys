import { getFlexiblePositions, ThyAbstractOverlayService } from 'ngx-tethys/core';
import { of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Directionality } from '@angular/cdk/bidi';
import { coerceArray, coerceElement } from '@angular/cdk/coercion';
import {
    ComponentType,
    FlexibleConnectedPositionStrategy,
    Overlay,
    OverlayConfig,
    OverlayContainer,
    OverlayRef,
    PositionStrategy,
    ScrollDispatcher
} from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { ComponentPortal } from '@angular/cdk/portal';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { DOCUMENT } from '@angular/common';
import { ElementRef, Inject, Injectable, Injector, NgZone, OnDestroy, StaticProvider, TemplateRef } from '@angular/core';

import { ThyAutocompleteContainerComponent } from './autocomplete-container.component';
import { ThyAutocompleteRef, ThyInternalAutocompleteRef } from './autocomplete-ref';
import { THY_AUTOCOMPLETE_DEFAULT_CONFIG, ThyAutocompleteConfig } from './autocomplete.config';
import { autocompleteAbstractOverlayOptions } from './autocomplete.options';

/**
 * @private
 */
@Injectable()
export class ThyAutocompleteService
    extends ThyAbstractOverlayService<ThyAutocompleteConfig, ThyAutocompleteContainerComponent>
    implements OnDestroy
{
    private readonly ngUnsubscribe$ = new Subject();

    private originInstancesMap = new Map<
        ElementRef | HTMLElement,
        {
            config: ThyAutocompleteConfig;
            autocompleteRef: ThyAutocompleteRef<any, any>;
        }
    >();

    private buildPositionStrategy<TData>(config: ThyAutocompleteConfig<TData>): PositionStrategy {
        const positionStrategy = new FlexibleConnectedPositionStrategy(
            config.origin,
            this._viewportRuler,
            this._document,
            this._platform,
            this._overlayContainer
        );
        const positions = getFlexiblePositions(config.placement, config.offset, 'thy-autocomplete');
        positionStrategy.withPositions(positions);
        positionStrategy.withGrowAfterOpen(true);
        positionStrategy.positionChanges.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(change => {
            if (change.scrollableViewProperties.isOverlayClipped) {
                // After position changes occur and the overlay is clipped by
                // a parent scrollable then close the tooltip.
                this.ngZone.run(() => this.close());
            }
        });
        return positionStrategy;
    }

    protected buildOverlayConfig<TData>(config: ThyAutocompleteConfig<TData>): OverlayConfig {
        const strategy = this.buildPositionStrategy(config);
        const overlayConfig = this.buildBaseOverlayConfig(config);
        overlayConfig.positionStrategy = strategy;
        overlayConfig.scrollStrategy = config.scrollStrategy || this.overlay.scrollStrategies.block();
        overlayConfig.width = config.width;
        return overlayConfig;
    }

    protected attachOverlayContainer(overlay: OverlayRef, config: ThyAutocompleteConfig<any>): ThyAutocompleteContainerComponent {
        const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        const injector = Injector.create({
            parent: userInjector || this.injector,
            providers: [{ provide: ThyAutocompleteConfig, useValue: config }]
        });
        const containerPortal = new ComponentPortal(ThyAutocompleteContainerComponent, config.viewContainerRef, injector);
        const containerRef = overlay.attach<ThyAutocompleteContainerComponent>(containerPortal);
        return containerRef.instance;
    }

    protected createAbstractOverlayRef<T>(
        overlayRef: OverlayRef,
        containerInstance: ThyAutocompleteContainerComponent,
        config: ThyAutocompleteConfig<any>
    ): ThyInternalAutocompleteRef<T> {
        return new ThyInternalAutocompleteRef<T>(overlayRef, containerInstance, config);
    }

    protected createInjector<T>(
        config: ThyAutocompleteConfig,
        autocompleteRef: ThyAutocompleteRef<T>,
        autocompleteContainer: ThyAutocompleteContainerComponent
    ): Injector {
        const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        const injectionTokens: StaticProvider[] = [
            {
                provide: ThyAutocompleteContainerComponent,
                useValue: autocompleteContainer
            },
            {
                provide: ThyAutocompleteRef,
                useValue: autocompleteRef
            }
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

    private originElementAddActiveClass(config: ThyAutocompleteConfig) {
        if (config.originActiveClass) {
            coerceElement<HTMLElement>(config.origin).classList.add(...coerceArray(config.originActiveClass));
        }
    }

    private originElementRemoveActiveClass(config: ThyAutocompleteConfig) {
        if (config.originActiveClass) {
            coerceElement<HTMLElement>(config.origin).classList.remove(...coerceArray(config.originActiveClass));
        }
    }

    constructor(
        overlay: Overlay,
        injector: Injector,
        @Inject(THY_AUTOCOMPLETE_DEFAULT_CONFIG) defaultConfig: ThyAutocompleteConfig,
        private scrollDispatcher: ScrollDispatcher,
        private ngZone: NgZone,
        private _viewportRuler: ViewportRuler,
        @Inject(DOCUMENT) private _document: any,
        private _platform: Platform,
        private _overlayContainer: OverlayContainer
    ) {
        super(autocompleteAbstractOverlayOptions, overlay, injector, defaultConfig);
    }

    open<T, TData = any, TResult = any>(
        componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
        config?: ThyAutocompleteConfig<TData>
    ): ThyAutocompleteRef<T, TResult> {
        const originElement = coerceElement(config.origin);
        const autocompleteRef = this.openOverlay(componentOrTemplateRef, config) as ThyAutocompleteRef<T>;
        config = autocompleteRef.containerInstance.config;
        autocompleteRef.afterClosed().subscribe(() => {
            this.originElementRemoveActiveClass(config);
            this.originInstancesMap.delete(originElement);
        });

        this.originElementAddActiveClass(config);
        this.originInstancesMap.set(originElement, {
            config,
            autocompleteRef
        });

        return autocompleteRef;
    }

    ngOnDestroy() {
        this.dispose();
    }
}
