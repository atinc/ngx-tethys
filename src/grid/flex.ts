import { ChangeDetectionStrategy, Component, Directive, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { useHostRenderer } from '@tethys/cdk/dom';
import { isUndefinedOrNull } from '@tethys/cdk/is';
import { hasLaterChange } from 'ngx-tethys/util';

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
    standalone: true,
    host: {
        class: 'thy-flex d-flex'
    }
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class ThyFlex implements OnInit, OnChanges {
    private hostRenderer = useHostRenderer();

    /**
     * Flex 方向，为 row 或者 column
     * @default row
     */
    @Input() thyDirection: ThyFlexDirection;

    /**
     * Flex Wrap
     * @default nowrap
     */
    @Input() thyWrap: ThyFlexWrap;

    /**
     * Justify Content
     */
    @Input() thyJustifyContent: ThyFlexJustifyContent;

    /**
     * Align Items
     */
    @Input() thyAlignItems: ThyFlexAlignItems;

    /**
     * Flex Item 之间的间隙 Gap
     * @default 0
     */
    @Input() thyGap: number;

    get direction() {
        const direction = this.thyDirection ?? this.thyDirection;
        return direction || 'row';
    }

    constructor() {}

    ngOnInit(): void {
        this.updateClasses();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (hasLaterChange(changes)) {
            this.updateClasses();
        }
    }

    private updateClasses() {
        const classes: string[] = [];
        if (!isUndefinedOrNull(this.thyJustifyContent)) {
            classes.push(`justify-content-${normalizeStartEnd(this.thyJustifyContent)}`);
        }
        if (!isUndefinedOrNull(this.thyAlignItems)) {
            classes.push(`align-items-${normalizeStartEnd(this.thyAlignItems)}`);
        }
        if (!isUndefinedOrNull(this.thyWrap)) {
            classes.push(`flex-${this.thyWrap}`);
        }
        if (!isUndefinedOrNull(this.direction)) {
            classes.push(`flex-${this.direction}`);
        }
        this.hostRenderer.updateClass(classes);
        this.hostRenderer.setStyle('gap', `${this.thyGap ?? '0'}px`);
    }
}

/**
 * @internal
 */
@Component({
    selector: 'thy-flex',
    template: `<ng-content></ng-content>`,
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    hostDirectives: [
        {
            directive: ThyFlex,
            inputs: ['thyDirection', 'thyWrap', 'thyJustifyContent', 'thyAlignItems', 'thyGap']
        }
    ],
    imports: [ThyFlex]
})
export class ThyFlexComponent {}

/**
 * 设置为 Flex Item 组件
 * @name thy-flex-item, [thyFlexItem]
 * @order 25
 */
@Directive({
    selector: '[thyFlexItem]',
    standalone: true,
    host: {
        class: 'thy-flex-item'
    }
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class ThyFlexItem implements OnInit, OnChanges {
    private hostRenderer = useHostRenderer();

    /**
     * Flex Item 属性，表示 grow 、shrink 、basis
     */
    @Input() thyFlexItem: 'fill' | string;

    /**
     * Flew Grow，设置或检索弹性盒子的扩展比率，设置 1 为填充剩余区域
     */
    @Input() thyGrow: ThyFlexGrow;

    /**
     * Flex Shrink，设置或检索弹性盒收缩比例
     * @default 1
     */
    @Input() thyShrink: ThyFlexShrink;

    /**
     * Flex Basis，设置或检索弹性盒伸缩基准值
     * @default 1
     */
    @Input() thyBasis: string;

    constructor() {}

    ngOnInit(): void {
        this.updateClasses();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (hasLaterChange(changes)) {
            this.updateClasses();
        }
    }

    private updateClasses() {
        const classes: string[] = [];
        this.hostRenderer.setStyle('flex', '');
        this.hostRenderer.setStyle('basis', '');
        if (this.thyFlexItem) {
            if (this.thyFlexItem === 'fill') {
                classes.push(`flex-${this.thyFlexItem}`);
            } else {
                this.hostRenderer.setStyle('flex', this.thyFlexItem);
            }
        }
        if (!isUndefinedOrNull(this.thyGrow)) {
            classes.push(`flex-grow-${this.thyGrow}`);
        }
        if (!isUndefinedOrNull(this.thyShrink)) {
            classes.push(`flex-shrink-${this.thyShrink}`);
        }
        if (!isUndefinedOrNull(this.thyBasis)) {
            this.hostRenderer.setStyle('flex-basis', this.thyBasis);
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
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ThyFlexItem],
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
