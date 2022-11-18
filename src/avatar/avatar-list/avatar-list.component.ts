import {
    AfterContentInit,
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Input,
    NgZone,
    OnDestroy,
    OnInit,
    Output,
    QueryList,
    TemplateRef
} from '@angular/core';
import { Constructor, InputBoolean, MixinBase, mixinUnsubscribe, ThyUnsubscribe, UpdateHostClassService } from 'ngx-tethys/core';
import { merge, Observable, of } from 'rxjs';
import { debounceTime, take, takeUntil } from 'rxjs/operators';
import { DEFAULT_SIZE, ThyAvatarComponent } from '../avatar.component';

const _MixinBase: Constructor<ThyUnsubscribe> & typeof MixinBase = mixinUnsubscribe(MixinBase);

export const enum ThyAvatarListMode {
    overlap = 'overlap',
    default = 'default'
}

@Component({
    selector: 'thy-avatar-list',
    templateUrl: `./avatar-list.component.html`,
    host: {
        class: 'thy-avatar-list',
        '[class.thy-avatar-list-overlap]': 'thyMode === "overlap"'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [UpdateHostClassService]
})
export class ThyAvatarListComponent extends _MixinBase implements OnInit, OnDestroy, AfterContentInit, AfterViewInit {
    private appendWidth = 0;

    public avatars: ThyAvatarComponent[];

    @Output() thyOnRemove = new EventEmitter();

    @Input() thyMode: ThyAvatarListMode;

    @Input()
    @InputBoolean()
    thyResponsive: boolean;

    @Input() thyMaxLength: number;

    @Input() thySize = DEFAULT_SIZE;

    @Input() thyRemovable = false;

    @ContentChild('append', { static: false }) append: TemplateRef<unknown>;

    @ContentChildren(ThyAvatarComponent) avatarList: QueryList<ThyAvatarComponent>;

    constructor(private elementRef: ElementRef, private ngZone: NgZone, private cdr: ChangeDetectorRef) {
        super();
    }

    ngOnInit() {}

    ngAfterContentInit() {
        this.setAvatar();
        this.setAvailableAvatar();
    }

    ngAfterViewInit() {
        this.ngZone.onStable.pipe(take(1)).subscribe(() => {
            this.setAppendOffset();
        });

        if (this.thyResponsive) {
            this.ngZone.runOutsideAngular(() => {
                merge(this.avatarList.changes, this.createResizeObserver(this.elementRef.nativeElement).pipe(debounceTime(100)))
                    .pipe(takeUntil(this.ngUnsubscribe$))
                    .subscribe(() => {
                        this.setAvailableAvatar();
                        this.cdr.detectChanges();
                    });
            });
        }
    }

    remove($event: Event) {
        this.thyOnRemove.emit($event);
    }

    private setAvailableAvatar() {
        const avatars = this.avatarList.toArray();
        const endIndex = this.getShowAvatarEndIndex();
        const max = this.thyMaxLength || avatars.length;
        const showIndex = Math.max(0, Math.min(max, avatars.length, endIndex));
        this.avatars = avatars.slice(0, showIndex);

        console.log(endIndex, max, avatars.length, 's');
        console.log(avatars, showIndex, this.avatars, 'avatars');
    }

    private setAvatar() {
        this.avatarList.toArray().forEach((avatar: ThyAvatarComponent) => {
            avatar.thySize = this.thySize;
            avatar.thyShowRemove = this.thyMode === ThyAvatarListMode.overlap ? false : this.thyRemovable;
        });
    }

    private getShowAvatarEndIndex() {
        const avatars = this.avatarList.toArray();
        const avatarsLength = avatars.length;
        let endIndex = avatarsLength;
        let totalWidth = 0;
        const wrapperWidth = this.elementRef.nativeElement.offsetWidth;
        for (let i = 0; i < avatarsLength; i += 1) {
            const avatarWidth = avatars[i]._size;
            const _totalWidth = totalWidth + avatarWidth;
            if (_totalWidth > wrapperWidth) {
                if (totalWidth + this.appendWidth < wrapperWidth) {
                    endIndex = i - 1;
                }
                break;
            } else {
                totalWidth = _totalWidth;
                endIndex = i + 1;
            }
        }
        return endIndex;
    }

    private setAppendOffset() {
        if (this.append) {
            this.appendWidth = this.elementRef.nativeElement.querySelector('.thy-avatar-list-append').offsetWidth;
        }
    }

    private createResizeObserver(element: HTMLElement) {
        return typeof ResizeObserver === 'undefined'
            ? of(null)
            : new Observable(observer => {
                  const resize = new ResizeObserver(entries => {
                      observer.next(entries);
                  });
                  resize.observe(element);
                  return () => {
                      resize.disconnect();
                  };
              });
    }
}
