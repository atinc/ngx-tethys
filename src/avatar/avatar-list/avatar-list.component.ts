import { coerceBooleanProperty } from '@angular/cdk/coercion';
import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ContentChildren,
    ElementRef,
    Input,
    NgZone,
    OnChanges,
    OnDestroy,
    OnInit,
    QueryList,
    Renderer2,
    SimpleChanges
} from '@angular/core';
import { Constructor, InputBoolean, MixinBase, mixinUnsubscribe, ThyUnsubscribe, UpdateHostClassService } from 'ngx-tethys/core';
import { Observable, of, merge } from 'rxjs';
import { debounceTime, take, takeUntil } from 'rxjs/operators';
import { ThyAvatarComponent, thyAvatarSizeMap } from '../avatar.component';

const _MixinBase: Constructor<ThyUnsubscribe> & typeof MixinBase = mixinUnsubscribe(MixinBase);

export const enum ThyAvatarListMode {
    overlap = 'overlap',
    default = 'default'
}

const avatarListTypeClassesMap = {
    overlap: ['thy-avatar-list', 'thy-avatar-list-overlap'],
    default: ['thy-avatar-list']
};

@Component({
    selector: 'thy-avatar-list',
    templateUrl: `./avatar-list.component.html`,
    host: {
        class: 'thy-avatar-list'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [UpdateHostClassService]
})
export class ThyAvatarListComponent extends _MixinBase implements OnInit, OnChanges, AfterViewInit, OnDestroy {
    @ContentChildren(ThyAvatarComponent, { descendants: true }) avatarList: QueryList<ThyAvatarComponent>;

    private mode = ThyAvatarListMode.default;

    private showRemove = false;

    private initialized = false;

    public exceedCount = 0;

    @Input()
    set thyMode(value: ThyAvatarListMode) {
        this.mode = value || this.mode;
        if (this.initialized) {
            this.updateClasses();
        }
    }

    @Input()
    @InputBoolean()
    thyResponsive: boolean;

    @Input() thyRemovable: boolean;

    @Input() thyMaxLength: number;

    @Input() thySize: number | string;

    @Input()
    set thyShowRemove(value: boolean) {
        this.showRemove = coerceBooleanProperty(value);
    }

    private updateClasses() {
        let classNames: string[] = [];
        if (avatarListTypeClassesMap[this.mode]) {
            classNames = [...avatarListTypeClassesMap[this.mode]];
        }

        this.updateHostClass.updateClass(classNames);
    }

    constructor(private updateHostClass: UpdateHostClassService, private renderer: Renderer2, private elementRef: ElementRef) {
        super();
        this.updateHostClass.initializeElement(elementRef.nativeElement);
    }

    ngOnInit() {
        if (!this.thyResponsive) {
            this.initialized = true;
        }

        this.updateClasses();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.thyMaxLength && !changes.thyMaxLength.firstChange && this.avatarList) {
            this.setHiddenAvatar(this.avatarList.toArray());
        }
        if (changes.thySize && !changes.thySize.firstChange && this.avatarList) {
            this.setAvatarSize(this.avatarList.toArray());
        }
    }

    ngAfterViewInit() {
        if (this.thyResponsive) {
            this.avatarList.changes.subscribe((avatarList: ThyAvatarComponent[]) => {
                this.setHiddenAvatar(avatarList);
                this.setAvatarSize(avatarList);
            });
            this.setHiddenAvatar(this.avatarList.toArray());
            this.setAvatarSize(this.avatarList.toArray());
        }
    }

    private setAvatarsThyShowRemove(avatarList: ThyAvatarComponent[]) {
        avatarList.forEach((avatar: ThyAvatarComponent) => {
            avatar._showRemove = false;
        });
    }

    private setHiddenAvatar(avatarList: ThyAvatarComponent[]): void {
        const showIndex = Math.max(0, Math.min(this.thyMaxLength, avatarList.length));
        const showAvatars = avatarList.slice(0, showIndex);
        const exceedCount = Math.max(0, avatarList.length - this.thyMaxLength);
        (showAvatars || []).forEach((item, index) => {
            if (index === showAvatars.length - 1 && exceedCount) {
                const span = item.renderer.createElement('span');
                item.renderer.addClass(span, 'thy-avatar-exceed');
                item.renderer.setProperty(span, 'innerText', `+${exceedCount}`);
                item.renderer.appendChild(item.elementRef.nativeElement, span);
            }
            return item.setAvatarHidden(false);
        });
        const hiddenAvatars = showIndex === avatarList.length ? [] : avatarList.slice(showIndex);
        (hiddenAvatars || []).forEach(item => item.setAvatarHidden(true));
    }

    private setAvatarSize(avatarList: ThyAvatarComponent[]) {
        avatarList.forEach((avatar: ThyAvatarComponent) => {
            if (thyAvatarSizeMap[this.thySize]) {
                avatar.thySize = thyAvatarSizeMap[this.thySize];
            } else {
                avatar.thySize = (this.thySize as number) * 1;
            }
        });
    }

    ngOnDestroy() {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }
}
