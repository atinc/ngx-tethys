import { ComponentType, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injector } from '@angular/core';
import { ThyMessageBaseContainerComponent } from './message-container.component';
import { ThyMessageBaseQueue } from './message-queue.service';

/**
 * @internal
 */
export class ThyMessageBaseService<TContainer extends ThyMessageBaseContainerComponent> {
    protected container: TContainer;

    protected overlayRef: OverlayRef;

    private queue: ThyMessageBaseQueue;

    constructor(private overlay: Overlay, private injector: Injector, queue: ThyMessageBaseQueue) {
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
