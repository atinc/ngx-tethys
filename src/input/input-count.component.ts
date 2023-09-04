import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef, Optional } from '@angular/core';
import { ThyInputDirective } from './input.directive';
import { UnsubscribeMixin } from 'ngx-tethys/core';
import { takeUntil, switchMap, filter, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ThyInputGroupComponent } from './input-group.component';

/**
 * 输入框输入文字展示
 * @name thy-input-count
 * @order 40
 */
@Component({
    selector: 'thy-input-count',
    template: '{{inputLength}} / {{maxLength}}',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'thy-input-count text-muted'
    },
    standalone: true
})
export class ThyInputCountComponent extends UnsubscribeMixin implements OnInit {
    private hasInput = false;

    /**
     * 输入框组件，如果不传默认会读取外层 thy-input-group 下的 thyInput 指令
     * @type ThyInputDirective
     */
    @Input() set thyInput(value: ThyInputDirective) {
        this.hasInput = true;
        this.thyInput$.next(value);
    }

    maxLength: number | string;

    inputLength = 0;

    thyInput$ = new Subject<ThyInputDirective>();

    constructor(private changeDetectorRef: ChangeDetectorRef, @Optional() private inputGroup: ThyInputGroupComponent) {
        super();
        this.setup();
    }

    setup() {
        this.thyInput$
            .pipe(
                filter(input => {
                    return !!input;
                }),
                tap(input => {
                    this.maxLength = input.nativeElement.getAttribute('maxlength');
                    this.changeDetectorRef.markForCheck();
                }),
                takeUntil(this.ngUnsubscribe$),
                switchMap(input => {
                    return input.ngControl.valueChanges;
                }),
                tap(value => {
                    this.inputLength = value?.length || 0;
                    this.changeDetectorRef.markForCheck();
                }),
                takeUntil(this.ngUnsubscribe$)
            )
            .subscribe();
    }

    ngOnInit(): void {
        if (!this.hasInput && this.inputGroup && this.inputGroup.inputDirective) {
            this.thyInput$.next(this.inputGroup.inputDirective);
        }
    }
}
