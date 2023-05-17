import { NgClass, NgFor, NgIf, NgStyle, NgTemplateOutlet } from '@angular/common';
import {
    AfterContentInit,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    HostBinding,
    Input,
    OnChanges,
    OnDestroy,
    QueryList,
    SimpleChanges,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { UpdateHostClassService } from 'ngx-tethys/core';
import { SafeAny } from 'ngx-tethys/types';
import { Subject } from 'rxjs';
import { DEFAULT_SIZE, ThyAvatarComponent } from '../avatar.component';

export const THY_AVATAR_ITEM_SPACE = 4;

export const THY_OVERLAP_AVATAR_ITEM_SPACE = -8;

export const enum ThyAvatarListMode {
    overlap = 'overlap',
    default = 'default'
}
/**
 * 头像列表组件
 * @name thy-avatar-list
 * @order 20
 */
@Component({
    selector: 'thy-avatar-list',
    templateUrl: `./avatar-list.component.html`,
    host: {
        class: 'thy-avatar-list',
        '[style.margin-left.px]': 'overlapMode ? -avatarOverlapSpace : 0'
    },
    providers: [UpdateHostClassService],
    standalone: true,
    imports: [NgFor, NgStyle, ThyAvatarComponent, NgIf, NgClass, NgTemplateOutlet]
})
export class ThyAvatarListComponent implements OnChanges, OnDestroy, AfterContentInit {
    @HostBinding('class.thy-avatar-list-overlap') overlapMode = false;

    public avatarItems: ThyAvatarComponent[] = [];

    public avatarRenderItems: ThyAvatarComponent[] = [];

    public avatarSpace = THY_AVATAR_ITEM_SPACE;

    public avatarOverlapSpace = THY_OVERLAP_AVATAR_ITEM_SPACE;

    private ngUnsubscribe$ = new Subject<void>();

    /**
     * 展示方式
     * @type  overlap | default
     * @default default
     */
    @Input()
    set thyMode(value: ThyAvatarListMode) {
        this.overlapMode = value === ThyAvatarListMode.overlap;
    }

    /**
     * 头像大小
     * @type 22 | 24 | 28 | 32 | 36 | 44 | 48 | 68 | 110 | 160 | xxs(22px) | xs(24px) | sm(32px) | md(36px) | lg(48px)
     * @default 36
     */
    @Input() thyAvatarSize: number | string = DEFAULT_SIZE;

    /**
     *  append 自定义操作
     */
    @ContentChild('append', { static: false }) append: TemplateRef<SafeAny>;

    /**
     * @private
     */
    @ContentChildren(ThyAvatarComponent)
    private set avatarComponents(value: QueryList<ThyAvatarComponent>) {
        this.avatarItems = value.toArray();
    }

    @ViewChild('appendContent') appendContent: ElementRef<HTMLInputElement>;

    constructor() {}

    ngOnChanges(changes: SimpleChanges) {
        if (changes.thyAvatarSize && !changes.thyAvatarSize.firstChange) {
            this.setAvatarSize();
        }
    }

    ngAfterContentInit() {
        this.setAvatarSize();
    }

    private setAvatarSize() {
        this.avatarItems.forEach((avatar: ThyAvatarComponent) => {
            avatar.thySize = this.thyAvatarSize;
        });
    }

    ngOnDestroy() {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }
}
