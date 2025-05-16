import { Directive, ElementRef, HostBinding, HostListener, OnInit, computed, inject, input } from '@angular/core';
import { useHostRenderer } from '@tethys/cdk/dom';
import { coerceBooleanProperty } from 'ngx-tethys/util';
import { fromEvent } from 'rxjs';
import { debounceTime, shareReplay } from 'rxjs/operators';

export type ThyDropdownMenuItemType = 'default' | 'danger' | 'success' | '';

/**
 * 菜单项
 * @name thyDropdownMenuItem
 * @order 30
 */
@Directive({
    selector: '[thyDropdownMenuItem]',
    host: {
        class: 'dropdown-menu-item',
        '[class.dropdown-menu-item--disabled]': `thyDisabled()`,
        '[class.dropdown-menu-item--danger]': 'danger()',
        '[class.dropdown-menu-item--success]': 'success()'
    }
})
export class ThyDropdownMenuItemDirective implements OnInit {
    private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

    readonly danger = computed(() => this.thyType() === 'danger');

    readonly success = computed(() => this.thyType() === 'success');

    /**
     * 菜单项类型
     * @type 'default' | 'danger' | 'success' | ''
     */
    readonly thyType = input<ThyDropdownMenuItemType>('default');

    /**
     * 菜单项是否处于禁用状态
     */
    readonly thyDisabled = input(false, { transform: coerceBooleanProperty });

    @HostListener('click', ['$event'])
    onClick(event: Event): void {
        if (this.thyDisabled()) {
            event.stopPropagation();
            event.preventDefault();
        }
    }

    private hostRenderer = useHostRenderer();

    ngOnInit() {}

    updateClass(classes: string[]) {
        this.hostRenderer.updateClass(classes);
    }

    getElement() {
        return this.elementRef.nativeElement;
    }

    bindMouseenterEvent() {
        return fromEvent(this.elementRef.nativeElement, 'mouseenter').pipe(debounceTime(100), shareReplay());
    }
}

/**
 * 设置为菜单项图标
 * @name thyDropdownMenuItemIcon
 */
@Directive({
    selector: '[thyDropdownMenuItemIcon]'
})
export class ThyDropdownMenuItemIconDirective {
    @HostBinding('class.icon') className = true;

    constructor() {}
}

/**
 * 设置为菜单项名称
 * @name thyDropdownMenuItemName
 */
@Directive({
    selector: '[thyDropdownMenuItemName]'
})
export class ThyDropdownMenuItemNameDirective {
    @HostBinding('class.name') className = true;

    constructor() {}
}

/**
 * 设置为菜单项名称后的补充信息
 * @name thyDropdownMenuItemMeta
 */
@Directive({
    selector: '[thyDropdownMenuItemMeta]'
})
export class ThyDropdownMenuItemMetaDirective {
    @HostBinding('class.meta') className = true;

    constructor() {}
}

/**
 * 设置为菜单项的描述
 * @name thyDropdownMenuItemDesc
 */
@Directive({
    selector: '[thyDropdownMenuItemDesc]'
})
export class ThyDropdownMenuItemDescDirective {
    @HostBinding('class.desc') className = true;

    constructor() {}
}

/**
 * 菜单项的后置扩展图标，用于显示是否选中或者子菜单示意
 * @name thyDropdownMenuItemExtendIcon
 */
@Directive({
    selector: '[thyDropdownMenuItemExtendIcon]'
})
export class ThyDropdownMenuItemExtendIconDirective {
    @HostBinding('class.extend-icon') className = true;

    constructor() {}
}

/**
 * 菜单项是否激活指令
 * @name thyDropdownMenuItemActive
 * @order 70
 */
@Directive({
    selector: '[thyDropdownMenuItemActive]',
    host: {
        '[class.active]': `thyDropdownMenuItemActive()`
    }
})
export class ThyDropdownMenuItemActiveDirective {
    /**
     * 是否激活
     * @type boolean | string
     */
    readonly thyDropdownMenuItemActive = input(false, { transform: coerceBooleanProperty });

    constructor() {}
}
