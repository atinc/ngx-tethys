import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { IThyCollapseItemComponent, IThyCollapseComponent, THY_COLLAPSE_COMPONENT } from './collapse.token';
import { coerceBooleanProperty } from 'ngx-tethys/util';

export type ThyCollapseTheme = 'divided' | 'bordered' | 'ghost';

export type ThyCollapsedIconPosition = 'left' | 'right';

/**
 * 折叠面板组件
 * @name thy-collapse
 * @order 10
 */
@Component({
    selector: 'thy-collapse',
    template: `
        <ng-container>
            <ng-content></ng-content>
        </ng-container>
    `,
    host: {
        class: 'thy-collapse',
        '[class.thy-collapse-divided]': `thyTheme === 'divided'`,
        '[class.thy-collapse-bordered]': `thyTheme === 'bordered'`,
        '[class.thy-collapse-ghost]': `thyTheme === 'ghost'`,
        '[class.thy-collapse-icon-position-right]': `thyArrowIconPosition === 'right'`,
        '[class.thy-collapse-icon-position-left]': `thyArrowIconPosition === 'left'`
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: THY_COLLAPSE_COMPONENT,
            useExisting: ThyCollapse
        }
    ]
})
export class ThyCollapse implements IThyCollapseComponent, OnInit {
    /**
     * 折叠面板主题，支持 `divided` | `bordered` | `ghost`
     */
    @Input() thyTheme: ThyCollapseTheme = 'divided';

    /**
     * 是否为手风琴模式，手风琴模式下，只能展开一个面板
     * @default false
     */
    @Input({ transform: coerceBooleanProperty }) thyAccordion: boolean;

    /**
     * 展开收起图标的位置
     * @type left | right
     */
    @Input() thyArrowIconPosition: ThyCollapsedIconPosition = 'left';

    private listOfCollapsePanelComponent: IThyCollapseItemComponent[] = [];

    constructor() {}

    ngOnInit() {}

    addPanel(value: IThyCollapseItemComponent): void {
        this.listOfCollapsePanelComponent.push(value);
    }

    removePanel(value: IThyCollapseItemComponent): void {
        this.listOfCollapsePanelComponent.splice(this.listOfCollapsePanelComponent.indexOf(value), 1);
    }

    click(collapseItem: IThyCollapseItemComponent, event: Event): void {
        if (this.thyAccordion && !collapseItem.thyActive) {
            this.listOfCollapsePanelComponent
                .filter(item => item !== collapseItem)
                .forEach(item => {
                    if (item.thyActive) {
                        item.thyActive = false;
                        item.thyActiveChange.emit({ active: collapseItem.thyActive, event });
                        item.markForCheck();
                    }
                });
        }
        collapseItem.thyActive = !collapseItem.thyActive;
        collapseItem.thyActiveChange.emit({ active: collapseItem.thyActive, event });
    }
}
