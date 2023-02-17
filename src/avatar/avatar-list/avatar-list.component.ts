import {
    AfterContentInit,
    AfterViewInit,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    HostBinding,
    Input,
    NgZone,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    SimpleChanges,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { InputBoolean, UpdateHostClassService } from 'ngx-tethys/core';
import { merge, Observable, of, Subject } from 'rxjs';
import { debounceTime, take, takeUntil } from 'rxjs/operators';
import { DEFAULT_SIZE, ThyAvatarComponent } from '../avatar.component';
import { SafeAny } from '../../types';

const AVATAR_ITEM_SPACE = 6;

const OVERLAP_AVATAR_ITEM_SPACE = -8;

export const enum ThyAvatarListMode {
    overlap = 'overlap',
    default = 'default'
}
/**
 * 头像列表组件
 */
@Component({
    selector: 'thy-avatar-list',
    templateUrl: `./avatar-list.component.html`,
    host: {
        class: 'thy-avatar-list',
        '[style.margin-left.px]': 'overlapMode ? -avatarOverlapSpace : 0'
    },
    providers: [UpdateHostClassService]
})
export class ThyAvatarListComponent implements OnInit, OnChanges, OnDestroy, AfterContentInit, AfterViewInit {
    @HostBinding('class.thy-avatar-list-overlap') overlapMode = false;

    public avatarItems: ThyAvatarComponent[];

    public avatarRenderItems: ThyAvatarComponent[] = [];

    public avatarSpace = AVATAR_ITEM_SPACE;

    public avatarOverlapSpace = OVERLAP_AVATAR_ITEM_SPACE;

    private ngUnsubscribe$ = new Subject<void>();

    private avatarList: QueryList<ThyAvatarComponent>;

    /**
     * 展示方式
     * @type  'overlap'| 'default'
     * @default default
     */
    @Input()
    set thyMode(value: ThyAvatarListMode) {
        this.overlapMode = value === ThyAvatarListMode.overlap;
    }

    /**
     * 响应式，自动计算宽度存放 avatar
     * @default false
     */
    @Input()
    @InputBoolean()
    thyResponsive = false;

    /**
     * 列表组件允许展示 avatar 最大数量
     */
    @Input() thyMax: number;

    /**
     * 头像大小
     * @type 22 | 24 | 28 | 32 | 36 | 44 | 48 | 68 | 110 | 160 | xxs(22px) | xs(24px) | sm(32px) | md(36px) | lg(48px)
     * @default 36
     */
    @Input() thyAvatarSize: number | string = DEFAULT_SIZE;

    /**
     * 是否展示移除按钮
     * @type boolean
     * @default false
     */
    @Input() thyRemovable = false;

    /**
     * avatar 移除按钮事件
     */
    @Output() thyOnRemove = new EventEmitter<string>();

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
        this.avatarList = value;
    }

    @ViewChild('appendContent') appendContent: ElementRef<HTMLInputElement>;

    constructor(private elementRef: ElementRef, private ngZone: NgZone) {}

    ngOnInit() {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.thyAvatarSize && !changes.thyAvatarSize.firstChange) {
            this.setAvatarSize();
        }

        if (changes.thyMax && !changes.thyMax.firstChange) {
            this.getRenderAvatar();
        }
    }

    ngAfterContentInit() {
        this.setAvatarSize();
    }

    ngAfterViewInit() {
        this.ngZone.onStable.pipe(take(1)).subscribe(() => {
            this.getRenderAvatar();
        });

        if (this.thyResponsive) {
            this.ngZone.runOutsideAngular(() => {
                merge(this.avatarList.changes, this.createResizeObserver(this.elementRef.nativeElement))
                    .pipe(debounceTime(100), takeUntil(this.ngUnsubscribe$))
                    .subscribe(() => {
                        this.getRenderAvatar();
                    });
            });
        }
    }

    private setAvatarSize() {
        this.avatarItems.forEach((avatar: ThyAvatarComponent) => {
            avatar.thySize = this.thyAvatarSize;
        });
        this.getRenderAvatar();
    }

    public remove(name: string) {
        this.thyOnRemove.emit(name);
    }

    private getRenderAvatar() {
        const endIndex = this.getEndIndex();
        const max = this.thyMax || this.avatarItems.length;
        const showCount = Math.max(0, Math.min(max, endIndex));
        this.avatarRenderItems = this.avatarItems.slice(0, showCount);
    }

    private getEndIndex() {
        if (this.avatarItems.length) {
            const space = this.overlapMode ? this.avatarOverlapSpace : this.avatarSpace;
            const avatarWidth = this.avatarItems[0]._size + space;
            const wrapperWidth = this.elementRef.nativeElement.offsetWidth;
            const appendWidth = this.appendContent ? this.appendContent.nativeElement.offsetWidth : 0;
            const lastAvatarSpecialSpace = this.overlapMode ? space : 0; // overlap 模式下最后一个 avatar 元素占位比其他多 this.avatarSpace 个 px
            return Math.floor((wrapperWidth - appendWidth + lastAvatarSpecialSpace) / avatarWidth);
        } else {
            return 0;
        }
    }

    private createResizeObserver(element: HTMLElement) {
        return typeof ResizeObserver === 'undefined'
            ? of(null)
            : new Observable(observer => {
                  const resize = new ResizeObserver(entries => {
                      this.ngZone.run(() => {
                          observer.next(entries);
                      });
                  });
                  resize.observe(element);
                  return () => {
                      resize.disconnect();
                  };
              });
    }

    ngOnDestroy() {
        this.ngUnsubscribe$.next();
        this.ngUnsubscribe$.complete();
    }
}
