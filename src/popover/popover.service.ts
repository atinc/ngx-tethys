import {
    ComponentType,
    Overlay,
    OverlayConfig,
    OverlayRef,
    PositionStrategy,
    ScrollDispatcher
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
import { ThyPopoverContainerComponent } from './popover-container.component';
import { ThyPopoverConfig, THY_POPOVER_DEFAULT_CONFIG } from './popover.config';
import { ThyPopoverRef, ThyInternalPopoverRef } from './popover-ref';
import { Directionality } from '@angular/cdk/bidi';
import { of, Subject } from 'rxjs';
import { getFlexiblePositions, ThyUpperOverlayService, ThyUpperOverlayRef } from '../core/overlay';
import { takeUntil } from 'rxjs/operators';
import { helpers } from '../util';
import { popoverUpperOverlayOptions } from './popover.options';

@Injectable({
    providedIn: 'root'
})
export class ThyPopover extends ThyUpperOverlayService<ThyPopoverConfig, ThyPopoverContainerComponent>
    implements OnDestroy {
    private readonly ngUnsubscribe$ = new Subject();

    private originInstancesMap = new Map<
        ElementRef | HTMLElement,
        {
            config: ThyPopoverConfig;
            popoverRef: ThyPopoverRef<any, any>;
        }
    >();

    private buildPositionStrategy<TData>(config: ThyPopoverConfig<TData>): PositionStrategy {
        if (config.position) {
            const positionStrategy = this.overlay.position().global();
            return positionStrategy;
        } else {
            const positionStrategy = this.overlay.position().flexibleConnectedTo(coerceElement(config.origin));
            const positions = getFlexiblePositions(config.placement, config.offset, 'thy-popover');
            positionStrategy.withPositions(positions);
            positionStrategy.positionChanges.pipe(takeUntil(this.ngUnsubscribe$)).subscribe(change => {
                if (change.scrollableViewProperties.isOverlayClipped) {
                    // After position changes occur and the overlay is clipped by
                    // a parent scrollable then close the tooltip.
                    this.ngZone.run(() => this.close());
                }
            });
            return positionStrategy;
        }
    }

    private buildOverlayPanelClasses(config: ThyPopoverConfig) {
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

    protected buildOverlayConfig<TData>(config: ThyPopoverConfig<TData>): OverlayConfig {
        const strategy = this.buildPositionStrategy(config);
        const overlayConfig = this.buildBaseOverlayConfig(config);
        overlayConfig.positionStrategy = strategy;
        overlayConfig.scrollStrategy = config.scrollStrategy || this.overlay.scrollStrategies.block();
        overlayConfig.panelClass = this.buildOverlayPanelClasses(config);
        return overlayConfig;
    }

    protected attachUpperOverlayContainer(
        overlay: OverlayRef,
        config: ThyPopoverConfig<any>
    ): ThyPopoverContainerComponent {
        const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        const injector = new PortalInjector(userInjector || this.injector, new WeakMap([[ThyPopoverConfig, config]]));
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
    ): PortalInjector {
        const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;

        const injectionTokens = new WeakMap<any, any>([
            [ThyPopoverContainerComponent, popoverContainer],
            [ThyPopoverRef, popoverRef]
        ]);

        if (config.direction && (!userInjector || !userInjector.get<Directionality | null>(Directionality, null))) {
            injectionTokens.set(Directionality, {
                value: config.direction,
                change: of()
            });
        }

        return new PortalInjector(userInjector || this.injector, injectionTokens);
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
        @Inject(THY_POPOVER_DEFAULT_CONFIG) defaultConfig: ThyPopoverConfig,
        private scrollDispatcher: ScrollDispatcher,
        private ngZone: NgZone
    ) {
        super(popoverUpperOverlayOptions, overlay, injector, defaultConfig);
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

        const popoverRef = this.openUpperOverlay(componentOrTemplateRef, config);
        config = popoverRef.containerInstance.config;
        popoverRef.afterClosed().subscribe(() => {
            this.originElementRemoveActiveClass(config);
            this.originInstancesMap.delete(originElement);
        });

        this.originElementAddActiveClass(config);
        if (config.position) {
            popoverRef.updatePosition(config.position);
        }
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
