import {
    ComponentType,
    Overlay,
    OverlayConfig,
    OverlayRef,
    PositionStrategy,
    ScrollDispatcher,
    OverlayContainer
} from '@angular/cdk/overlay';
import {
    TemplateRef,
    ViewContainerRef,
    Injectable,
    ElementRef,
    Injector,
    OnDestroy,
    Inject,
    NgZone
} from '@angular/core';
import { coerceElement, coerceArray } from '@angular/cdk/coercion';
import { PortalInjector, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { ThyAutocompleteContainerComponent } from './autocomplete-container.component';
import { ThyAutocompleteConfig, THY_AUTOCOMPLETE_DEFAULT_CONFIG } from './autocomplete.config';
import { ThyAutocompleteRef, ThyInternalAutocompleteRef } from './autocomplete-ref';
import { Directionality } from '@angular/cdk/bidi';
import { of, Subject } from 'rxjs';
import { getFlexiblePositions, ThyUpperOverlayService, ThyUpperOverlayRef } from '../../core/overlay';
import { takeUntil } from 'rxjs/operators';
import { helpers } from '../../util';
import { autocompleteUpperOverlayOptions } from './autocomplete.options';
import { ViewportRuler } from '@angular/cdk/scrolling';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import {
    FlexibleConnectedPositionStrategy,
    FlexibleConnectedPositionStrategyOrigin
} from '../../core/overlay/position/flexible-connected-position-strategy';

@Injectable({
    providedIn: 'root'
})
export class ThyAutocompleteService
    extends ThyUpperOverlayService<ThyAutocompleteConfig, ThyAutocompleteContainerComponent>
    implements OnDestroy {
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

    private buildOverlayPanelClasses(config: ThyAutocompleteConfig) {
        let classes = [`cdk-overlay-pane`];
        if (config.panelClass) {
            if (helpers.isArray(config.panelClass)) {
                classes = classes.concat(config.panelClass);
            } else {
                classes.push(config.panelClass as string);
            }
        }
        return classes;
    }

    protected buildOverlayConfig<TData>(config: ThyAutocompleteConfig<TData>): OverlayConfig {
        const strategy = this.buildPositionStrategy(config);
        const overlayConfig = this.buildBaseOverlayConfig(config);
        overlayConfig.positionStrategy = strategy;
        overlayConfig.scrollStrategy = config.scrollStrategy || this.overlay.scrollStrategies.block();
        overlayConfig.width = config.width;
        overlayConfig.panelClass = this.buildOverlayPanelClasses(config);
        return overlayConfig;
    }

    protected attachUpperOverlayContainer(
        overlay: OverlayRef,
        config: ThyAutocompleteConfig<any>
    ): ThyAutocompleteContainerComponent {
        const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        const injector = new PortalInjector(
            userInjector || this.injector,
            new WeakMap([[ThyAutocompleteConfig, config]])
        );
        const containerPortal = new ComponentPortal(
            ThyAutocompleteContainerComponent,
            config.viewContainerRef,
            injector
        );
        const containerRef = overlay.attach<ThyAutocompleteContainerComponent>(containerPortal);
        return containerRef.instance;
    }

    protected createUpperOverlayRef<T>(
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
    ): PortalInjector {
        const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;

        const injectionTokens = new WeakMap<any, any>([
            [ThyAutocompleteContainerComponent, autocompleteContainer],
            [ThyAutocompleteRef, autocompleteRef]
        ]);

        if (config.direction && (!userInjector || !userInjector.get<Directionality | null>(Directionality, null))) {
            injectionTokens.set(Directionality, {
                value: config.direction,
                change: of()
            });
        }

        return new PortalInjector(userInjector || this.injector, injectionTokens);
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
        super(autocompleteUpperOverlayOptions, overlay, injector, defaultConfig);
    }

    open<T, TData = any, TResult = any>(
        componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
        config?: ThyAutocompleteConfig<TData>
    ): ThyAutocompleteRef<T, TResult> {
        const originElement = coerceElement(config.origin);
        const autocompleteRef = this.openUpperOverlay(componentOrTemplateRef, config) as ThyAutocompleteRef<T>;
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
