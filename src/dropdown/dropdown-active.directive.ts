import { AfterContentInit, ContentChildren, Directive, OnInit, QueryList, Signal, computed, inject, input } from '@angular/core';
import { useHostRenderer } from '@tethys/cdk/dom';
import { coerceArray } from 'ngx-tethys/util';
import { mergeMap, startWith } from 'rxjs';
import { ThyDropdownDirective } from './dropdown.directive';
import { outputToObservable } from '@angular/core/rxjs-interop';

/**
 * 跟踪 Dropdown 菜单是否被打开处于激活状态，允许指定一个或多个CSS类，以便在菜单打开状态时添加到元素中
 * @name thyDropdownActive
 * @order 60
 */
@Directive({
    selector: '[thyDropdownActive]'
})
export class ThyDropdownActiveDirective implements OnInit, AfterContentInit {
    private trigger = inject(ThyDropdownDirective, { optional: true });

    readonly classes: Signal<string[]> = computed(() => {
        return coerceArray(this.thyDropdownActive()).filter(c => !!c);
    });

    private hostRenderer = useHostRenderer();

    /**
     * 设置 Active 样式类，可以是一个或多个CSS类
     * @type string[] | string
     */
    readonly thyDropdownActive = input<string[] | string>();

    /**
     * @private
     */
    @ContentChildren(ThyDropdownDirective, { descendants: true }) triggers!: QueryList<ThyDropdownDirective>;

    ngOnInit(): void {}

    ngAfterContentInit(): void {
        this.triggers.changes
            .pipe(
                startWith(this.triggers.toArray()),
                mergeMap((triggers: ThyDropdownDirective[]) => {
                    const result = triggers.map(item => {
                        return outputToObservable(item.thyActiveChange);
                    });
                    this.trigger && result.push(outputToObservable(this.trigger.thyActiveChange));
                    return result;
                }),
                mergeMap(result => {
                    return result;
                })
            )
            .subscribe(active => {
                this.update(active);
            });
    }

    update(active: boolean) {
        this.classes().forEach(className => {
            if (active) {
                this.hostRenderer.addClass(className);
            } else {
                this.hostRenderer.removeClass(className);
            }
        });
    }
}
