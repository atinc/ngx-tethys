import { Injectable, TemplateRef, Injector, Optional, OnDestroy, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { of, Subject } from 'rxjs';
import { ComponentType, PortalInjector, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { ThyDialogConfig, ThyDialogSizes, THY_DIALOG_DEFAULT_OPTIONS } from './dialog.config';
import { Overlay, OverlayConfig, OverlayRef, ScrollStrategy } from '@angular/cdk/overlay';
import { ThyDialogContainerComponent } from './dialog-container.component';
import { ThyDialogRef, ThyInternalDialogRef } from './dialog-ref';
import { Directionality } from '@angular/cdk/bidi';
import { helpers } from '../util';
import { ThyClickPositioner } from '../core';
import { ThyConfirmComponent } from './confirm/confirm.component';
import { ThyConfirmConfig } from './confirm.config';
import { ThyUpperOverlayService, ThyUpperOverlayRef } from '../core/overlay';
import { dialogUpperOverlayOptions } from './dialog.options';

@Injectable({
    providedIn: 'root'
})
export class ThyDialog extends ThyUpperOverlayService<ThyDialogConfig, ThyDialogContainerComponent>
    implements OnDestroy {
    private getOverlayPanelClasses(dialogConfig: ThyDialogConfig) {
        let classes = [`cdk-overlay-pane`, `dialog-overlay-pane`];
        const size = dialogConfig.size || ThyDialogSizes.md;
        classes.push(`dialog-${size}`);
        if (dialogConfig.panelClass) {
            if (helpers.isArray(dialogConfig.panelClass)) {
                classes = classes.concat(dialogConfig.panelClass);
            } else {
                classes.push(dialogConfig.panelClass as string);
            }
        }
        return classes;
    }

    protected buildOverlayConfig(config: ThyDialogConfig<any>): OverlayConfig {
        const overlayConfig = this.buildBaseOverlayConfig(config);
        overlayConfig.panelClass = this.getOverlayPanelClasses(config);
        overlayConfig.positionStrategy = this.overlay.position().global();
        overlayConfig.scrollStrategy = config.scrollStrategy || this.overlay.scrollStrategies.block();
        return overlayConfig;
    }

    protected attachUpperOverlayContainer(
        overlay: OverlayRef,
        config: ThyDialogConfig<any>
    ): ThyDialogContainerComponent {
        const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        const injector = new PortalInjector(userInjector || this.injector, new WeakMap([[ThyDialogConfig, config]]));
        const containerPortal = new ComponentPortal(ThyDialogContainerComponent, config.viewContainerRef, injector);
        const containerRef = overlay.attach<ThyDialogContainerComponent>(containerPortal);

        return containerRef.instance;
    }

    protected createUpperOverlayRef<T>(
        overlayRef: OverlayRef,
        containerInstance: ThyDialogContainerComponent,
        config: ThyDialogConfig<any>
    ): ThyUpperOverlayRef<T, any> {
        return new ThyInternalDialogRef(overlayRef, containerInstance, config);
    }

    protected createInjector<T>(
        config: ThyDialogConfig,
        dialogRef: ThyDialogRef<T>,
        dialogContainer: ThyDialogContainerComponent
    ): PortalInjector {
        const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;

        const injectionTokens = new WeakMap<any, any>([
            [ThyDialogContainerComponent, dialogContainer],
            [ThyDialogRef, dialogRef]
        ]);

        if (config.direction && (!userInjector || !userInjector.get<Directionality | null>(Directionality, null))) {
            injectionTokens.set(Directionality, {
                value: config.direction,
                change: of()
            });
        }

        return new PortalInjector(userInjector || this.injector, injectionTokens);
    }

    constructor(
        overlay: Overlay,
        injector: Injector,
        @Optional()
        @Inject(THY_DIALOG_DEFAULT_OPTIONS)
        defaultConfig: ThyDialogConfig,
        clickPositioner: ThyClickPositioner
    ) {
        super(dialogUpperOverlayOptions, overlay, injector, defaultConfig);
        clickPositioner.initialize();
    }

    open<T, TData = any, TResult = any>(
        componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
        config?: ThyDialogConfig<TData>
    ): ThyDialogRef<T, TResult> {
        const dialogRef = this.openUpperOverlay(componentOrTemplateRef, config);
        const dialogRefInternal = dialogRef as ThyInternalDialogRef<T, TResult>;
        dialogRefInternal.updateSizeAndPosition(
            dialogRef.containerInstance.config.width,
            dialogRef.containerInstance.config.height,
            dialogRef.containerInstance.config.position
        );
        return dialogRef as ThyDialogRef<T, TResult>;
    }

    confirm(options: ThyConfirmConfig) {
        return this.open(ThyConfirmComponent, {
            initialState: {
                options: options
            }
        });
    }

    getDialogById(id: string): ThyDialogRef<any> | undefined {
        return this.getUpperOverlayById(id) as ThyDialogRef<any> | undefined;
    }

    /**
     * Finds the closest ThyDialogRef to an element by looking at the DOM.
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

    ngOnDestroy() {
        this.dispose();
    }
}
