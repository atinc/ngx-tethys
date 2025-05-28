import { ChangeDetectionStrategy, Component, Directive, computed, effect, input } from '@angular/core';
import { useHostRenderer } from '@tethys/cdk/dom';
import { isUndefinedOrNull } from '@tethys/cdk/is';

export type ThyFlexDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type ThyFlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
export type ThyFlexJustifyContent =
    | 'start'
    | 'end'
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'initial'
    | 'inherit';
export type ThyFlexAlignItems = 'start' | 'end' | 'stretch' | 'center' | 'flex-start' | 'flex-end' | 'baseline' | 'initial' | 'inherit';
export type ThyFlexGrow = '1' | '0' | 0 | 1;
export type ThyFlexShrink = '1' | '0' | 0 | 1;

/**
 * 设置容器为 Flex 布局组件
 * @name thy-flex, [thyFlex]
 * @order 20
 */
@Directive({
    selector: '[thyFlex]',
    host: {
        class: 'thy-flex d-flex'
    }
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class ThyFlex {
    private hostRenderer = useHostRenderer();

    /**
     * Flex 方向，为 row 或者 column
     * @default row
     */
    readonly thyDirection = input<ThyFlexDirection>();

    /**
     * Flex Wrap
     * @default nowrap
     */
    readonly thyWrap = input<ThyFlexWrap>();

    /**
     * Justify Content
     */
    readonly thyJustifyContent = input<ThyFlexJustifyContent>();

    /**
     * Align Items
     */
    readonly thyAlignItems = input<ThyFlexAlignItems>();

    /**
     * Flex Item 之间的间隙 Gap
     * @default 0
     */
    readonly thyGap = input<number>();

    protected readonly direction = computed(() => {
        return this.thyDirection() || 'row';
    });

    constructor() {
        effect(() => {
            this.updateClasses();
        });
    }

    private updateClasses() {
        const classes: string[] = [];
        const justifyContent = this.thyJustifyContent();
        if (!isUndefinedOrNull(justifyContent)) {
            classes.push(`justify-content-${normalizeStartEnd(justifyContent)}`);
        }

        const alignItems = this.thyAlignItems();
        if (!isUndefinedOrNull(alignItems)) {
            classes.push(`align-items-${normalizeStartEnd(alignItems)}`);
        }

        const wrap = this.thyWrap();
        if (!isUndefinedOrNull(wrap)) {
            classes.push(`flex-${wrap}`);
        }

        const direction = this.direction();
        if (!isUndefinedOrNull(direction)) {
            classes.push(`flex-${direction}`);
        }
        this.hostRenderer.updateClass(classes);
        this.hostRenderer.setStyle('gap', `${this.thyGap() ?? '0'}px`);
    }
}

/**
 * @internal
 */
@Component({
    selector: 'thy-flex',
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives: [
        {
            directive: ThyFlex,
            inputs: ['thyDirection', 'thyWrap', 'thyJustifyContent', 'thyAlignItems', 'thyGap']
        }
    ],
    imports: []
})
export class ThyFlexComponent {}

/**
 * 设置为 Flex Item 组件
 * @name thy-flex-item, [thyFlexItem]
 * @order 25
 */
@Directive({
    selector: '[thyFlexItem]',
    host: {
        class: 'thy-flex-item'
    }
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class ThyFlexItem {
    private hostRenderer = useHostRenderer();

    /**
     * Flex Item 属性，表示 grow 、shrink 、basis
     */
    readonly thyFlexItem = input<'fill' | string>();

    /**
     * Flew Grow，设置或检索弹性盒子的扩展比率，设置 1 为填充剩余区域
     */
    readonly thyGrow = input<ThyFlexGrow>();

    /**
     * Flex Shrink，设置或检索弹性盒收缩比例
     * @default 1
     */
    readonly thyShrink = input<ThyFlexShrink>();

    /**
     * Flex Basis，设置或检索弹性盒伸缩基准值
     * @default 1
     */
    readonly thyBasis = input<string>();

    constructor() {
        effect(() => {
            this.updateClasses();
        });
    }

    private updateClasses() {
        const flexItem = this.thyFlexItem();
        const classes: string[] = [];
        this.hostRenderer.setStyle('flex', '');
        this.hostRenderer.setStyle('basis', '');
        if (flexItem) {
            if (flexItem === 'fill') {
                classes.push(`flex-${flexItem}`);
            } else {
                this.hostRenderer.setStyle('flex', flexItem);
            }
        }
        const grow = this.thyGrow();
        if (!isUndefinedOrNull(grow)) {
            classes.push(`flex-grow-${grow}`);
        }
        const shrink = this.thyShrink();
        if (!isUndefinedOrNull(shrink)) {
            classes.push(`flex-shrink-${shrink}`);
        }
        const basis = this.thyBasis();
        if (!isUndefinedOrNull(basis)) {
            this.hostRenderer.setStyle('flex-basis', basis);
        }
        this.hostRenderer.updateClass(classes);
    }
}

/**
 * @internal
 */
@Component({
    selector: 'thy-flex-item',
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [],
    hostDirectives: [
        {
            directive: ThyFlexItem,
            inputs: ['thyFlexItem', 'thyGrow', 'thyShrink', 'thyBasis']
        }
    ]
})
export class ThyFlexItemComponent {}

function normalizeStartEnd(value: string): string {
    return value === 'flex-start' ? 'start' : value === 'flex-end' ? 'end' : value;
}
