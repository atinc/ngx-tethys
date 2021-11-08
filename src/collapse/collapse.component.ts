import { UpdateHostClassService } from 'ngx-tethys/core';

import { ChangeDetectorRef, Component, ElementRef, forwardRef, HostBinding, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { ThyCollapsePanelComponent } from './collapse-panel.component';

export type Position = 'left' | 'right';
@Component({
    selector: 'thy-collapse',
    template: `
        <ng-container>
            <ng-content></ng-content>
        </ng-container>
    `,
    host: {
        '[class.thy-collapse-ghost]': 'thyGhost',
        '[class.thy-collapse-borderless]': '!thyBordered',
        '[class.thy-collapse-icon-position-right]': `thyExpandIconPosition === 'right'`,
        '[class.thy-collapse-icon-position-left]': `thyExpandIconPosition === 'left'`
    },
    providers: [
        UpdateHostClassService,
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ThyCollapseComponent),
            multi: true
        }
    ]
})
export class ThyCollapseComponent implements OnInit {
    constructor(private cdr: ChangeDetectorRef, private elementRef: ElementRef, private updateHostClassService: UpdateHostClassService) {}

    @HostBinding('class.thy-collapse') isCollapse = true;

    @Input() thyAccordion: boolean;

    @Input() thyBordered: boolean = true;

    @Input() thyExpandIconPosition: Position = 'left';

    @Input() thyGhost: boolean;

    private listOfCollapsePanelComponent: ThyCollapsePanelComponent[] = [];

    ngOnInit() {}

    addPanel(value: ThyCollapsePanelComponent): void {
        this.listOfCollapsePanelComponent.push(value);
    }

    removePanel(value: ThyCollapsePanelComponent): void {
        this.listOfCollapsePanelComponent.splice(this.listOfCollapsePanelComponent.indexOf(value), 1);
    }

    click(collapse: ThyCollapsePanelComponent, event: Event): void {
        if (this.thyAccordion && !collapse.thyActive) {
            this.listOfCollapsePanelComponent
                .filter(item => item !== collapse)
                .forEach(item => {
                    if (item.thyActive) {
                        item.thyActive = false;
                        item.thyExpandChange.emit({ expanded: collapse.thyActive, event });
                        item.markForCheck();
                    }
                });
        }
        collapse.thyActive = !collapse.thyActive;
        collapse.thyExpandChange.emit({ expanded: collapse.thyActive, event });
    }
}
