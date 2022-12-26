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
    TemplateRef,
    ViewChild
} from '@angular/core';
import { InputBoolean, UpdateHostClassService } from 'ngx-tethys/core';
import { merge, Observable, of, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { DEFAULT_SIZE, ThyAvatarComponent } from '../avatar.component';

const AVATAR_LIST_MARGIN = 6;

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
export class ThyAvatarListComponent implements OnInit, OnDestroy, AfterContentInit, AfterViewInit {
    private ngUnsubscribe$ = new Subject<void>();

    public avatarComponents: ThyAvatarComponent[];

    public get showRemovable() {
        return this.thyMode === ThyAvatarListMode.overlap ? false : this.thyRemovable;
    }

    @Input() thyMode: ThyAvatarListMode;

    @Input()
    @InputBoolean()
    thyResponsive: boolean;

    @Input() thyMax: number;

    @Input() thyAvatarSize = DEFAULT_SIZE;

    @Input() thyRemovable = false;

    @Output() thyOnRemove = new EventEmitter();

    @ViewChild('appendContent') appendContent: ElementRef<HTMLInputElement>;

    @ContentChild('append', { static: false }) append: TemplateRef<unknown>;

    @ContentChildren(ThyAvatarComponent) avatarList: QueryList<ThyAvatarComponent>;

    constructor(private elementRef: ElementRef, private ngZone: NgZone, private cdr: ChangeDetectorRef) {}

    ngOnInit() {}

    ngAfterContentInit() {
        this.setAvailableAvatar();
    }

    ngAfterViewInit() {
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
        const max = this.thyMax || avatars.length;
        const showCount = Math.max(0, Math.min(max, endIndex + 1));
        this.avatarComponents = avatars.slice(0, showCount);
    }

    private getShowAvatarEndIndex() {
        const avatars = this.avatarList.toArray();
        const avatarsLength = avatars.length;
        const wrapperWidth = this.elementRef.nativeElement.offsetWidth;
        let totalWidth = this.appendContent?.nativeElement.offsetWidth || 0;
        let endIndex = avatarsLength;
        for (let i = 0; i < avatarsLength; i++) {
            const avatarWidth = avatars[i]._size + AVATAR_LIST_MARGIN;
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
                      observer.next(entries);
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
