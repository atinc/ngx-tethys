import {
    AfterContentInit,
    ChangeDetectionStrategy,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    SimpleChanges,
    TemplateRef
} from '@angular/core';
import { Constructor, InputBoolean, MixinBase, mixinUnsubscribe, ThyUnsubscribe, UpdateHostClassService } from 'ngx-tethys/core';
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
export class ThyAvatarListComponent extends _MixinBase implements OnInit, OnChanges, OnDestroy, AfterContentInit {
    @ContentChildren(ThyAvatarComponent, { descendants: true }) avatarList: QueryList<ThyAvatarComponent>;

    private mode = ThyAvatarListMode.default;

    @Output() thyOnRemove = new EventEmitter();

    @Input()
    set thyMode(value: ThyAvatarListMode) {
        this.mode = value || this.mode;
        this.updateClasses();
    }

    @Input()
    @InputBoolean()
    thyResponsive: boolean;

    @Input() thyMaxLength = 10;

    @Input() thySize = 28;

    @Input() thyRemovable = false;

    @ContentChild('append') append: TemplateRef<unknown>;

    private updateClasses() {
        let classNames: string[] = [];
        if (avatarListTypeClassesMap[this.mode]) {
            classNames = [...avatarListTypeClassesMap[this.mode]];
        }

        this.updateHostClass.updateClass(classNames);
    }

    constructor(private updateHostClass: UpdateHostClassService, private elementRef: ElementRef) {
        super();
        this.updateHostClass.initializeElement(elementRef.nativeElement);
    }

    ngOnInit() {
        this.updateClasses();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.thyMaxLength && !changes.thyMaxLength.firstChange && this.avatarList) {
            this.setHiddenAvatar(this.avatarList.toArray());
        }
        if (changes.thySize && !changes.thySize.firstChange && this.avatarList) {
            this.setAvatarSize(this.avatarList.toArray());
        }

        if (changes.thyRemovable && !changes.thyRemovable.firstChange && this.avatarList) {
            this.setAvatarsThyRemoveAble(this.avatarList.toArray());
        }
    }

    ngAfterContentInit() {
        this.avatarList.changes.subscribe((avatarList: ThyAvatarComponent[]) => {
            this.setHiddenAvatar(avatarList);
            this.setAvatarSize(avatarList);
            this.setAvatarsThyRemoveAble(avatarList);
        });
        this.setHiddenAvatar(this.avatarList.toArray());
        this.setAvatarSize(this.avatarList.toArray());
        this.setAvatarsThyRemoveAble(this.avatarList.toArray());
    }

    private setAvatarsThyRemoveAble(avatarList: ThyAvatarComponent[]) {
        (avatarList || []).forEach((avatar: ThyAvatarComponent) => {
            if (this.mode === ThyAvatarListMode.overlap) {
                avatar.thyShowRemove = false;
            } else {
                avatar.thyShowRemove = this.thyRemovable;
            }
        });
    }

    private setHiddenAvatar(avatarList: ThyAvatarComponent[]) {
        const showIndex = Math.max(0, Math.min(this.thyMaxLength, avatarList.length));
        const showAvatars = avatarList.slice(0, showIndex);
        const exceedCount = Math.max(0, avatarList.length - this.thyMaxLength);
        (showAvatars || []).forEach((item, index) => {
            if (index === showAvatars.length - 1 && exceedCount) {
                this.createElement(item, exceedCount);
            }
            return this.setAvatarHidden(item, false);
        });
        const hiddenAvatars = showIndex === avatarList.length ? [] : avatarList.slice(showIndex);
        (hiddenAvatars || []).forEach(item => this.setAvatarHidden(item, true));
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

    private createElement(avatar: ThyAvatarComponent, exceedCount: number) {
        const span = avatar.renderer.createElement('span');
        avatar.renderer.addClass(span, 'thy-avatar-exceed');
        avatar.renderer.setProperty(span, 'innerText', `+${exceedCount}`);
        avatar.renderer.appendChild(avatar.elementRef.nativeElement, span);
    }

    private setAvatarHidden(avatar: ThyAvatarComponent, value: boolean) {
        if (value) {
            avatar.renderer.addClass(avatar.elementRef.nativeElement, 'thy-avatar-hidden');
        } else {
            avatar.renderer.removeClass(avatar.elementRef.nativeElement, 'thy-avatar-hidden');
        }
    }

    remove($event: Event) {
        this.thyOnRemove.emit($event);
    }

    ngOnDestroy() {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }
}
