import { Injectable, TemplateRef, Injector, Optional } from '@angular/core';
import { Location } from '@angular/common';
import { of } from 'rxjs';
import {
    ComponentType,
    PortalInjector,
    ComponentPortal,
    TemplatePortal
} from '@angular/cdk/portal';
import { ThyDialogConfig, THY_DIALOG_SCROLL_STRATEGY } from './dialog.config';
import { Overlay, OverlayConfig, OverlayRef, ScrollStrategy } from '@angular/cdk/overlay';
import { ThyDialogContainerComponent } from './dialog-container.component';
import { ThyDialogRef } from './dialog-ref';
import { Directionality } from '@angular/cdk/bidi';


/** @docs-private */
export function THY_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay: Overlay):
  () => ScrollStrategy {
  return () => overlay.scrollStrategies.block();
}

/** @docs-private */
export const MAT_DIALOG_SCROLL_STRATEGY_PROVIDER = {
  provide: THY_DIALOG_SCROLL_STRATEGY,
  deps: [Overlay],
  useFactory: THY_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY,
};

@Injectable()
export class ThyDialog {
    constructor(
        private overlay: Overlay,
        private injector: Injector,
        @Optional() private location: Location
    ) {}

    private getOverlayConfig(dialogConfig: ThyDialogConfig): OverlayConfig {
        const overlayConfig = new OverlayConfig({
          positionStrategy: this.overlay.position().global(),
          scrollStrategy: dialogConfig.scrollStrategy || this.overlay.scrollStrategies.block(),
          panelClass: dialogConfig.panelClass,
          hasBackdrop: dialogConfig.hasBackdrop,
          direction: dialogConfig.direction,
          minWidth: dialogConfig.minWidth,
          minHeight: dialogConfig.minHeight,
          maxWidth: dialogConfig.maxWidth,
          maxHeight: dialogConfig.maxHeight,
        //   disposeOnNavigation: dialogConfig.closeOnNavigation
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
        const userInjector =
            config &&
            config.viewContainerRef &&
            config.viewContainerRef.injector;

        const injectionTokens = new WeakMap<any, any>([
            [ThyDialogContainerComponent, dialogContainer],
            // [MAT_DIALOG_DATA, config.data],
            [ThyDialogRef, dialogRef]
        ]);

        if (
            config.direction &&
            (!userInjector ||
                !userInjector.get<Directionality | null>(Directionality, null))
        ) {
            injectionTokens.set(Directionality, {
                value: config.direction,
                change: of()
            });
        }

        return new PortalInjector(
            userInjector || this.injector,
            injectionTokens
        );
    }

    private attachDialogContainer(
        overlay: OverlayRef,
        config: ThyDialogConfig
    ): ThyDialogContainerComponent {
        const userInjector =
            config &&
            config.viewContainerRef &&
            config.viewContainerRef.injector;
        const injector = new PortalInjector(
            userInjector || this.injector,
            new WeakMap([[ThyDialogConfig, config]])
        );
        const containerPortal = new ComponentPortal(
            ThyDialogContainerComponent,
            config.viewContainerRef,
            injector
        );
        const containerRef = overlay.attach<ThyDialogContainerComponent>(
            containerPortal
        );

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
        const dialogRef = new ThyDialogRef<T, TResult>(
            overlayRef,
            dialogContainer,
            this.location,
            config.id
        );

        // When the dialog backdrop is clicked, we want to close it.
        if (config.hasBackdrop) {
            overlayRef.backdropClick().subscribe(() => {
                if (!dialogRef.disableBackdropClose) {
                    dialogRef.close();
                }
            });
        }

        if (componentOrTemplateRef instanceof TemplateRef) {
            dialogContainer.attachTemplatePortal(
                new TemplatePortal<T>(componentOrTemplateRef, null, <any>{
                    $implicit: config.data,
                    dialogRef
                })
            );
        } else {
            const injector = this.createInjector<T>(
                config,
                dialogRef,
                dialogContainer
            );
            const contentRef = dialogContainer.attachComponentPortal<T>(
                new ComponentPortal(componentOrTemplateRef, undefined, injector)
            );
            dialogRef.componentInstance = contentRef.instance;
        }

        dialogRef
            .updateSize(config.width, config.height)
            .updatePosition(config.position);

        return dialogRef;
    }

    open<T, TData = any, TResult = any>(
        componentOrTemplateRef: ComponentType<T> | TemplateRef<T>,
        config?: ThyDialogConfig<TData>
    ): ThyDialogRef<T, TResult> {
        config = applyConfigDefaults(config, new ThyDialogConfig());
        const overlayConfig: OverlayConfig = this.getOverlayConfig(config);
        const overlayRef = this.overlay.create(overlayConfig);
        const dialogContainer = this.attachDialogContainer(overlayRef, config);
        const dialogRef = this.attachDialogContent<T, TResult>(
            componentOrTemplateRef,
            dialogContainer,
            overlayRef,
            config
        );
        return dialogRef;
    }
}

function applyConfigDefaults(
    config?: ThyDialogConfig, defaultOptions?: ThyDialogConfig): ThyDialogConfig {
  return {...defaultOptions, ...config};
}
