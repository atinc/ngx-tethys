import { Component, Input, HostBinding, OnInit, HostListener, OnDestroy, NgZone, ElementRef, ComponentRef, createComponent, ApplicationRef, ViewChild, AfterViewInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { ThyMessageConfig } from './message.config';
import { ThyMessageService } from './message.service';
import { ComponentTypeOrTemplateRef } from 'ngx-tethys/core';
import { isString, isTemplateRef } from 'ngx-tethys/util';
import { ComponentType } from '@angular/cdk/portal';

const ANIMATION_IN_DURATION = 100;
const ANIMATION_OUT_DURATION = 150;
const HIDE_STYLE = { transform: 'translateX(0)', opacity: 0, height: 0, paddingTop: 0, paddingBottom: 0, margin: 0 };

/**
 * @internal
 */
@Component({
    selector: 'thy-message',
    templateUrl: './message.component.html',
    host: {
        '[class]': "'thy-message thy-message-' + option.type"
    },
    animations: [
        trigger('flyInOut', [
            state('flyIn', style({ transform: 'translateY(0)', opacity: 1, height: '*' })),
            transition('void => flyIn', [
                style({ transform: 'translateY(-100%)', opacity: 0, height: '*' }),
                animate(ANIMATION_IN_DURATION)
            ]),
            transition('flyIn => componentHide', [animate(ANIMATION_OUT_DURATION, style(HIDE_STYLE))]),
            transition('flyIn => void', [animate(ANIMATION_IN_DURATION, style(HIDE_STYLE))]),

            state('componentHide', style(HIDE_STYLE))
        ])
    ]
})
export class ThyMessageComponent implements OnInit, AfterViewInit, OnDestroy {
    @HostBinding('@flyInOut') flyInOut = 'flyIn';

    option: ThyMessageConfig;

    iconName = '';

    contentIsComponent = false;

    componentRef: ComponentRef<any>;

    private closeTimer: any;

    @Input()
    set thyOption(value: ThyMessageConfig) {
        this.option = value;
    }

    @ViewChild('componentContentHost') contentContainer: ElementRef<any>;

    constructor(private messageService: ThyMessageService, private _ngZone: NgZone, private applicationRef: ApplicationRef) {}

    ngOnInit() {
        const iconName = {
            success: 'check-circle-fill',
            info: 'info-circle-fill',
            warning: 'waring-fill',
            error: 'close-circle-fill',
            loading: 'clock-circle-open'
        };

        this.iconName = iconName[this.option.type];
        this.contentIsComponent = this.isComponentType(this.option.content);
        this.createCloseTimer();
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

    @HostListener('mouseenter')
    mouseenter() {
        if (this.option.pauseOnHover) {
            this.clearCloseTimer();
        }
    }

    @HostListener('mouseleave')
    mouseleave() {
        if (this.option.pauseOnHover) {
            this.createCloseTimer();
        }
    }

    close() {
        this._ngZone.runOutsideAngular(() => {
            this.flyInOut = 'componentHide';
            setTimeout(() => {
                this.messageService.remove(this.option.id);
            }, ANIMATION_OUT_DURATION);
        });
    }

    private isComponentType(content: string | ComponentTypeOrTemplateRef<any>) {
        return content && !isString(content) && !isTemplateRef(content);
    }

    private createCloseTimer() {
        if (this.option.duration) {
            this.closeTimer = setInterval(() => {
                this.clearCloseTimer();
                this.close();
            }, this.option.duration);
        }
    }

    private clearCloseTimer() {
        clearInterval(this.closeTimer);
    }

    ngOnDestroy() {
        this.clearCloseTimer();
        if (this.componentRef) {
            this.applicationRef.detachView(this.componentRef.hostView);
        }
    }
}
