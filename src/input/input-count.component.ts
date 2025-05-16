import { Component, OnInit, ChangeDetectionStrategy, inject, DestroyRef, input, effect, signal } from '@angular/core';
import { ThyInputDirective } from './input.directive';
import { switchMap, filter, tap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';
import { ThyInputGroup } from './input-group.component';

/**
 * 输入框输入文字展示
 * @name thy-input-count
 * @order 40
 */
@Component({
    selector: 'thy-input-count',
    template: '{{inputLength()}} / {{maxLength()}}',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'thy-input-count text-muted'
    }
})
export class ThyInputCount implements OnInit {
    private inputGroup = inject(ThyInputGroup, { optional: true })!;

    private readonly destroyRef = inject(DestroyRef);

    private hasInput = false;

    /**
     * 输入框组件，如果不传默认会读取外层 thy-input-group 下的 thyInput 指令
     * @type ThyInputDirective
     */
    readonly thyInput = input<ThyInputDirective>();

    maxLength = signal<number | string>(undefined);

    inputLength = signal(0);

    thyInput$ = new Subject<ThyInputDirective>();

    constructor() {
        this.setup();

        effect(() => {
            const input = this.thyInput();
            if (input) {
                this.hasInput = true;
                this.thyInput$.next(input);
            }
        });
    }

    setup() {
        this.thyInput$
            .pipe(
                filter(input => {
                    return !!input;
                }),
                tap(input => {
                    this.maxLength.set(input.nativeElement.getAttribute('maxlength'));
                }),
                takeUntilDestroyed(this.destroyRef),
                switchMap(input => {
                    return input.ngControl.valueChanges;
                }),
                tap(value => {
                    this.inputLength.set(value?.length || 0);
                }),
                takeUntilDestroyed(this.destroyRef)
            )
            .subscribe();
    }

    ngOnInit(): void {
        const inputDirective = this.inputGroup.inputDirective();
        if (!this.hasInput && this.inputGroup && inputDirective) {
            this.thyInput$.next(inputDirective);
        }
    }
}
