import { ThyAbstractOverlayContainer, ThyClickDispatcher, ThyPortalOutlet } from 'ngx-tethys/core';
import { timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ContentObserver } from '@angular/cdk/observers';
import { PortalModule } from '@angular/cdk/portal';
import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    NgZone,
    OnDestroy,
    ViewChild,
    inject,
    Injector,
    afterNextRender,
    ChangeDetectionStrategy,
    Renderer2
} from '@angular/core';

import { ThyPopoverConfig } from './popover.config';
import { popoverAbstractOverlayOptions } from './popover.options';

/**
 * @internal
 */
@Component({
    selector: 'thy-popover-container',
    templateUrl: './popover-container.component.html',
    host: {
        class: 'thy-popover-container',
        tabindex: '-1',
        '[attr.role]': `'popover'`,
        '[attr.id]': 'id'
    },
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [PortalModule, ThyPortalOutlet]
})
export class ThyPopoverContainer<TData = unknown> extends ThyAbstractOverlayContainer<TData> implements AfterViewInit, OnDestroy {
    private elementRef = inject(ElementRef);
    config = inject<ThyPopoverConfig<TData>>(ThyPopoverConfig);
    private thyClickDispatcher = inject(ThyClickDispatcher);
    private contentObserver = inject(ContentObserver);
    private ngZone = inject(NgZone);
    private injector = inject(Injector);
    private renderer = inject(Renderer2);

    @ViewChild(ThyPortalOutlet, { static: true })
    portalOutlet!: ThyPortalOutlet;

    insideClicked = new EventEmitter();

    updatePosition = new EventEmitter();

    outsideClicked = new EventEmitter();

    beforeAttachPortal(): void {}

    constructor() {
        const changeDetectorRef = inject(ChangeDetectorRef);

        super(popoverAbstractOverlayOptions, changeDetectorRef);
        this.animationHost = this.elementRef.nativeElement;
        this.applyMotionVariantClass();
    }

    protected override isOverlayAnimationEnabled(): boolean {
        return super.isOverlayAnimationEnabled() && !this.config.animationDisabled;
    }

    ngAfterViewInit() {
        if (this.config.outsideClosable && !this.config.hasBackdrop) {
            timer(0).subscribe(() => {
                this.thyClickDispatcher
                    .clicked()
                    .pipe(takeUntil(this.animationClosingDone))
                    // @ts-ignore
                    .subscribe((event: MouseEvent) => {
                        if (!this.elementRef.nativeElement.contains(event.target as HTMLElement)) {
                            this.ngZone.run(() => {
                                this.outsideClicked.emit();
                            });
                        }
                    });
            });
        }

        if (this.config.autoAdaptive) {
            afterNextRender(
                () => {
                    this.contentObserver
                        .observe(this.elementRef)
                        .pipe(takeUntil(this.containerDestroy))
                        .subscribe(() => {
                            this.updatePosition.emit();
                        });
                },
                { injector: this.injector }
            );
        }
    }

    private applyMotionVariantClass(): void {
        const placement = this.config.placement;
        const host = this.elementRef.nativeElement;
        if (placement === 'left' || placement === 'right') {
            this.renderer.addClass(host, 'thy-popover-motion-x');
        } else if (placement === 'top' || placement === 'bottom') {
            this.renderer.addClass(host, 'thy-popover-motion-y');
        } else {
            this.renderer.addClass(host, 'thy-popover-motion-scale');
        }
    }

    @HostListener('click', [])
    onInsideClick() {
        if (this.config.insideClosable) {
            this.insideClicked.emit();
        }
    }

    ngOnDestroy() {
        super.destroy();
        this.insideClicked.complete();
        this.updatePosition.complete();
        this.outsideClicked.complete();
    }
}
