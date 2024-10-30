import { Directive, HostBinding, Input, HostListener, ElementRef, OnInit, inject } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, shareReplay } from 'rxjs/operators';
import { useHostRenderer } from '@tethys/cdk/dom';
import { coerceBooleanProperty } from 'ngx-tethys/util';

export type ThyDropdownMenuItemType = 'default' | 'danger' | 'success' | '';

/**
 * 菜单项
 * @name thyDropdownMenuItem
 * @order 30
 */
@Directive({
    selector: '[thyDropdownMenuItem]',
    standalone: true
})
export class ThyDropdownMenuItemDirective implements OnInit {
    private elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

    @HostBinding('class.dropdown-menu-item') className = true;

    @HostBinding('class.dropdown-menu-item--disabled') disabled = false;

    @HostBinding('class.dropdown-menu-item--danger') danger = false;

    @HostBinding('class.dropdown-menu-item--success') success = false;

    /**
     * 菜单项类型
     * @type 'default' | 'danger' | 'success' | ''
     * @default default
     */
    @Input()
    set thyType(value: ThyDropdownMenuItemType) {
        this[value] = true;
    }

    /**
     * 菜单项是否处于禁用状态
     * @default false
     */
    @Input({ transform: coerceBooleanProperty })
    set thyDisabled(value: boolean) {
        this.disabled = value;
    }

    @HostListener('click', ['$event'])
    onClick(event: Event): void {
        if (this.disabled) {
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
    selector: '[thyDropdownMenuItemIcon]',
    standalone: true
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
    selector: '[thyDropdownMenuItemName]',
    standalone: true
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
    selector: '[thyDropdownMenuItemMeta]',
    standalone: true
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
    selector: '[thyDropdownMenuItemDesc]',
    standalone: true
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
    selector: '[thyDropdownMenuItemExtendIcon]',
    standalone: true
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
    standalone: true
})
export class ThyDropdownMenuItemActiveDirective {
    /**
     * 是否激活
     * @type boolean | string
     * @default false
     */
    @HostBinding('class.active')
    @Input({ transform: coerceBooleanProperty })
    thyDropdownMenuItemActive: boolean;

    constructor() {}
}
