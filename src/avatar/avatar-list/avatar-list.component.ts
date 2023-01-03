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
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    TemplateRef,
    ViewChild
} from '@angular/core';
import { InputBoolean, UpdateHostClassService } from 'ngx-tethys/core';
import { merge, Observable, of, Subject } from 'rxjs';
import { debounceTime, take, takeUntil } from 'rxjs/operators';
import { DEFAULT_SIZE, ThyAvatarComponent } from '../avatar.component';
import { SafeAny } from '../../types';

const AVATAR_LIST_SPACE = 6;

const AvATAR_LIST_OVERLAP_SPACE = -8;

const thyAvatarListSizeMap = {
    xs: 24,
    sm: 28,
    md: 32,
    lg: 44
};

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
        class: 'thy-avatar-list'
    },
    providers: [UpdateHostClassService]
})
export class ThyAvatarListComponent implements OnInit, OnDestroy, AfterContentInit, AfterViewInit {
    @HostBinding('class.thy-avatar-list-overlap') overlapMode = false;

    private ngUnsubscribe$ = new Subject<void>();

    private get avatarSpace() {
        return this.overlapMode ? AvATAR_LIST_OVERLAP_SPACE : AVATAR_LIST_SPACE;
    }

    public get avatarListArray() {
        return this.avatarList.toArray();
    }

    public get avatarSize() {
        if (thyAvatarListSizeMap[this.thyAvatarSize]) {
            return thyAvatarListSizeMap[this.thyAvatarSize];
        } else {
            return DEFAULT_SIZE;
        }
    }

    public avatarComponents: ThyAvatarComponent[];

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
     * 大小
     * @type xs(24) | sm(28) | md(32) |default(36) | lg(44)
     * @default:36
     */
    @Input() thyAvatarSize: keyof typeof thyAvatarListSizeMap;

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
    @ContentChildren(ThyAvatarComponent) avatarList: QueryList<ThyAvatarComponent>;

    @ViewChild('appendContent') appendContent: ElementRef<HTMLInputElement>;

    constructor(private elementRef: ElementRef, private ngZone: NgZone) {}

    ngOnInit() {}

    ngAfterContentInit() {
        this.setAvailableAvatar();
    }

    ngAfterViewInit() {
        this.ngZone.onStable.pipe(take(1)).subscribe(() => {
            if (this.appendContent) {
                this.setAvailableAvatar();
            }
        });

        if (this.thyResponsive) {
            this.ngZone.runOutsideAngular(() => {
                merge(this.avatarList.changes, this.createResizeObserver(this.elementRef.nativeElement))
                    .pipe(debounceTime(100), takeUntil(this.ngUnsubscribe$))
                    .subscribe(() => {
                        this.setAvailableAvatar();
                    });
            });
        }
    }

    public remove(name: string) {
        this.thyOnRemove.emit(name);
    }

    private setAvailableAvatar() {
        const endIndex = this.getShowAvatarEndIndex();
        const max = this.thyMax || this.avatarListArray.length;
        const showCount = Math.max(0, Math.min(max, endIndex + 1));
        this.avatarComponents = this.avatarListArray.slice(0, showCount);
    }

    private getShowAvatarEndIndex() {
        const avatarsLength = this.avatarListArray.length;
        const wrapperWidth = this.elementRef.nativeElement.offsetWidth;
        const appendWidth = this.appendContent?.nativeElement.offsetWidth;
        let totalWidth = appendWidth || 0;
        let endIndex = avatarsLength;
        for (let i = 0; i < avatarsLength; i++) {
            const avatarWidth = this.avatarSize + this.avatarSpace;
            const _totalWidth = totalWidth + avatarWidth;
            if (_totalWidth > wrapperWidth) {
                endIndex = i - 1;
                break;
            } else {
                totalWidth = _totalWidth;
                endIndex = i;
            }
        }
        return endIndex;
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
