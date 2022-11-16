import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChildren,
    ElementRef,
    Input,
    NgZone,
    OnChanges,
    OnDestroy,
    OnInit,
    QueryList,
    SimpleChanges
} from '@angular/core';
import { Constructor, InputBoolean, MixinBase, mixinUnsubscribe, ThyUnsubscribe, UpdateHostClassService } from 'ngx-tethys/core';
import { Observable, of } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { isNumber } from '../../util';
import { DEFAULT_SIZE, ThyAvatarComponent, thyAvatarSizeMap } from '../avatar.component';

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

    private availableAvatarNumber: number;

    private mode = ThyAvatarListMode.default;

    public exceedCount = 0;

    @Input()
    set thyMode(value: ThyAvatarListMode) {
        this.mode = value || this.mode;
    }

    get displayAvatars() {
        const availableAvatarNumber = this.availableAvatarNumber !== undefined ? this.availableAvatarNumber : this.avatarList.length;
        const max = Math.max(0, Math.min(this.thyMaxLength, this.avatarList.length, availableAvatarNumber));
        return this.avatarList
            .filter((avatar, index) => index < max)
            .map(avatar => {
                avatar.thyShowRemove = this.thyRemovable;
                avatar.thySize = this.thySize;
                return avatar;
            });
    }

    @Input()
    @InputBoolean()
    thyResponsive: boolean;

    @Input() thyRemovable: boolean;

    @Input() thyMaxLength: number;

    @Input() thySize: number | string = DEFAULT_SIZE;

    constructor(private ngZone: NgZone, private elementRef: ElementRef, private cdr: ChangeDetectorRef) {
        super();
    }

    ngOnChanges(changes: SimpleChanges): void {}

    ngAfterViewInit(): void {
        this.ngZone.runOutsideAngular(() => {
            this.createResizeObserver(this.elementRef.nativeElement)
                .pipe(debounceTime(100))
                .pipe(takeUntil(this.ngUnsubscribe$))
                .subscribe(() => {
                    this.resetSizes();
                    this.cdr.detectChanges();
                });
        });
    }

    resetSizes() {
        const elementWidth = this.elementRef.nativeElement.clientWidth;
        const cellWidth = (isNumber(this.thySize) ? this.thySize : thyAvatarSizeMap[this.thySize]) || DEFAULT_SIZE;
        const num = Math.floor(elementWidth / cellWidth);
        this.availableAvatarNumber = num;
    }

    ngOnInit(): void {}

    createResizeObserver(element: HTMLElement) {
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
