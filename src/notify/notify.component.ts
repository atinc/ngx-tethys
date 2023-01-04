import {
    Component,
    Input,
    HostBinding,
    OnInit,
    HostListener,
    OnDestroy,
    NgZone,
    ElementRef,
    ViewChild,
    createComponent,
    AfterViewInit,
    ApplicationRef,
    ComponentRef
} from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ComponentTypeOrTemplateRef } from 'ngx-tethys/core';
import { helpers, isString, isTemplateRef } from 'ngx-tethys/util';
import { ThyNotifyConfig, ThyNotifyDetail, ThyNotifyPlacement } from './notify.config';
import { ComponentType } from '@angular/cdk/portal';
import { ThyNotifyService } from './notify.service';

const ANIMATION_IN_DURATION = 100;
const ANIMATION_OUT_DURATION = 150;
const HIDE_STYLE = { transform: 'translateX(0)', opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0, margin: 0 };

@Component({
    selector: 'thy-notify',
    templateUrl: './notify.component.html',
    animations: [
        trigger('flyInOut', [
            state('flyInOutRight', style({ transform: 'translateX(0)', opacity: 1, height: '*' })),
            transition('void => flyInOutRight', [
                style({ transform: 'translateX(100%)', opacity: 0, height: '*' }),
                animate(ANIMATION_IN_DURATION)
            ]),
            transition('flyInOutRight => componentHide', [animate(ANIMATION_OUT_DURATION, style(HIDE_STYLE))]),
            transition('flyInOutRight => void', [animate(ANIMATION_IN_DURATION, style(HIDE_STYLE))]),

            state('flyInOutLeft', style({ transform: 'translateX(0)', opacity: 1, height: '*' })),
            transition('void => flyInOutLeft', [
                style({ transform: 'translateX(-100%)', opacity: 0, height: '*' }),
                animate(ANIMATION_IN_DURATION)
            ]),
            transition('flyInOutLeft => componentHide', [animate(ANIMATION_OUT_DURATION, style(HIDE_STYLE))]),
            transition('flyInOutLeft => void', [animate(ANIMATION_IN_DURATION, style(HIDE_STYLE))]),

            state('componentHide', style(HIDE_STYLE))
        ])
    ]
})
export class ThyNotifyComponent implements OnInit, AfterViewInit, OnDestroy {
    @HostBinding('@flyInOut') flyInOut: string;

    @HostBinding('class') className = '';

    config: ThyNotifyConfig;

    notifyIconName = '';

    extendContentClass = false;

    closeTimer: any;

    isShowDetail = false;

    placement: ThyNotifyPlacement;

    contentIsComponent = false;

    componentRef: ComponentRef<any>;

    @ViewChild('componentContentHost') contentContainer: ElementRef<any>;

    @Input()
    set thyConfig(value: ThyNotifyConfig) {
        this.config = value;
        const type = value.type;
        this.placement = value.placement || 'topRight';
        if (this.placement === 'topLeft' || this.placement === 'bottomLeft') {
            this.flyInOut = 'flyInOutLeft';
        } else {
            this.flyInOut = 'flyInOutRight';
        }
        this.className = `thy-notify thy-notify-${type}`;
    }

    constructor(
        private _ngZone: NgZone,
        private elementRef: ElementRef,
        private applicationRef: ApplicationRef,
        private service: ThyNotifyService
    ) {}

    ngOnInit() {
        const iconName = {
            success: 'check-circle-fill',
            info: 'info-circle-fill',
            warning: 'waring-fill',
            error: 'close-circle-fill'
        };

        this.notifyIconName = iconName[this.config.type];
        this.contentIsComponent = this.isComponentType(this.config.content);

        this._createCloseTimer();
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

    ngOnDestroy() {
        this._clearCloseTimer();
        // fix dom not removed normally under firefox
        this.elementRef.nativeElement.remove();
        if (this.componentRef) {
            this.applicationRef.detachView(this.componentRef.hostView);
        }
    }

    extendContent() {
        this.extendContentClass = true;
    }

    showDetailToggle() {
        this.isShowDetail = !this.isShowDetail;
    }

    closeNotify() {
        this._ngZone.runOutsideAngular(() => {
            this.flyInOut = 'componentHide';
            setTimeout(() => {
                this.service.remove(this.config.id);
            }, ANIMATION_OUT_DURATION);
        });
    }

    triggerDetail() {
        if (helpers.isFunction((this.config.detail as ThyNotifyDetail).action)) {
            (this.config.detail as ThyNotifyDetail).action();
        }
        if ((this.config.detail as ThyNotifyDetail).content) {
            this.showDetailToggle();
        }
    }

    @HostListener('mouseenter')
    mouseenter() {
        if (this.config.pauseOnHover) {
            this._clearCloseTimer();
        }
    }

    @HostListener('mouseleave')
    mouseleave() {
        if (this.config.pauseOnHover) {
            this._createCloseTimer();
        }
    }

    private isComponentType(content: string | ComponentTypeOrTemplateRef<any>) {
        return content && !isString(content) && !isTemplateRef(content);
    }

    private _createCloseTimer() {
        if (this.config.duration) {
            this.closeTimer = setInterval(() => {
                clearInterval(this.closeTimer);
                this.closeNotify();
            }, this.config.duration);
        }
    }

    private _clearCloseTimer() {
        clearInterval(this.closeTimer);
    }
}
