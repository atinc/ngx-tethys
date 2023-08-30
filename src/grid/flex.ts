import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
 * @name thy-flex, [thyFlex]
 */
@Component({
    selector: 'thy-flex, [thyFlex]',
    template: `<ng-content></ng-content>`,
    standalone: true,
    host: {
        class: 'thy-flex d-flex'
    }
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class ThyFlex implements OnInit, OnChanges {
    private hostRenderer = useHostRenderer();

    // /**
    //  * Flex 方向，如果 thyDirection 传递了值，以 thyDirection 为主
    //  */
    // @Input() thyFlex: ThyFlexDirection;

    /**
     * Flex 方向
     */
    @Input() thyDirection: ThyFlexDirection;

    /**
     * Flex Wrap
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
     * Gap
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
        if (hasChanges(changes)) {
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
 * @name thy-flex-item, [thyFlexItem]
 */
@Component({
    selector: 'thy-flex-item, [thyFlexItem]',
    template: `<ng-content></ng-content>`,
    standalone: true,
    host: {
        class: 'thy-flex-item'
    }
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class ThyFlexItem implements OnInit, OnChanges {
    private hostRenderer = useHostRenderer();

    /**
     * Flex Item 属性，表示 grow 、shrink 、basis
     */
    @Input() thyFlexItem: 'fill' | string;

    @Input() thyGrow: ThyFlexGrow;

    @Input() thyShrink: ThyFlexShrink;

    @Input() thyBasis: string;

    constructor() {}

    ngOnInit(): void {
        this.updateClasses();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (hasChanges(changes)) {
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

function normalizeStartEnd(value: string): string {
    return value === 'flex-start' ? 'start' : value === 'flex-end' ? 'end' : value;
}

function hasChanges(changes: SimpleChanges): boolean {
    const hasChange = Object.keys(changes).find(key => {
        return changes[key] && !changes[key].isFirstChange();
    });
    return !!hasChange;
}
