import { FunctionProp, concatArray } from 'ngx-tethys/util';
import { Subject } from 'rxjs';

import { ComponentType, Overlay, OverlayConfig, OverlayRef, ScrollStrategy } from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { Injector, TemplateRef } from '@angular/core';

import { ThyAbstractOverlayContainer } from './abstract-overlay-container';
import { ThyAbstractOverlayRef } from './abstract-overlay-ref';
import { ThyAbstractOverlayConfig, ThyUpperOverlayOptions } from './abstract-overlay.config';

export type ComponentTypeOrTemplateRef<T> = ComponentType<T> | TemplateRef<T>;

export abstract class ThyAbstractOverlayService<TConfig extends ThyAbstractOverlayConfig, TContainer extends ThyAbstractOverlayContainer> {
    private openedOverlays: ThyAbstractOverlayRef<unknown, TContainer>[] = [];

    private readonly _afterAllClosed = new Subject<void>();

    private readonly _afterOpened = new Subject<ThyAbstractOverlayRef<any, TContainer>>();

    constructor(
        protected options: ThyUpperOverlayOptions, // component name, e.g: dialog | popover | slide
        protected overlay: Overlay,
        protected injector: Injector,
        protected defaultConfig: TConfig,
        public scrollStrategy?: FunctionProp<ScrollStrategy>
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
    ): ThyAbstractOverlayRef<T, TContainer>;

    /** Create injector for component content */
    protected abstract createInjector<T>(
        config: TConfig,
        overlayRef: ThyAbstractOverlayRef<T, TContainer>,
        containerInstance: TContainer
    ): Injector;

    abstract open<T, TData = undefined, TResult = undefined>(
        componentOrTemplateRef: ComponentTypeOrTemplateRef<T>,
        config?: ThyAbstractOverlayConfig<TData>
    ): ThyAbstractOverlayRef<T, TContainer, TResult>;

    /** Attach component or template ref to overlay container */
    protected attachUpperOverlayContent<T, TResult>(
        componentOrTemplateRef: ComponentTypeOrTemplateRef<T>,
        containerInstance: TContainer,
        overlayRef: OverlayRef,
        config: TConfig
    ): ThyAbstractOverlayRef<T, TContainer, TResult> {
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
            const contentRef = containerInstance.attachComponentPortal<T>(new ComponentPortal(componentOrTemplateRef, undefined, injector));
            if (config.initialState) {
                Object.assign(contentRef.instance, config.initialState);
            }
            upperOverlayRef.componentInstance = contentRef.instance;
        }

        return upperOverlayRef;
    }

    protected removeOpenedOverlay(upperOverlayRef: ThyAbstractOverlayRef<any, TContainer>) {
        const index = this.openedOverlays.indexOf(upperOverlayRef);

        if (index > -1) {
            this.openedOverlays.splice(index, 1);

            if (!this.openedOverlays.length) {
                this._afterAllClosed.next();
            }
        }
    }

    protected getUpperOverlayById(id: string): ThyAbstractOverlayRef<any, TContainer> | undefined {
        return this.openedOverlays.find(overlay => overlay.id === id);
    }

    protected buildBaseOverlayConfig(config: TConfig, defaultPanelClass?: string | string[]): OverlayConfig {
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

        overlayConfig.panelClass = concatArray(config.panelClass, defaultPanelClass);

        return overlayConfig;
    }

    protected openUpperOverlay<T, TResult = any>(
        componentOrTemplateRef: ComponentTypeOrTemplateRef<T>,
        config?: TConfig
    ): ThyAbstractOverlayRef<T, TContainer, TResult> {
        config = { ...this.defaultConfig, ...config };
        if (config.id && this.getUpperOverlayById(config.id)) {
            throw Error(`${this.options.name} with id ${config.id} exists already. The ${this.options.name} id must be unique.`);
        }
        const overlayConfig: OverlayConfig = this.buildOverlayConfig(config);
        const overlayRef = this.overlay.create(overlayConfig);

        const overlayContainer = this.attachUpperOverlayContainer(overlayRef, config);
        const upperOverlayRef = this.attachUpperOverlayContent<T, TResult>(componentOrTemplateRef, overlayContainer, overlayRef, config);

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
