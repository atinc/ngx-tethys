import { ThyAbstractOverlayRef, ThyAbstractOverlayService, ThyClickPositioner } from 'ngx-tethys/core';
import { of } from 'rxjs';

import { Directionality } from '@angular/cdk/bidi';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { Inject, Injectable, Injector, OnDestroy, Optional, StaticProvider, TemplateRef } from '@angular/core';

import { ThyConfirmConfig } from './confirm.config';
import { ThyConfirmComponent } from './confirm/confirm.component';
import { ThyDialogContainerComponent } from './dialog-container.component';
import { ThyDialogRef, ThyInternalDialogRef } from './dialog-ref';
import { THY_DIALOG_DEFAULT_OPTIONS, ThyDialogConfig, ThyDialogSizes } from './dialog.config';
import { dialogUpperOverlayOptions } from './dialog.options';

@Injectable({
    providedIn: 'root'
})
export class ThyDialog extends ThyAbstractOverlayService<ThyDialogConfig, ThyDialogContainerComponent> implements OnDestroy {
    protected buildOverlayConfig(config: ThyDialogConfig<any>): OverlayConfig {
        const size = config.size || ThyDialogSizes.md;
        const overlayConfig = this.buildBaseOverlayConfig(config, [`dialog-${size}`]);
        overlayConfig.positionStrategy = this.overlay.position().global();
        overlayConfig.scrollStrategy = config.scrollStrategy || this.overlay.scrollStrategies.block();
        return overlayConfig;
    }

    protected attachOverlayContainer(overlay: OverlayRef, config: ThyDialogConfig<any>): ThyDialogContainerComponent {
        const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        const injector = Injector.create({
            parent: userInjector || this.injector,
            providers: [{ provide: ThyDialogConfig, useValue: config }]
        });
        const containerPortal = new ComponentPortal(ThyDialogContainerComponent, config.viewContainerRef, injector);
        const containerRef = overlay.attach<ThyDialogContainerComponent>(containerPortal);

        return containerRef.instance;
    }

    protected createOverlayRef<T>(
        overlayRef: OverlayRef,
        containerInstance: ThyDialogContainerComponent,
        config: ThyDialogConfig<any>
    ): ThyAbstractOverlayRef<T, any> {
        return new ThyInternalDialogRef(overlayRef, containerInstance, config);
    }

    protected createInjector<T>(
        config: ThyDialogConfig,
        dialogRef: ThyDialogRef<T>,
        dialogContainer: ThyDialogContainerComponent
    ): Injector {
        const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;

        const injectionTokens: StaticProvider[] = [
            { provide: ThyDialogContainerComponent, useValue: dialogContainer },
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
        const dialogRef = this.openOverlay(componentOrTemplateRef, config);
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
