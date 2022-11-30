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
import { ComponentTypeOrTemplateRef, UpdateHostClassService } from 'ngx-tethys/core';
import { NotifyQueueStore } from './notify-queue.store';
import { helpers, isString, isTemplateRef } from 'ngx-tethys/util';
import { NotifyPlacement, ThyNotifyConfig, ThyNotifyDetail } from './notify.config';
import { ComponentType } from '@angular/cdk/portal';

const ANIMATION_IN_DURATION = 100;
const ANIMATION_OUT_DURATION = 150;
const HIDE_STYLE = { transform: 'translateX(0)', opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0, margin: 0 };

@Component({
    selector: 'thy-notify',
    templateUrl: './notify.component.html',
    providers: [UpdateHostClassService],
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

    option: ThyNotifyConfig;

    notifyIconName = '';

    extendContentClass = false;

    closeTimer: any;

    isShowDetail = false;

    placement: NotifyPlacement;

    contentIsComponent = false;

    componentRef: ComponentRef<any>;

    @ViewChild('componentContentHost') contentContainer: ElementRef<any>;

    @Input()
    set thyOption(value: ThyNotifyConfig) {
        this.option = value;
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
        private _queueStore: NotifyQueueStore,
        private _ngZone: NgZone,
        private elementRef: ElementRef,
        private applicationRef: ApplicationRef
    ) {}

    ngOnInit() {
        const iconName = {
            success: 'check-circle-fill',
            info: 'info-circle-fill',
            warning: 'waring-fill',
            error: 'close-circle-fill'
        };

        this.notifyIconName = iconName[this.option.type];
        this.contentIsComponent = this.isComponentType(this.option.content);

        this._createCloseTimer();
    }

    ngAfterViewInit() {
        if (this.contentIsComponent) {
            this.componentRef = createComponent(this.option.content as ComponentType<any>, {
                environmentInjector: this.applicationRef.injector,
                hostElement: this.contentContainer.nativeElement
            });
            Object.assign(this.componentRef.instance, this.option.contentInitialState || {});
            // 注册新创建的 componentRef，以将组件视图包括在更改检测周期中。
            this.applicationRef.attachView(this.componentRef.hostView);
        }
    }

    ngOnDestroy() {
        this._clearCloseTimer();
        // fix dom not removed normally under firefox
        this.elementRef.nativeElement.remove();
        this.applicationRef.detachView(this.componentRef.hostView);
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
                this._queueStore.removeNotify(this.option.id, this.placement);
            }, ANIMATION_OUT_DURATION);
        });
    }

    triggerDetail() {
        if (helpers.isFunction((this.option.detail as ThyNotifyDetail).action)) {
            (this.option.detail as ThyNotifyDetail).action();
        }
        if ((this.option.detail as ThyNotifyDetail).content) {
            this.showDetailToggle();
        }
    }

    @HostListener('mouseenter') mouseenter() {
        if (this.option.pauseOnHover) {
            this._clearCloseTimer();
        }
    }

    @HostListener('mouseleave') mouseleave() {
        if (this.option.pauseOnHover) {
            this._createCloseTimer();
        }
    }

    private isComponentType(content: string | ComponentTypeOrTemplateRef<any>) {
        return content && !isString(content) && !isTemplateRef(content);
    }

    private _createCloseTimer() {
        if (this.option.duration) {
            this.closeTimer = setInterval(() => {
                clearInterval(this.closeTimer);
                this.closeNotify();
            }, this.option.duration);
        }
    }

    private _clearCloseTimer() {
        clearInterval(this.closeTimer);
    }
}
