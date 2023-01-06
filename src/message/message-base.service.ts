import { ComponentType, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injector } from '@angular/core';
import { ThyMessageContainerComponent } from './message-container.component';
import { ThyMessageQueue } from './message-queue.service';

/**
 * @internal
 */
export class ThyMessageBaseService<TContainer extends ThyMessageContainerComponent> {
    protected container: TContainer;

    constructor(private overlay: Overlay, private injector: Injector, private queue: ThyMessageQueue) {}

    protected createContainer(container: ComponentType<TContainer>): TContainer {
        if (this.container) {
            this.container.toOverlayTop();
            return this.container;
        }

        const overlayRef = this.overlay.create({
            hasBackdrop: false,
            scrollStrategy: this.overlay.scrollStrategies.noop(),
            positionStrategy: this.overlay.position().global()
        });
        const componentPortal = new ComponentPortal(container, null, this.injector);
        const componentRef = overlayRef.attach(componentPortal);
        return componentRef.instance;
    }

    remove(id?: string) {
        this.queue.remove(id);
    }
}
