import { coerceArray, concatArray, FunctionProp, keyBy } from 'ngx-tethys/util';
import { Subject } from 'rxjs';

import { ComponentType, Overlay, OverlayConfig, OverlayRef, ScrollStrategy } from '@angular/cdk/overlay';
import { ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { Injector, reflectComponentType, TemplateRef } from '@angular/core';

import { SafeAny } from 'ngx-tethys/types';
import { ThyAbstractOverlayContainer } from './abstract-overlay-container';
import { ThyAbstractOverlayRef } from './abstract-overlay-ref';
import { ThyAbstractOverlayConfig, ThyAbstractOverlayOptions } from './abstract-overlay.config';

export type ComponentTypeOrTemplateRef<T> = ComponentType<T> | TemplateRef<T>;

export abstract class ThyAbstractOverlayService<TConfig extends ThyAbstractOverlayConfig, TContainer extends ThyAbstractOverlayContainer> {
    protected openedOverlays: ThyAbstractOverlayRef<unknown, TContainer>[] = [];

    private readonly _afterAllClosed = new Subject<void>();

    private readonly _afterOpened = new Subject<ThyAbstractOverlayRef<any, TContainer>>();

    constructor(
        protected options: ThyAbstractOverlayOptions, // component name, e.g: dialog | popover | slide
        protected overlay: Overlay,
        protected injector: Injector,
        protected defaultConfig: TConfig,
        public scrollStrategy?: FunctionProp<ScrollStrategy>
    ) {}

    /** Build cdk overlay config by config */
    protected abstract buildOverlayConfig(config: TConfig): OverlayConfig;

    /** Attach overlay container to overlay*/
    protected abstract attachOverlayContainer(overlay: OverlayRef, config: TConfig): TContainer;

    /** Create abstract overlay ref by cdk overlay, container and config  */
    protected abstract createAbstractOverlayRef<T, TResult>(
        overlayRef: OverlayRef,
        containerInstance: TContainer,
        config: TConfig
    ): ThyAbstractOverlayRef<T, TContainer, TResult>;

    /** Create injector for component content */
    protected abstract createInjector<T>(
        config: TConfig,
        overlayRef: ThyAbstractOverlayRef<T, TContainer>,
        containerInstance: TContainer
    ): Injector;

    /** Attach component or template ref to overlay container */
    protected attachOverlayContent<T, TResult>(
        componentOrTemplateRef: ComponentTypeOrTemplateRef<T>,
        containerInstance: TContainer,
        overlayRef: OverlayRef,
        config: TConfig
    ): ThyAbstractOverlayRef<T, TContainer, TResult> {
        // Create a reference to the overlay we're creating in order to give the user a handle
        // to modify and close it.
        const abstractOverlayRef = this.createAbstractOverlayRef<T, TResult>(overlayRef, containerInstance, config);

        // When the backdrop is clicked, we want to close it.
        if (config.hasBackdrop) {
            overlayRef.backdropClick().subscribe(() => {
                if (
                    (abstractOverlayRef.disableClose !== undefined && !abstractOverlayRef.disableClose) ||
                    abstractOverlayRef.backdropClosable
                ) {
                    this.close();
                }
            });
        }

        if (componentOrTemplateRef instanceof TemplateRef) {
            containerInstance.attachTemplatePortal(
                new TemplatePortal<T>(componentOrTemplateRef, null, ({
                    $implicit: config.initialState,
                    [`${this.options.name}Ref`]: abstractOverlayRef
                } as any))
            );
        } else {
            const injector = this.createInjector<T>(config, abstractOverlayRef, containerInstance);
            const contentRef = containerInstance.attachComponentPortal<T>(
                new ComponentPortal(componentOrTemplateRef, config.viewContainerRef, injector, config.projectableNodes)
            );
            if (config.initialState) {
                const metadata = reflectComponentType(componentOrTemplateRef);
                const inputsByTemplateName = keyBy(metadata.inputs as SafeAny, 'templateName');
                const inputsByPropName = keyBy(metadata.inputs as SafeAny, 'propName');
                Object.keys(config.initialState).forEach(key => {
                    const value = (config.initialState as SafeAny)[key];
                    const input: { templateName?: string; propName?: string } = inputsByTemplateName[key] || inputsByPropName[key];
                    if (input) {
                        contentRef.setInput(input.templateName, value);
                    } else {
                        (contentRef.instance as SafeAny)[key] = value;
                    }
                });
            }
            if (config.hostClass) {
                const hostClass = coerceArray(config.hostClass);
                contentRef.location.nativeElement.classList.add(...hostClass);
            }
            abstractOverlayRef.componentInstance = contentRef.instance;
        }

        return abstractOverlayRef;
    }

    protected removeOpenedOverlay(overlayRef: ThyAbstractOverlayRef<any, TContainer>) {
        const index = this.openedOverlays.indexOf(overlayRef);

        if (index > -1) {
            this.openedOverlays.splice(index, 1);

            if (!this.openedOverlays.length) {
                this._afterAllClosed.next();
            }
        }
    }

    protected getAbstractOverlayById(id: string): ThyAbstractOverlayRef<any, TContainer> | undefined {
        return this.openedOverlays.find(overlay => overlay.id === id);
    }

    protected getAbstractOverlays(): ThyAbstractOverlayRef<any, TContainer>[] {
        return this.openedOverlays;
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

    protected openOverlay<T, TResult = unknown>(
        componentOrTemplateRef: ComponentTypeOrTemplateRef<T>,
        config?: TConfig
    ): ThyAbstractOverlayRef<T, TContainer, TResult> {
        config = { ...this.defaultConfig, ...config };
        if (config.id && this.getAbstractOverlayById(config.id)) {
            throw Error(`${this.options.name} with id ${config.id} exists already. The ${this.options.name} id must be unique.`);
        }
        const overlayConfig: OverlayConfig = this.buildOverlayConfig(config);
        const overlayRef = this.overlay.create(overlayConfig);

        const overlayContainer = this.attachOverlayContainer(overlayRef, config);
        const abstractOverlayRef = this.attachOverlayContent<T, TResult>(componentOrTemplateRef, overlayContainer, overlayRef, config);

        this.openedOverlays.push(abstractOverlayRef);
        abstractOverlayRef.afterClosed().subscribe(() => {
            this.removeOpenedOverlay(abstractOverlayRef);
        });
        this._afterOpened.next(abstractOverlayRef);
        return abstractOverlayRef;
    }

    /**
     * 所有弹出框完全关闭后的回调
     * @returns
     */
    afterAllClosed() {
        return this._afterAllClosed;
    }

    /**
     * 打开弹出框之后的回调
     * @returns
     */
    afterOpened() {
        return this._afterOpened;
    }

    /**
     * 关闭弹出框，若force为true，则canClose无效，强制关闭
     * @param result
     * @param force
     */
    close<T>(result?: T, force?: boolean) {
        if (this.openedOverlays.length > 0) {
            const lastOverlayRef = this.openedOverlays[this.openedOverlays.length - 1];
            if (lastOverlayRef) {
                lastOverlayRef.close(result, force);
            }
        }
    }

    /**
     * 关闭所有打开的弹出框
     */
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
