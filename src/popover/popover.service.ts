import { getFlexiblePositions, ThyAbstractOverlayService } from 'ngx-tethys/core';
import { FunctionProp, helpers, isFunction } from 'ngx-tethys/util';
import { of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Directionality } from '@angular/cdk/bidi';
import { coerceArray, coerceElement } from '@angular/cdk/coercion';
import {
    ComponentType,
    FlexibleConnectedPositionStrategy,
    FlexibleConnectedPositionStrategyOrigin,
    Overlay,
    OverlayConfig,
    OverlayContainer,
    OverlayRef,
    PositionStrategy,
    ScrollStrategy,
    ViewportRuler
} from '@angular/cdk/overlay';
import { Platform } from '@angular/cdk/platform';
import { ComponentPortal } from '@angular/cdk/portal';
import { DOCUMENT } from '@angular/common';
import { ElementRef, Inject, Injectable, Injector, NgZone, OnDestroy, Optional, StaticProvider, TemplateRef } from '@angular/core';

import { ThyPopoverContainerComponent } from './popover-container.component';
import { ThyInternalPopoverRef, ThyPopoverRef } from './popover-ref';
import {
    THY_POPOVER_DEFAULT_CONFIG,
    THY_POPOVER_DEFAULT_CONFIG_VALUE,
    THY_POPOVER_SCROLL_STRATEGY,
    ThyPopoverConfig
} from './popover.config';
import { popoverUpperOverlayOptions } from './popover.options';

@Injectable({
    providedIn: 'root'
})
export class ThyPopover extends ThyAbstractOverlayService<ThyPopoverConfig, ThyPopoverContainerComponent> implements OnDestroy {
    private readonly ngUnsubscribe$ = new Subject();

    private originInstancesMap = new Map<
        ElementRef | HTMLElement,
        {
            config: ThyPopoverConfig;
            popoverRef: ThyPopoverRef<any, any>;
        }
    >();

    private buildPositionStrategy<TData>(config: ThyPopoverConfig<TData>): PositionStrategy {
        const origin: FlexibleConnectedPositionStrategyOrigin = config.originPosition ? config.originPosition : config.origin;
        // const positionStrategy = this.overlay.position().flexibleConnectedTo(origin);
        const positionStrategy = new FlexibleConnectedPositionStrategy(
            origin,
            this._viewportRuler,
            this._document,
            this._platform,
            this._overlayContainer
        );
        const positions = getFlexiblePositions(config.placement, config.offset, 'thy-popover');
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

    private buildScrollStrategy(config: ThyPopoverConfig): ScrollStrategy {
        if (config.scrollStrategy) {
            return config.scrollStrategy;
        } else if (this.scrollStrategy && isFunction(this.scrollStrategy)) {
            return this.scrollStrategy();
        } else {
            this.overlay.scrollStrategies.block();
        }
    }

    protected buildOverlayConfig<TData>(config: ThyPopoverConfig<TData>): OverlayConfig {
        const positionStrategy = this.buildPositionStrategy(config);
        const overlayConfig = this.buildBaseOverlayConfig(config);
        overlayConfig.positionStrategy = positionStrategy;
        overlayConfig.scrollStrategy = this.buildScrollStrategy(config);
        return overlayConfig;
    }

    protected attachUpperOverlayContainer(overlay: OverlayRef, config: ThyPopoverConfig<any>): ThyPopoverContainerComponent {
        const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        const injector = Injector.create({
            parent: userInjector || this.injector,
            providers: [{ provide: ThyPopoverConfig, useValue: config }]
        });
        const containerPortal = new ComponentPortal(ThyPopoverContainerComponent, config.viewContainerRef, injector);
        const containerRef = overlay.attach<ThyPopoverContainerComponent>(containerPortal);
        return containerRef.instance;
    }

    protected createUpperOverlayRef<T>(
        overlayRef: OverlayRef,
        containerInstance: ThyPopoverContainerComponent,
        config: ThyPopoverConfig<any>
    ): ThyInternalPopoverRef<T> {
        return new ThyInternalPopoverRef<T>(overlayRef, containerInstance, config);
    }

    protected createInjector<T>(
        config: ThyPopoverConfig,
        popoverRef: ThyPopoverRef<T>,
        popoverContainer: ThyPopoverContainerComponent
    ): Injector {
        const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;

        const injectionTokens: StaticProvider[] = [
            { provide: ThyPopoverContainerComponent, useValue: popoverContainer },
            {
                provide: ThyPopoverRef,
                useValue: popoverRef
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

    private originElementAddActiveClass(config: ThyPopoverConfig) {
        if (config.originActiveClass) {
            coerceElement<HTMLElement>(config.origin).classList.add(...coerceArray(config.originActiveClass));
        }
    }

    private originElementRemoveActiveClass(config: ThyPopoverConfig) {
        if (config.originActiveClass) {
            coerceElement<HTMLElement>(config.origin).classList.remove(...coerceArray(config.originActiveClass));
        }
    }

    constructor(
        overlay: Overlay,
        injector: Injector,
        @Optional()
        @Inject(THY_POPOVER_DEFAULT_CONFIG)
        defaultConfig: ThyPopoverConfig,
        @Inject(THY_POPOVER_SCROLL_STRATEGY)
        scrollStrategy: FunctionProp<ScrollStrategy>,
        private ngZone: NgZone,
        private _viewportRuler: ViewportRuler,
        @Optional() @Inject(DOCUMENT) private _document: any,
        private _platform: Platform,
        private _overlayContainer: OverlayContainer
    ) {
        super(
            popoverUpperOverlayOptions,
            overlay,
            injector,
            {
                ...THY_POPOVER_DEFAULT_CONFIG_VALUE,
                ...defaultConfig
            },
            scrollStrategy
        );
    }

    private ensureCloseClosest(origin: HTMLElement) {
        let closeAndEnd = false;
        this.originInstancesMap.forEach((value, key) => {
            if (value.config.manualClosure) {
                if (key === origin) {
                    value.popoverRef.close();
                    closeAndEnd = true;
                }
            } else {
                if (key === origin) {
                    closeAndEnd = true;
                }
                value.popoverRef.close();
            }
        });
        return closeAndEnd;
    }

    open<T, TData = any, TResult = any>(
        componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
        config?: ThyPopoverConfig<TData>
    ): ThyPopoverRef<T, TResult> {
        const originElement = coerceElement(config.origin);
        // 默认关闭之前的弹出框
        // 1. 当之前的 Popover 设置 manualClosure 为 true 时, 弹出其他 Popover 时不自动关闭 manualClosure 为 true 的 Popover
        // 2. 当前的 Origin 对应的 Popover 已经弹出，不管 manualClosure 设置为何，直接关闭并返回
        if (this.ensureCloseClosest(originElement)) {
            return;
        }

        const popoverRef = this.openUpperOverlay(componentOrTemplateRef, config) as ThyPopoverRef<T>;
        config = popoverRef.containerInstance.config;
        popoverRef.afterClosed().subscribe(() => {
            this.originElementRemoveActiveClass(config);
            this.originInstancesMap.delete(originElement);
        });

        this.originElementAddActiveClass(config);
        this.originInstancesMap.set(originElement, {
            config,
            popoverRef
        });

        return popoverRef;
    }

    ngOnDestroy() {
        this.dispose();
    }
}
