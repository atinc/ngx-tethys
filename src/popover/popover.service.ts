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
import { ThyPopoverRef, ThyPopoverRefInternal } from './popover-ref';
import { Directionality } from '@angular/cdk/bidi';
import { of, Subject } from 'rxjs';
import { getFlexiblePositions } from '../core/overlay';
import { takeUntil } from 'rxjs/operators';
import { helpers } from '../util';

@Injectable({
    providedIn: 'root'
})
export class ThyPopover implements OnDestroy {
    private originInstancesMap = new Map<
        ElementRef | HTMLElement,
        {
            config: ThyPopoverConfig;
            popoverRef: ThyPopoverRef<any, any>;
        }
    >();

    private originInstancesSteps: Array<ElementRef | HTMLElement> = [];

    private currentPopoverRef: ThyPopoverRef<any, any>;

    private readonly _afterOpened = new Subject<ThyPopoverRef<any>>();

    private readonly ngUnsubscribe$ = new Subject();

    private buildPositionStrategy<TData>(config: ThyPopoverConfig<TData>): PositionStrategy {
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

    private buildOverlayConfig<TData>(config: ThyPopoverConfig<TData>): OverlayConfig {
        const strategy = this.buildPositionStrategy(config);
        const overlayConfig = new OverlayConfig({
            positionStrategy: strategy,
            scrollStrategy: this.overlay.scrollStrategies.block(),
            panelClass: this.buildOverlayPanelClasses(config),
            hasBackdrop: config.hasBackdrop,
            direction: config.direction,
            minWidth: config.minWidth,
            minHeight: config.minHeight,
            maxWidth: config.maxWidth,
            maxHeight: config.maxHeight,
            disposeOnNavigation: config.closeOnNavigation
        });

        if (config.backdropClass) {
            overlayConfig.backdropClass = config.backdropClass;
        }

        return overlayConfig;
    }

    private attachPopoverContainer(overlay: OverlayRef, config: ThyPopoverConfig): ThyPopoverContainerComponent {
        const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        const injector = new PortalInjector(userInjector || this.injector, new WeakMap([[ThyPopoverConfig, config]]));
        const containerPortal = new ComponentPortal(ThyPopoverContainerComponent, config.viewContainerRef, injector);
        const containerRef = overlay.attach<ThyPopoverContainerComponent>(containerPortal);
        return containerRef.instance;
    }

    private createInjector<T>(
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

    private attachPopoverContent<T, TResult>(
        componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
        popoverContainer: ThyPopoverContainerComponent,
        overlayRef: OverlayRef,
        config: ThyPopoverConfig
    ): ThyPopoverRef<T, TResult> {
        const popoverRef = new ThyPopoverRefInternal<T, TResult>(overlayRef, popoverContainer);
        // When the popover backdrop is clicked, we want to close it.
        overlayRef.backdropClick().subscribe(() => {
            if (popoverRef.backdropClosable) {
                popoverRef.close();
            }
        });
        overlayRef
            .detachments()
            .pipe()
            .subscribe(() => {
                if (overlayRef && overlayRef.hasAttached()) {
                    overlayRef.detach();
                }
            });

        if (componentOrTemplateRef instanceof TemplateRef) {
            popoverContainer.attachTemplatePortal(
                new TemplatePortal<T>(componentOrTemplateRef, null, <any>{
                    $implicit: config.initialState,
                    popoverRef
                })
            );
        } else {
            const injector = this.createInjector<T>(config, popoverRef, popoverContainer);
            const contentRef = popoverContainer.attachComponentPortal<T>(
                new ComponentPortal(componentOrTemplateRef, undefined, injector)
            );
            if (config.initialState) {
                Object.assign(contentRef.instance, config.initialState);
            }
            popoverRef.componentInstance = contentRef.instance;
        }

        // dialogRef.updateSizeAndPosition(config.width, config.height, config.position);
        return popoverRef;
    }

    private originElementAddActivatedClass(config: ThyPopoverConfig) {
        coerceElement<HTMLElement>(config.origin).classList.add(...coerceArray(config.originActivatedClass));
    }

    private originElementDeleteActivatedClass(config: ThyPopoverConfig) {
        coerceElement<HTMLElement>(config.origin).classList.remove(...coerceArray(config.originActivatedClass));
    }

    constructor(
        private overlay: Overlay,
        private injector: Injector,
        @Inject(THY_POPOVER_DEFAULT_CONFIG) private defaultConfig: ThyPopoverConfig,
        private scrollDispatcher: ScrollDispatcher,
        private ngZone: NgZone
    ) {}

    open<T, TData = any, TResult = any>(
        componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
        config?: ThyPopoverConfig<TData>
    ): ThyPopoverRef<T, TResult> {
        let isOpenAgain = false;
        this.originInstancesMap.forEach((value, key) => {
            if (value.config.manualClosure) {
                if (key === config.origin) {
                    value.popoverRef.close();
                    isOpenAgain = true;
                }
            } else {
                if (key === config.origin) {
                    isOpenAgain = true;
                }
                value.popoverRef.close();
            }
        });
        if (isOpenAgain) {
            // Open again will be close
            return;
        }

        config = { ...this.defaultConfig, ...config };
        const overlayConfig = this.buildOverlayConfig(config);
        const overlayRef = this.overlay.create(overlayConfig);
        const popoverContainer = this.attachPopoverContainer(overlayRef, config);
        const popoverRef = this.attachPopoverContent<T, TResult>(
            componentOrTemplateRef,
            popoverContainer,
            overlayRef,
            config
        );

        this.currentPopoverRef = popoverRef;

        popoverRef.afterClosed().subscribe(() => {
            this.currentPopoverRef = null;
            this.originElementDeleteActivatedClass(config);
            this.originInstancesMap.delete(config.origin);
        });

        this.originElementAddActivatedClass(config);

        this.originInstancesSteps.push(config.origin);

        this.originInstancesMap.set(config.origin, {
            config,
            popoverRef
        });

        this._afterOpened.next(popoverRef);
        return popoverRef;
    }

    close() {
        if (this.currentPopoverRef) {
            this.currentPopoverRef.close();
        }
    }

    closeAll() {
        this.originInstancesMap.forEach((value, key) => {
            value.popoverRef.close();
        });
    }

    closeLast(stepLength: number = 1) {
        let hadCloseAnyone = false;
        while (stepLength > 0) {
            const last = this.originInstancesSteps.pop();
            const find = this.originInstancesMap.get(last);
            if (find) {
                find.popoverRef.close();
                hadCloseAnyone = true;
            }
            stepLength--;
        }
        return hadCloseAnyone;
    }

    ngOnDestroy() {
        this._afterOpened.complete();
    }
}
