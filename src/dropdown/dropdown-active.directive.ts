import { Directive, OnInit, Signal, computed, contentChildren, effect, inject, input } from '@angular/core';
import { useHostRenderer } from '@tethys/cdk/dom';
import { coerceArray } from 'ngx-tethys/util';
import { ThyDropdownDirective } from './dropdown.directive';

/**
 * 跟踪 Dropdown 菜单是否被打开处于激活状态，允许指定一个或多个CSS类，以便在菜单打开状态时添加到元素中
 * @name thyDropdownActive
 * @order 60
 */
@Directive({
    selector: '[thyDropdownActive]'
})
export class ThyDropdownActiveDirective implements OnInit {
    private trigger = inject(ThyDropdownDirective, { optional: true });

    classes: Signal<string[]> = computed(() => {
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
    readonly triggers = contentChildren(ThyDropdownDirective, { descendants: true });

    constructor() {
        effect(() => {
            if (this.triggers()) {
                const result = this.triggers().map(item => {
                    return item.thyActiveChange;
                });
                this.trigger && result.push(this.trigger.thyActiveChange);
                result.forEach(item => {
                    item.subscribe(active => {
                        this.classes()?.forEach(className => {
                            if (active) {
                                this.hostRenderer.addClass(className);
                            } else {
                                this.hostRenderer.removeClass(className);
                            }
                        });
                    });
                });
            }
        });
    }

    ngOnInit(): void {}
}
