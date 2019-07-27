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
import { coerceElement } from '@angular/cdk/coercion';
import { PortalInjector, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { ThyPopoverContainerComponent } from './popover-container.component';
import { ThyPopoverConfig, THY_POPOVER_DEFAULT_CONFIG } from './popover.config';
import { ThyPopoverRef, ThyPopoverRefInternal } from './popover-ref';
import { Directionality } from '@angular/cdk/bidi';
import { of, Subject } from 'rxjs';
import { POSITION_MAP, getConnectedPositionOffset, getFlexiblePositions } from '../core/overlay';
import { takeUntil } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ThyPopover implements OnDestroy {
    private currentPopoverRef: ThyPopoverRef<any, any>;

    private readonly _afterOpened = new Subject<ThyPopoverRef<any>>();

    private readonly ngUnsubscribe$ = new Subject();

    private buildPositionStrategy<TData>(config: ThyPopoverConfig<TData>): PositionStrategy {
        const positionStrategy = this.overlay.position().flexibleConnectedTo(coerceElement(config.target));
        const positions = getFlexiblePositions(config.placement, config.offset);
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

    private buildOverlayConfig<TData>(config: ThyPopoverConfig<TData>): OverlayConfig {
        const strategy = this.buildPositionStrategy(config);
        const overlayConfig = new OverlayConfig({
            positionStrategy: strategy,
            scrollStrategy: this.overlay.scrollStrategies.block(),
            // panelClass: this.getOverlayPanelClasses(dialogConfig),
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
        if (this.currentPopoverRef) {
            this.currentPopoverRef.close();
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
        });

        this._afterOpened.next(popoverRef);
        return popoverRef;
    }

    // attach<T, TData = any, TResult = any>(
    //     overlayRef: OverlayRef,
    //     componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
    //     config?: ThyPopoverConfig<TData>
    // ) {
    //     config = { ...this.defaultConfig, ...config };
    //     const popoverContainer = this.attachPopoverContainer(overlayRef, config);
    //     const popoverRef = this.attachPopoverContent<T, TResult>(
    //         componentOrTemplateRef,
    //         popoverContainer,
    //         overlayRef,
    //         config
    //     );

    //     this.currentPopoverRef = popoverRef;

    //     popoverRef.afterClosed().subscribe(() => {
    //         this.currentPopoverRef = null;
    //     });

    //     this._afterOpened.next(popoverRef);
    //     return popoverRef;
    // }

    close() {
        if (this.currentPopoverRef) {
            this.currentPopoverRef.close();
        }
    }

    ngOnDestroy() {
        this._afterOpened.complete();
    }
}
