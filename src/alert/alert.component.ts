import {
    Component,
    Input,
    OnInit,
    ContentChild,
    TemplateRef,
    OnChanges,
    ChangeDetectionStrategy,
    ElementRef,
    SimpleChanges
} from '@angular/core';
import { isString } from 'ngx-tethys/util';
import { UpdateHostClassService } from 'ngx-tethys/core';

const weakTypes = ['primary-weak', 'success-weak', 'warning-weak', 'danger-weak'];

type ThyAlertType =
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
    | 'primary'
    | 'primary-weak'
    | 'success-weak'
    | 'warning-weak'
    | 'danger-weak';

export type ThyAlertTheme = 'fill' | 'bordered' | 'naked';

const typeIconsMap: Record<string, string> = {
    success: 'check-circle-fill',
    warning: 'waring-fill',
    danger: 'close-circle-fill',
    info: 'minus-circle-fill',
    primary: 'info-circle-fill',
    'primary-weak': 'info-circle-fill',
    'success-weak': 'check-circle-fill',
    'warning-weak': 'waring-fill',
    'danger-weak': 'close-circle-fill'
};
@Component({
    selector: 'thy-alert',
    templateUrl: './alert.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'thy-alert',
        '[class.thy-alert-hidden]': 'hidden'
    },
    providers: [UpdateHostClassService]
})
export class ThyAlertComponent implements OnInit, OnChanges {
    private hidden = false;

    private showIcon = true;

    private icon: string;

    private type: ThyAlertType = 'info';

    public theme: ThyAlertTheme = 'fill';

    messageTemplate: TemplateRef<HTMLElement>;

    messageText: string;

    @Input() set thyType(value: ThyAlertType) {
        this.type = value;
    }

    @Input() set thyTheme(value: ThyAlertTheme) {
        this.theme = value;
    }

    @Input() set thyMessage(value: string | TemplateRef<HTMLElement>) {
        if (value instanceof TemplateRef) {
            this.messageTemplate = value;
        } else {
            this.messageText = value;
        }
    }

    @Input()
    set thyIcon(value: boolean | string) {
        if (value) {
            this.showIcon = true;
            this.icon = isString(value) ? value.toString() : null;
        } else {
            this.showIcon = false;
        }
    }

    get thyIcon() {
        if (this.showIcon) {
            return this.icon || typeIconsMap[this.type];
        } else {
            return null;
        }
    }

    @Input() thyCloseable: boolean;

    @ContentChild('operation') alertOperation: TemplateRef<any>;

    constructor(private updateHostClassService: UpdateHostClassService, private elementRef: ElementRef<HTMLElement>) {
        this.updateHostClassService.initializeElement(this.elementRef.nativeElement);
    }

    ngOnInit() {
        this.updateClass();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if ((changes.thyTheme && !changes.thyTheme.firstChange) || (changes.thyType && !changes.thyType.firstChange)) {
            this.updateClass();
        }
    }

    closeAlert() {
        this.hidden = true;
    }

    private updateClass() {
        // 兼容 'primary-weak', 'success-weak', 'warning-weak', 'danger-weak' types
        let theme = this.theme;
        let type = this.type;
        if (weakTypes.includes(this.type)) {
            theme = 'bordered';
            type = this.type.split('-')[0] as ThyAlertType;
        }
        this.updateHostClassService.updateClass([`thy-alert-${theme}`, `thy-alert-${theme}-${type}`]);
    }
}
