import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import {
    AfterViewInit,
    ApplicationRef,
    ComponentRef,
    createComponent,
    Directive,
    ElementRef,
    HostListener,
    Inject,
    Injector,
    Input,
    NgZone,
    OnDestroy,
    OnInit
} from '@angular/core';
import { ComponentTypeOrTemplateRef } from 'ngx-tethys/core';
import { coerceCssPixelValue, isString, isTemplateRef } from 'ngx-tethys/util';
import { ThyMessageQueue } from './message-queue.service';
import { ThyGlobalMessageConfig, ThyMessageConfig, THY_MESSAGE_DEFAULT_CONFIG } from './message.config';

export const ANIMATION_IN_DURATION = 100;
export const ANIMATION_OUT_DURATION = 150;
export const HIDE_STYLE = { transform: 'translateX(0)', opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0, margin: 0 };

/**
 * @internal
 */
@Directive()
export class ThyMessageContainerBaseComponent {
    protected offset: string;

    constructor(private elementRef: ElementRef, @Inject(THY_MESSAGE_DEFAULT_CONFIG) defaultConfig: ThyGlobalMessageConfig) {
        this.offset = coerceCssPixelValue(defaultConfig.offset);
    }

    toOverlayTop() {
        const globalOverlayWrapper = this.elementRef.nativeElement.closest('.cdk-global-overlay-wrapper');
        const overlayContainer = globalOverlayWrapper.parentElement;
        overlayContainer.appendChild(globalOverlayWrapper);
    }
}

/**
 * @internal
 */
@Directive()
export class ThyMessageBaseComponent implements OnInit, AfterViewInit, OnDestroy {
    animationState: string;

    config: ThyMessageConfig;

    iconName = '';

    contentIsComponent = false;

    componentRef: ComponentRef<any>;

    private closeTimer: any;

    contentContainer: ElementRef<any>;

    @Input()
    set thyConfig(value: ThyMessageConfig) {
        this.config = value;
    }

    constructor(private _ngZone: NgZone, private queue: ThyMessageQueue, private applicationRef: ApplicationRef) {}

    ngOnInit() {
        const iconName = {
            success: 'check-circle-fill',
            info: 'info-circle-fill',
            warning: 'waring-fill',
            error: 'close-circle-fill'
        };

        this.iconName = iconName[this.config.type];
        this.createCloseTimer();

        this.contentIsComponent = this.isComponentType(this.config.content);
    }

    ngAfterViewInit() {
        if (this.contentIsComponent) {
            this.componentRef = createComponent(this.config.content as ComponentType<any>, {
                environmentInjector: this.applicationRef.injector,
                hostElement: this.contentContainer.nativeElement
            });
            Object.assign(this.componentRef.instance, this.config.contentInitialState || {});
            // 注册新创建的 componentRef，以将组件视图包括在更改检测周期中。
            this.applicationRef.attachView(this.componentRef.hostView);
        }
    }

    @HostListener('mouseenter')
    mouseenter() {
        if (this.config.pauseOnHover) {
            this.clearCloseTimer();
        }
    }

    @HostListener('mouseleave')
    mouseleave() {
        if (this.config.pauseOnHover) {
            this.createCloseTimer();
        }
    }

    close() {
        this._ngZone.runOutsideAngular(() => {
            this.animationState = 'componentHide';
            setTimeout(() => {
                this.queue.remove(this.config.id);
            }, ANIMATION_OUT_DURATION);
        });
    }

    private createCloseTimer() {
        if (this.config.duration) {
            this.closeTimer = setInterval(() => {
                this.clearCloseTimer();
                this.close();
            }, this.config.duration);
        }
    }

    private clearCloseTimer() {
        clearInterval(this.closeTimer);
    }

    private isComponentType(content: string | ComponentTypeOrTemplateRef<any>) {
        return content && !isString(content) && !isTemplateRef(content);
    }

    ngOnDestroy() {
        this.clearCloseTimer();
        if (this.componentRef) {
            this.applicationRef.detachView(this.componentRef.hostView);
        }
    }
}

/**
 * @internal
 */
export class ThyMessageBaseService<TContainer extends ThyMessageContainerBaseComponent> {
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
