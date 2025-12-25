import { ComponentType, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injector } from '@angular/core';
import { ThyAbstractMessageContainerComponent } from './abstract-message-container.component';
import { ThyAbstractMessageQueue } from './abstract-message-queue.service';

/**
 * @internal
 */
export class ThyAbstractMessageService<TContainer extends ThyAbstractMessageContainerComponent> {
    protected container?: TContainer;

    protected overlayRef!: OverlayRef;

    private queue: ThyAbstractMessageQueue;

    constructor(
        private overlay: Overlay,
        private injector: Injector,
        queue: ThyAbstractMessageQueue
    ) {
        this.queue = queue;
    }

    protected createContainer(container: ComponentType<TContainer>): TContainer {
        if (this.container) {
            this.container.toOverlayTop();
            return this.container;
        }

        this.overlayRef = this.overlay.create({
            hasBackdrop: false,
            scrollStrategy: this.overlay.scrollStrategies.noop(),
            positionStrategy: this.overlay.position().global()
        });
        const componentPortal = new ComponentPortal(container, null, this.injector);
        const componentRef = this.overlayRef.attach(componentPortal);
        return componentRef.instance;
    }

    remove(id?: string) {
        this.queue.remove(id);
    }
}
