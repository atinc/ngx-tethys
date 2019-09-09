import { ViewContainerRef, Injector, TemplateRef, EmbeddedViewRef, ComponentRef } from '@angular/core';
import { Direction } from '@angular/cdk/bidi';
import { Overlay, ComponentType, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ThyClickPositioner } from '../click-positioner';
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
    private openedOverlays: ThyUpperOverlayRef<any>[] = [];

    private readonly _afterAllClosed = new Subject<void>();

    private readonly _afterOpened = new Subject<ThyUpperOverlayRef<any>>();

    constructor(
        protected options: ThyUpperOverlayOptions, // component name, e.g: dialog | popover | slide
        protected overlay: Overlay,
        protected injector: Injector,
        protected defaultConfig: TConfig,
        protected clickPositioner: ThyClickPositioner
    ) {}

    // build cdk overlay config by config
    protected abstract buildOverlayConfig(config: TConfig): OverlayConfig;

    protected abstract attachUpperOverlayContainer(overlay: OverlayRef, config: TConfig): TContainer;

    protected abstract createUpperOverlayRef<T>(
        overlayRef: OverlayRef,
        containerInstance: TContainer,
        config: TConfig
    ): ThyUpperOverlayRef<T>;

    protected abstract createInjector<T>(
        config: TConfig,
        overlayRef: ThyUpperOverlayRef<T>,
        containerInstance: TContainer
    ): PortalInjector;

    protected attachDialogContent<T, TResult>(
        componentOrTemplateRef: ComponentTypeOrTemplateRef<T>,
        containerInstance: TContainer,
        overlayRef: OverlayRef,
        config: TConfig
    ): ThyUpperOverlayRef<T, TResult> {
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
                    upperOverlayRef
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

    protected removeOpenedOverlay(upperOverlayRef: ThyUpperOverlayRef<any>) {
        const index = this.openedOverlays.indexOf(upperOverlayRef);

        if (index > -1) {
            this.openedOverlays.splice(index, 1);

            if (!this.openedOverlays.length) {
                this._afterAllClosed.next();
            }
        }
    }

    protected getUpperOverlayById(id: string): ThyUpperOverlayRef<any> | undefined {
        return this.openedOverlays.find(overlay => overlay.id === id);
    }

    protected openUpperOverlay<T, TData = undefined, TResult = undefined>(
        componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
        config?: TConfig
    ): ThyUpperOverlayRef<T, TResult> {
        config = { ...this.defaultConfig, ...config };
        if (config.id && this.getUpperOverlayById(config.id)) {
            throw Error(
                `${this.options.name} with id ${config.id} exists already. The ${this.options.name} id must be unique.`
            );
        }
        const overlayConfig: OverlayConfig = this.buildOverlayConfig(config);
        const overlayRef = this.overlay.create(overlayConfig);

        const dialogContainer = this.attachUpperOverlayContainer(overlayRef, config);
        const dialogRef = this.attachDialogContent<T, TResult>(
            componentOrTemplateRef,
            dialogContainer,
            overlayRef,
            config
        );

        this.openedOverlays.push(dialogRef);
        dialogRef.afterClosed().subscribe(() => this.removeOpenedOverlay(dialogRef));
        this._afterOpened.next(dialogRef);

        return dialogRef;
    }

    abstract open<T, TData = undefined, TResult = undefined>(
        componentOrTemplateRef: ComponentTypeOrTemplateRef<T>,
        config?: ThyUpperOverlayConfig<TData>
    ): ThyUpperOverlayRef<T, TResult>;

    afterAllClosed() {
        return this._afterAllClosed;
    }

    afterOpened() {
        return this._afterOpened;
    }
}
