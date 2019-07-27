import { OnInit, Component, TemplateRef, ViewContainerRef, NgZone, ChangeDetectionStrategy } from '@angular/core';
import {
    ConnectionPositionPair,
    OriginConnectionPosition,
    OverlayConnectionPosition,
    Overlay,
    OverlayRef
} from '@angular/cdk/overlay';
import { TemplatePortal, ComponentPortal } from '@angular/cdk/portal';
import { POSITION_MAP } from '../../../../../src/core/overlay/overlay-position-map';
import { take, takeUntil } from 'rxjs/operators';
import { mixinUnsubscribe, MixinBase } from '../../../../../src/core';

@Component({
    selector: 'app-demo-create-overlay',
    template: `
        <div class="overlay-content">Create Overlay Content from Component</div>
    `,
    styleUrls: ['./overlay-section.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateOverlayComponent {}

@Component({
    selector: 'app-demo-overlay-section',
    templateUrl: './overlay-section.component.html',
    styleUrls: ['./overlay-section.scss']
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DemoOverlaySectionComponent extends mixinUnsubscribe(MixinBase) implements OnInit {
    isOpened = false;

    horizontalConnectionPositions = ['start', 'center', 'end'];

    verticalConnectionPositions = ['top', 'center', 'bottom'];

    originConnectionPosition: OriginConnectionPosition = { originX: 'center', originY: 'top' };

    overlayConnectionPosition: OverlayConnectionPosition = { overlayX: 'center', overlayY: 'bottom' };

    connectionPosition = new ConnectionPositionPair(this.originConnectionPosition, this.overlayConnectionPosition);

    createOverlayRef: OverlayRef;

    constructor(private overlay: Overlay, private viewContainerRef: ViewContainerRef, private ngZone: NgZone) {
        super();
    }

    ngOnInit() {}

    openOverlay() {
        this.isOpened = true;
    }

    closeOverlay() {
        this.isOpened = false;
    }

    toggleOverlay() {
        this.isOpened = !this.isOpened;
    }

    createOverlay(templateRef: TemplateRef<HTMLElement>, origin: HTMLElement) {
        if (this.createOverlayRef) {
            this.createOverlayRef.detach();
            this.createOverlayRef.dispose();
            this.createOverlayRef = null;
            return;
        }
        const strategy = this.overlay.position().flexibleConnectedTo(origin);

        strategy
            .withTransformOriginOn('.create-overlay-content')
            .withFlexibleDimensions(false)
            .withViewportMargin(8)
            .withPositions([POSITION_MAP['top'], POSITION_MAP['topCenter']]);

        this.createOverlayRef = this.overlay.create({
            positionStrategy: strategy,
            scrollStrategy: this.overlay.scrollStrategies.block()
        });

        this.createOverlayRef.attach(new ComponentPortal(CreateOverlayComponent, this.viewContainerRef));
        // this.createOverlayRef.attach(new TemplatePortal(templateRef, this.viewContainerRef));
        this.ngZone.onMicrotaskEmpty
            .asObservable()
            .pipe(
                take(1),
                takeUntil(this.ngUnsubscribe$)
            )
            .subscribe(() => {
                this.createOverlayRef.updatePosition();
            });
    }
}
