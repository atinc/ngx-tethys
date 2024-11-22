import { ThyAbstractOverlayRef, ThyAbstractOverlayService, ThyClickPositioner } from 'ngx-tethys/core';
import { of } from 'rxjs';

import { Directionality } from '@angular/cdk/bidi';
import { Overlay, OverlayConfig, OverlayContainer, OverlayKeyboardDispatcher, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { Injectable, Injector, OnDestroy, StaticProvider, TemplateRef, inject } from '@angular/core';

import { isString } from 'ngx-tethys/util';
import { ThyConfirmConfig } from './confirm.config';
import { THY_CONFIRM_COMPONENT_TOKEN, ThyConfirmAbstractComponent } from './confirm/token';
import { ThyDialogContainer } from './dialog-container.component';
import { ThyDialogRef, ThyInternalDialogRef } from './dialog-ref';
import { THY_DIALOG_DEFAULT_OPTIONS, ThyDialogConfig, ThyDialogSizes } from './dialog.config';
import { dialogAbstractOverlayOptions } from './dialog.options';

/**
 * @public
 * @order 10
 */
@Injectable()
export class ThyDialog extends ThyAbstractOverlayService<ThyDialogConfig, ThyDialogContainer> implements OnDestroy {
    private confirmComponentType = inject<ComponentType<ThyConfirmAbstractComponent>>(THY_CONFIRM_COMPONENT_TOKEN);

    private overlayKeyboardDispatcher = inject(OverlayKeyboardDispatcher);

    private overlayContainer = inject(OverlayContainer);

    protected buildOverlayConfig(config: ThyDialogConfig<any>): OverlayConfig {
        const size = config.size || ThyDialogSizes.md;
        const overlayConfig = this.buildBaseOverlayConfig(config, [`dialog-${size}`]);
        overlayConfig.positionStrategy = this.overlay.position().global();
        overlayConfig.scrollStrategy = config.scrollStrategy || this.overlay.scrollStrategies.block();
        return overlayConfig;
    }

    protected attachOverlayContainer(overlay: OverlayRef, config: ThyDialogConfig<any>): ThyDialogContainer {
        const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        const injector = Injector.create({
            parent: userInjector || this.injector,
            providers: [{ provide: ThyDialogConfig, useValue: config }]
        });
        const containerPortal = new ComponentPortal(ThyDialogContainer, config.viewContainerRef, injector);
        const containerRef = overlay.attach<ThyDialogContainer>(containerPortal);

        return containerRef.instance;
    }

    protected createAbstractOverlayRef<T, TResult>(
        overlayRef: OverlayRef,
        containerInstance: ThyDialogContainer,
        config: ThyDialogConfig<any>
    ): ThyAbstractOverlayRef<T, ThyDialogContainer, TResult> {
        return new ThyInternalDialogRef(overlayRef, containerInstance, config, this);
    }

    protected createInjector<T>(config: ThyDialogConfig, dialogRef: ThyDialogRef<T>, dialogContainer: ThyDialogContainer): Injector {
        const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;

        const injectionTokens: StaticProvider[] = [
            { provide: ThyDialogContainer, useValue: dialogContainer },
            {
                provide: ThyDialogRef,
                useValue: dialogRef
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

    constructor() {
        const overlay = inject(Overlay);
        const injector = inject(Injector);
        const defaultConfig = inject(THY_DIALOG_DEFAULT_OPTIONS, { optional: true })!;
        const clickPositioner = inject(ThyClickPositioner);

        super(dialogAbstractOverlayOptions, overlay, injector, defaultConfig);
        clickPositioner.initialize();
    }

    /**
     * 打开 Dialog
     */
    open<T, TData = unknown, TResult = unknown>(
        componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
        config?: ThyDialogConfig<TData>
    ): ThyDialogRef<T, TResult> {
        const dialogRef = this.openOverlay(componentOrTemplateRef, config);
        const dialogRefInternal = dialogRef as ThyInternalDialogRef<T, TResult>;
        dialogRefInternal.updateSizeAndPosition(
            dialogRef.containerInstance.config.width,
            dialogRef.containerInstance.config.height,
            dialogRef.containerInstance.config.position
        );
        return dialogRef as ThyDialogRef<T, TResult>;
    }

    /**
     * 打开 Confirm
     */
    confirm(options: ThyConfirmConfig) {
        return this.open(this.confirmComponentType, {
            initialState: {
                options: options
            }
        });
    }

    /**
     * 根据 id 获取 Dialog
     */
    getDialogById(id: string): ThyDialogRef<any> | undefined {
        return this.getAbstractOverlayById(id) as ThyDialogRef<any> | undefined;
    }

    /**
     * 获取所有打开的 Dialog
     */
    getOpenedDialogs(): ThyDialogRef<any>[] {
        return this.getAbstractOverlays();
    }

    /**
     * @description.en-us Finds the closest ThyDialogRef to an element by looking at the DOM.
     * @description 获取与指定元素最接近的 ThyDialogRef
     */
    getClosestDialog(element: HTMLElement): ThyDialogRef<any> | undefined {
        let parent: HTMLElement | null = element.parentElement;

        while (parent && !parent.classList.contains('thy-dialog-container')) {
            parent = parent.parentElement;
        }
        if (parent && parent.id) {
            return this.getDialogById(parent.id);
        }
        return null;
    }

    /**
     * Update dialog to top
     */
    toTop(idOrOverlayRef: string | ThyDialogRef<unknown, ThyDialogContainer>) {
        let dialogRef: ThyAbstractOverlayRef<unknown, ThyDialogContainer>;
        if (isString(idOrOverlayRef)) {
            dialogRef = this.openedOverlays.find(item => item.id === idOrOverlayRef);
        } else {
            dialogRef = idOrOverlayRef;
        }
        if (dialogRef) {
            const overlayRef = dialogRef.getOverlayRef();
            const containerElement = this.overlayContainer.getContainerElement();
            containerElement.appendChild(overlayRef.backdropElement);
            containerElement.appendChild(overlayRef.hostElement);
            this.overlayKeyboardDispatcher.remove(overlayRef);
            this.overlayKeyboardDispatcher.add(overlayRef);
            this.openedOverlays = [...(this.openedOverlays || []).filter(item => item.id !== dialogRef?.id), dialogRef];
        }
    }

    ngOnDestroy() {
        this.dispose();
    }
}
