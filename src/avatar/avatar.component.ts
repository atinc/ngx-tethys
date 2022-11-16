import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    OnInit,
    Output,
    Renderer2,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { UpdateHostClassService } from 'ngx-tethys/core';
import { coerceBooleanProperty, isString } from 'ngx-tethys/util';
import { ThyAvatarService } from './avatar.service';

const sizeArray = [22, 24, 28, 32, 36, 44, 48, 68, 110, 160];

export const DEFAULT_SIZE = 36;

export const thyAvatarSizeMap = {
    xxs: 22,
    xs: 24,
    sm: 32,
    md: 36,
    lg: 48
};

/** https://html.spec.whatwg.org/multipage/embedded-content.html#attr-img-loading */
export type ThyAvatarLoading = 'eager' | 'lazy';

/** https://wicg.github.io/priority-hints/#idl-index */
export type ThyAvatarFetchPriority = 'high' | 'low' | 'auto';

@Component({
    selector: 'thy-avatar',
    templateUrl: './avatar.component.html',
    providers: [UpdateHostClassService],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThyAvatarComponent implements OnInit {
    _src: string;
    _name: string;
    _size: number;
    _showRemove = false;

    public avatarSrc: string;
    public avatarName?: string;
    public avatarNameSafeHtml?: SafeHtml;

    @ViewChild('contentTemplate', { static: true }) contentTemplate!: TemplateRef<any>;

    get content(): TemplateRef<any> {
        return this.contentTemplate;
    }

    @HostBinding('class.thy-avatar') _isAvatar = true;

    @Output() thyOnRemove = new EventEmitter();

    @Output() thyError: EventEmitter<Event> = new EventEmitter<Event>();

    @Input() thyShowName: boolean;

    @Input()
    set thySrc(value: string) {
        this._setAvatarSrc(value);
    }

    @Input()
    set thyName(value: string) {
        // this._name = value;
        this._setAvatarName(value);
    }

    @Input()
    set thySize(value: number | string) {
        if (thyAvatarSizeMap[value]) {
            this._setAvatarSize(thyAvatarSizeMap[value]);
        } else {
            this._setAvatarSize((value as number) * 1);
        }
    }

    @Input()
    set thyShowRemove(value: boolean) {
        this._showRemove = coerceBooleanProperty(value);
    }

    @Input() thyImgClass: string;

    @Input() thyDisabled: boolean;

    @Input() thyLoading?: ThyAvatarLoading;

    @Input() thyFetchPriority?: ThyAvatarFetchPriority;

    _setAvatarSize(size: number) {
        if (sizeArray.indexOf(size) > -1) {
            this._size = size;
        } else {
            this._size = this.findClosestSize(sizeArray, size);
        }

        this.updateHostClassService.updateClass([`thy-avatar-${this._size}`]);
    }

    private findClosestSize(sizes: number[], value: number): number {
        let left = 0,
            right = sizes.length - 1,
            middle: number,
            result: number;

        while (left <= right) {
            middle = Math.floor((left + right) / 2);
            if (right - left <= 1) {
                result = sizes[right];
                break;
            }
            result = sizes[middle];
            if (result === value) {
                return value;
            } else if (result > value) {
                right = middle;
            } else {
                left = middle;
            }
        }
        return value - sizes[left] < sizes[right] - value ? sizes[left] : sizes[right];
    }

    private _setAvatarSrc(src: string) {
        if (src && this.thyAvatarService.ignoreAvatarSrcPaths.indexOf(src) < 0) {
            this._src = src;
        } else {
            this._src = null;
        }
    }

    private _setAvatarName(value: string) {
        const name = this.thyAvatarService.nameTransform(value);
        if (isString(name)) {
            this.avatarName = name as string;
        } else {
            this.avatarName = value;
            this.avatarNameSafeHtml = name;
        }
    }

    constructor(
        private updateHostClassService: UpdateHostClassService,
        public renderer: Renderer2,
        public elementRef: ElementRef,
        private thyAvatarService: ThyAvatarService
    ) {
        updateHostClassService.initializeElement(elementRef.nativeElement);
    }

    ngOnInit() {
        if (!this._size) {
            this._setAvatarSize(DEFAULT_SIZE);
        }
    }

    remove($event: Event) {
        this.thyOnRemove.emit($event);
    }

    avatarImgError($event: Event) {
        this._setAvatarSrc(null);
        this.thyError.emit($event);
    }

    setAvatarHidden(value: boolean) {
        if (value) {
            this.renderer.addClass(this.elementRef.nativeElement, 'thy-avatar-hidden');
        } else {
            this.renderer.removeClass(this.elementRef.nativeElement, 'thy-avatar-hidden');
        }
    }
}
