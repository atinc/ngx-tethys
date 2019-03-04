import { Injectable, TemplateRef, Injector, Optional, OnDestroy, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { of, Subject } from 'rxjs';
import { ComponentType, PortalInjector, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { ThyDialogConfig, ThyDialogSizes, THY_DIALOG_DEFAULT_OPTIONS } from './dialog.config';
import { Overlay, OverlayConfig, OverlayRef, ScrollStrategy } from '@angular/cdk/overlay';
import { ThyDialogContainerComponent } from './dialog-container.component';
import { ThyDialogRef, ThyDialogRefInternal } from './dialog-ref';
import { Directionality } from '@angular/cdk/bidi';
import { helpers } from '../util';
import { ThyClickPositioner } from '../core';
import { ThyConfirmComponent } from './confirm/confirm.component';
import { ThyConfirmConfig } from './confirm.config';

@Injectable({
    providedIn: 'root'
})
export class ThyDialog implements OnDestroy {
    private openedDialogs: ThyDialogRef<any>[] = [];

    private readonly _afterAllClosed = new Subject<void>();

    private readonly _afterOpened = new Subject<ThyDialogRef<any>>();

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

    private getOverlayConfig(dialogConfig: ThyDialogConfig): OverlayConfig {
        const overlayConfig = new OverlayConfig({
            positionStrategy: this.overlay.position().global(),
            scrollStrategy: dialogConfig.scrollStrategy || this.overlay.scrollStrategies.block(),
            panelClass: this.getOverlayPanelClasses(dialogConfig),
            hasBackdrop: dialogConfig.hasBackdrop,
            direction: dialogConfig.direction,
            minWidth: dialogConfig.minWidth,
            minHeight: dialogConfig.minHeight,
            maxWidth: dialogConfig.maxWidth,
            maxHeight: dialogConfig.maxHeight,
            disposeOnNavigation: dialogConfig.closeOnNavigation
        });

        if (dialogConfig.backdropClass) {
            overlayConfig.backdropClass = dialogConfig.backdropClass;
        }

        return overlayConfig;
    }

    private createInjector<T>(
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

    private attachDialogContainer(overlay: OverlayRef, config: ThyDialogConfig): ThyDialogContainerComponent {
        const userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
        const injector = new PortalInjector(userInjector || this.injector, new WeakMap([[ThyDialogConfig, config]]));
        const containerPortal = new ComponentPortal(ThyDialogContainerComponent, config.viewContainerRef, injector);
        const containerRef = overlay.attach<ThyDialogContainerComponent>(containerPortal);

        return containerRef.instance;
    }

    private attachDialogContent<T, TResult>(
        componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
        dialogContainer: ThyDialogContainerComponent,
        overlayRef: OverlayRef,
        config: ThyDialogConfig
    ): ThyDialogRef<T, TResult> {
        // Create a reference to the dialog we're creating in order to give the user a handle
        // to modify and close it.
        const dialogRef = new ThyDialogRefInternal<T, TResult>(overlayRef, dialogContainer, config.id);

        // When the dialog backdrop is clicked, we want to close it.
        if (config.hasBackdrop) {
            overlayRef.backdropClick().subscribe(() => {
                if (dialogRef.backdropClosable) {
                    dialogRef.close();
                }
            });
        }

        if (componentOrTemplateRef instanceof TemplateRef) {
            dialogContainer.attachTemplatePortal(
                new TemplatePortal<T>(componentOrTemplateRef, null, <any>{
                    $implicit: config.initialState,
                    dialogRef
                })
            );
        } else {
            const injector = this.createInjector<T>(config, dialogRef, dialogContainer);
            const contentRef = dialogContainer.attachComponentPortal<T>(
                new ComponentPortal(componentOrTemplateRef, undefined, injector)
            );
            if (config.initialState) {
                Object.assign(contentRef.instance, config.initialState);
            }
            dialogRef.componentInstance = contentRef.instance;
        }

        dialogRef.updateSizeAndPosition(config.width, config.height, config.position);
        return dialogRef;
    }

    private removeOpenedDialog(dialogRef: ThyDialogRef<any>) {
        const index = this.openedDialogs.indexOf(dialogRef);

        if (index > -1) {
            this.openedDialogs.splice(index, 1);

            // If all the dialogs were closed, remove/restore the `aria-hidden`
            // to a the siblings and emit to the `afterAllClosed` stream.
            if (!this.openedDialogs.length) {
                // this._ariaHiddenElements.forEach((previousValue, element) => {
                //   if (previousValue) {
                //     element.setAttribute('aria-hidden', previousValue);
                //   } else {
                //     element.removeAttribute('aria-hidden');
                //   }
                // });
                // this._ariaHiddenElements.clear();
                this._afterAllClosed.next();
            }
        }
    }

    constructor(
        private overlay: Overlay,
        private injector: Injector,
        @Optional()
        @Inject(THY_DIALOG_DEFAULT_OPTIONS)
        private defaultConfig: ThyDialogConfig,
        clickPositioner: ThyClickPositioner
    ) {
        clickPositioner.initialize();
    }

    open<T, TData = any, TResult = any>(
        componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
        config?: ThyDialogConfig<TData>
    ): ThyDialogRef<T, TResult> {
        config = { ...this.defaultConfig, ...config };
        if (config.id && this.getDialogById(config.id)) {
            throw Error(`Dialog with id ${config.id} exists already. The dialog id must be unique.`);
        }

        const overlayConfig: OverlayConfig = this.getOverlayConfig(config);
        const overlayRef = this.overlay.create(overlayConfig);

        const dialogContainer = this.attachDialogContainer(overlayRef, config);
        const dialogRef = this.attachDialogContent<T, TResult>(
            componentOrTemplateRef,
            dialogContainer,
            overlayRef,
            config
        );

        this.openedDialogs.push(dialogRef);
        dialogRef.afterClosed().subscribe(() => this.removeOpenedDialog(dialogRef));
        this._afterOpened.next(dialogRef);

        return dialogRef;
    }

    confirm<T>(options: ThyConfirmConfig) {
        return this.open(ThyConfirmComponent, {
            initialState: {
                options: options
            }
        });
    }

    afterAllClosed() {
        return this._afterAllClosed;
    }

    afterOpened() {
        return this._afterOpened;
    }

    getDialogById(id: string): ThyDialogRef<any> | undefined {
        return this.openedDialogs.find(dialog => dialog.id === id);
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

    close(result?: any) {
        if (this.openedDialogs.length > 0) {
            const lastDialogRef = this.openedDialogs[this.openedDialogs.length - 1];
            if (lastDialogRef) {
                lastDialogRef.close(result);
            }
        }
    }

    closeAll() {
        let i = this.openedDialogs.length;
        while (i--) {
            // 不需要操作 openedDialogs, 因为 close 会触发 afterClosed 的订阅
            // 触发订阅后会自动从 openedDialogs 中移除
            this.openedDialogs[i].close();
        }
    }

    ngOnDestroy() {
        this.closeAll();
    }
}
