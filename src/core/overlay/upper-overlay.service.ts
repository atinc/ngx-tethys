import { ViewContainerRef, Injector, TemplateRef, EmbeddedViewRef, ComponentRef } from '@angular/core';
import { Direction } from '@angular/cdk/bidi';
import { Overlay, ComponentType, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { PortalInjector, ComponentPortal, TemplatePortal, CdkPortalOutlet } from '@angular/cdk/portal';
import { Observable, Subject } from 'rxjs';
import { ThyUpperOverlayConfig, ThyUpperOverlayOptions } from './upper-overlay.config';
import { ThyUpperOverlayRef } from './upper-overlay-ref';
import { ThyUpperOverlayContainer } from './upper-overlay-container';

export type ComponentTypeOrTemplateRef<T> = ComponentType<T> | TemplateRef<T>;

export abstract class ThyUpperOverlayService<
    TConfig extends ThyUpperOverlayConfig,
    TContainer extends ThyUpperOverlayContainer
> {
    private openedOverlays: ThyUpperOverlayRef<any, TContainer>[] = [];

    private readonly _afterAllClosed = new Subject<void>();

    private readonly _afterOpened = new Subject<ThyUpperOverlayRef<any, TContainer>>();

    constructor(
        protected options: ThyUpperOverlayOptions, // component name, e.g: dialog | popover | slide
        protected overlay: Overlay,
        protected injector: Injector,
        protected defaultConfig: TConfig
    ) {}

    /** Build cdk overlay config by config */
    protected abstract buildOverlayConfig(config: TConfig): OverlayConfig;

    /** Attach overlay container to overlay*/
    protected abstract attachUpperOverlayContainer(overlay: OverlayRef, config: TConfig): TContainer;

    /** Create upper overlay ref by cdk overlay, container and config  */
    protected abstract createUpperOverlayRef<T>(
        overlayRef: OverlayRef,
        containerInstance: TContainer,
        config: TConfig
    ): ThyUpperOverlayRef<T, TContainer>;

    /** Create injector for component content */
    protected abstract createInjector<T>(
        config: TConfig,
        overlayRef: ThyUpperOverlayRef<T, TContainer>,
        containerInstance: TContainer
    ): PortalInjector;

    abstract open<T, TData = undefined, TResult = undefined>(
        componentOrTemplateRef: ComponentTypeOrTemplateRef<T>,
        config?: ThyUpperOverlayConfig<TData>
    ): ThyUpperOverlayRef<T, TContainer, TResult>;

    /** Attach component or template ref to overlay container */
    protected attachUpperOverlayContent<T, TResult>(
        componentOrTemplateRef: ComponentTypeOrTemplateRef<T>,
        containerInstance: TContainer,
        overlayRef: OverlayRef,
        config: TConfig
    ): ThyUpperOverlayRef<T, TContainer, TResult> {
        // Create a reference to the dialog we're creating in order to give the user a handle
        // to modify and close it.
        const upperOverlayRef = this.createUpperOverlayRef<T>(overlayRef, containerInstance, config);

        // When the backdrop is clicked, we want to close it.
        if (config.hasBackdrop) {
            overlayRef.backdropClick().subscribe(() => {
                if (upperOverlayRef.backdropClosable) {
                    upperOverlayRef.close();
                }
            });
        }

        if (componentOrTemplateRef instanceof TemplateRef) {
            containerInstance.attachTemplatePortal(
                new TemplatePortal<T>(componentOrTemplateRef, null, <any>{
                    $implicit: config.initialState,
                    [`${this.options.name}Ref`]: upperOverlayRef
                })
            );
        } else {
            const injector = this.createInjector<T>(config, upperOverlayRef, containerInstance);
            const contentRef = containerInstance.attachComponentPortal<T>(
                new ComponentPortal(componentOrTemplateRef, undefined, injector)
            );
            if (config.initialState) {
                Object.assign(contentRef.instance, config.initialState);
            }
            upperOverlayRef.componentInstance = contentRef.instance;
        }

        return upperOverlayRef;
    }

    protected removeOpenedOverlay(upperOverlayRef: ThyUpperOverlayRef<any, TContainer>) {
        const index = this.openedOverlays.indexOf(upperOverlayRef);

        if (index > -1) {
            this.openedOverlays.splice(index, 1);

            if (!this.openedOverlays.length) {
                this._afterAllClosed.next();
            }
        }
    }

    protected getUpperOverlayById(id: string): ThyUpperOverlayRef<any, TContainer> | undefined {
        return this.openedOverlays.find(overlay => overlay.id === id);
    }

    protected buildBaseOverlayConfig(config: TConfig): OverlayConfig {
        const overlayConfig = new OverlayConfig({
            positionStrategy: this.overlay.position().global(),
            hasBackdrop: config.hasBackdrop,
            direction: config.direction,
            width: config.width,
            height: config.height,
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

    protected openUpperOverlay<T, TResult = any>(
        componentOrTemplateRef: ComponentTypeOrTemplateRef<T>,
        config?: TConfig
    ): ThyUpperOverlayRef<T, TContainer, TResult> {
        config = { ...this.defaultConfig, ...config };
        if (config.id && this.getUpperOverlayById(config.id)) {
            throw Error(
                `${this.options.name} with id ${config.id} exists already. The ${this.options.name} id must be unique.`
            );
        }
        const overlayConfig: OverlayConfig = this.buildOverlayConfig(config);
        const overlayRef = this.overlay.create(overlayConfig);

        const overlayContainer = this.attachUpperOverlayContainer(overlayRef, config);
        const upperOverlayRef = this.attachUpperOverlayContent<T, TResult>(
            componentOrTemplateRef,
            overlayContainer,
            overlayRef,
            config
        );

        this.openedOverlays.push(upperOverlayRef);
        upperOverlayRef.afterClosed().subscribe(() => {
            this.removeOpenedOverlay(upperOverlayRef);
        });
        this._afterOpened.next(upperOverlayRef);

        return upperOverlayRef;
    }

    afterAllClosed() {
        return this._afterAllClosed;
    }

    afterOpened() {
        return this._afterOpened;
    }

    close<T>(result?: T) {
        if (this.openedOverlays.length > 0) {
            const lastOverlayRef = this.openedOverlays[this.openedOverlays.length - 1];
            if (lastOverlayRef) {
                lastOverlayRef.close(result);
            }
        }
    }

    closeAll() {
        let i = this.openedOverlays.length;
        while (i--) {
            // 不需要操作 openedOverlays, 因为 close 会触发 afterClosed 的订阅
            // 触发订阅后会自动从 openedOverlays 中移除
            this.openedOverlays[i].close();
        }
    }

    dispose(): void {
        this.closeAll();
        this._afterAllClosed.complete();
        this._afterOpened.complete();
    }
}
