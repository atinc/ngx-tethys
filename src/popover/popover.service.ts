import { ComponentTypeOrTemplateRef, getFlexiblePositions, ThyAbstractOverlayRef, ThyAbstractOverlayService } from 'ngx-tethys/core';
import { FunctionProp, isFunction } from 'ngx-tethys/util';
import { of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Directionality } from '@angular/cdk/bidi';
import { coerceArray, coerceElement } from '@angular/cdk/coercion';
import {
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

import { ElementRef, Injectable, Injector, NgZone, OnDestroy, StaticProvider, inject, DOCUMENT } from '@angular/core';

import { ThyPopoverContainer } from './popover-container.component';
import { ThyInternalPopoverRef, ThyPopoverRef } from './popover-ref';
import {
    THY_POPOVER_DEFAULT_CONFIG,
    THY_POPOVER_DEFAULT_CONFIG_VALUE,
    THY_POPOVER_SCROLL_STRATEGY,
    ThyPopoverConfig
} from './popover.config';
import { popoverAbstractOverlayOptions } from './popover.options';
import { SafeAny } from 'ngx-tethys/types';

/**
 * @public
 * @order 10
 */
@Injectable()
export class ThyPopover extends ThyAbstractOverlayService<ThyPopoverConfig, ThyPopoverContainer> implements OnDestroy {
    private ngZone = inject(NgZone);
    private _viewportRuler = inject(ViewportRuler);
    private _document = inject(DOCUMENT, { optional: true })!;
    private _platform = inject(Platform);
    private _overlayContainer = inject(OverlayContainer);

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
        const positions = getFlexiblePositions(config.placement!, config.offset, 'thy-popover');
        positionStrategy.withPositions(positions);
        positionStrategy.withPush(config.canPush);
        positionStrategy.withGrowAfterOpen(true);
        positionStrategy.withTransformOriginOn('.thy-popover-container');
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
            return config.scrollStrategy!;
        } else if (this.scrollStrategy && isFunction(this.scrollStrategy)) {
            return this.scrollStrategy();
        } else {
            return this.overlay.scrollStrategies.block();
        }
    }

    protected buildOverlayConfig<TData>(config: ThyPopoverConfig<TData>): OverlayConfig {
        const positionStrategy = this.buildPositionStrategy(config);
        const overlayConfig = this.buildBaseOverlayConfig(config, 'thy-popover-panel');
        overlayConfig.positionStrategy = positionStrategy;
        overlayConfig.scrollStrategy = this.buildScrollStrategy(config);
        return overlayConfig;
    }

    protected attachOverlayContainer(overlay: OverlayRef, config: ThyPopoverConfig<any>): ThyPopoverContainer {
        const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        const injector = Injector.create({
            parent: userInjector || this.injector,
            providers: [{ provide: ThyPopoverConfig, useValue: config }]
        });
        const containerPortal = new ComponentPortal(ThyPopoverContainer, config.viewContainerRef, injector);
        const containerRef = overlay.attach<ThyPopoverContainer>(containerPortal);
        return containerRef.instance;
    }

    protected createAbstractOverlayRef<T, TResult = unknown>(
        overlayRef: OverlayRef,
        containerInstance: ThyPopoverContainer,
        config: ThyPopoverConfig
    ): ThyAbstractOverlayRef<T, ThyPopoverContainer, TResult> {
        const popoverRef = new ThyInternalPopoverRef<T, TResult>();
        popoverRef.initialize(overlayRef, containerInstance, config);
        return popoverRef;
    }

    protected createInjector<T>(config: ThyPopoverConfig, popoverRef: ThyPopoverRef<T>, popoverContainer: ThyPopoverContainer): Injector {
        const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;

        const injectionTokens: StaticProvider[] = [
            { provide: ThyPopoverContainer, useValue: popoverContainer },
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

    constructor() {
        const overlay = inject(Overlay);
        const injector = inject(Injector);
        const defaultConfig = inject(THY_POPOVER_DEFAULT_CONFIG, { optional: true })!;
        const scrollStrategy = inject<FunctionProp<ScrollStrategy>>(THY_POPOVER_SCROLL_STRATEGY);

        super(
            popoverAbstractOverlayOptions,
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

    /**
     * 打开悬浮层
     */
    open<T, TData = unknown, TResult = unknown>(
        componentOrTemplateRef: ComponentTypeOrTemplateRef<T>,
        config?: ThyPopoverConfig<TData>
    ): ThyPopoverRef<T, TResult> | undefined {
        const originElement = coerceElement(config?.origin);
        // 默认关闭之前的弹出框
        // 1. 当之前的 Popover 设置 manualClosure 为 true 时, 弹出其他 Popover 时不自动关闭 manualClosure 为 true 的 Popover
        // 2. 当前的 Origin 对应的 Popover 已经弹出，不管 manualClosure 设置为何，直接关闭并返回
        if (this.ensureCloseClosest(originElement)) {
            return;
        }

        const popoverRef = this.openOverlay<T, TResult>(componentOrTemplateRef, config) as ThyPopoverRef<T, TResult, TData>;
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

    /**
     * 根据Id获取打开的悬浮层
     */
    getPopoverById(id: string): ThyPopoverRef<any> | undefined {
        return this.getAbstractOverlayById(id) as ThyPopoverRef<any> | undefined;
    }

    /**
     * 获取已经打开的悬浮层
     */
    getOpenedPopovers(): ThyPopoverRef<SafeAny>[] {
        return this.getAbstractOverlays();
    }

    /**
     * @description.en-us Finds the closest ThyPopoverRef to an element by looking at the DOM.
     * @description 通过 Dom 元素查找最近弹出的悬浮层
     */
    getClosestPopover(element: HTMLElement): ThyPopoverRef<any> | undefined | null {
        const parent = element.closest('.thy-popover-container');

        if (parent && parent.id) {
            return this.getPopoverById(parent.id);
        }
        return null;
    }

    /**
     * 关闭悬浮层
     */
    close<T>(result?: T, force?: boolean) {
        super.close(result, force);
    }

    /**
     * @internal
     */
    ngOnDestroy() {
        this.dispose();
    }
}
