import { Component, Input, HostBinding, OnInit, HostListener, OnDestroy, ElementRef } from '@angular/core';
import { ThyNotifyOption } from './notify-option.interface';
import { ThyNotifyService } from './notify.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { UpdateHostClassService } from '../shared/update-host-class.service';

@Component({
    selector: 'thy-notify',
    templateUrl: './notify.component.html',
    providers: [UpdateHostClassService],
    animations: [
        trigger('flyInOut', [
            state('in', style({ transform: 'translateX(0)', opacity: 1 })),
            transition('void => *', [style({ transform: 'translateX(100%)', opacity: 0 }), animate(100)]),
            transition('* => void', [animate(100, style({ transform: 'translateX(100%)', opacity: 0 }))])
        ])
    ]
})
export class ThyNotifyComponent implements OnInit, OnDestroy {
    @HostBinding('@flyInOut') flyInOut = 'in';

    @HostBinding('class') className = '';

    option: ThyNotifyOption;

    notifyIconName = '';

    extendContentClass = false;

    closeTimer: any;

    isShowDetail = false;

    @Input()
    set thyOption(value: ThyNotifyOption) {
        this.option = value;
        const type = value.type;
        this.className = `thy-notify thy-notify-${type}`;
    }

    constructor(private notifyService: ThyNotifyService) {}

    ngOnInit() {
        const iconName = {
            success: 'check-circle-fill',
            info: 'info-circle-fill',
            warning: 'waring-fill',
            error: 'close-circle-fill'
        };

        this.notifyIconName = iconName[this.option.type];
        this._creatCloseTimer();
    }

    ngOnDestroy() {
        this._clearCloseTimer();
    }

    extendContent() {
        this.extendContentClass = true;
    }

    showDetailToggle() {
        this.isShowDetail = !this.isShowDetail;
    }

    closeNotify() {
        this.notifyService.removeItemById(this.option.id);
    }

    @HostListener('mouseenter') mouseenter() {
        if (this.option.pauseOnHover) {
            this._clearCloseTimer();
        }
    }

    @HostListener('mouseleave') mouseleave() {
        if (this.option.pauseOnHover) {
            this._creatCloseTimer();
        }
    }

    private _creatCloseTimer() {
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
