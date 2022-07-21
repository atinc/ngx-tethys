import { UpdateHostClassService } from 'ngx-tethys/core';

import { ChangeDetectorRef, Component, ElementRef, HostBinding, Input, OnInit } from '@angular/core';

import { ThyCollapsePanelComponent } from './collapse-panel.component';

export type ThyTheme = 'divided' | 'bordered' | 'ghost';

export type Position = 'left' | 'right';
@Component({
    selector: 'thy-collapse',
    template: `
        <ng-container>
            <ng-content></ng-content>
        </ng-container>
    `,
    host: {
        '[class.thy-collapse-divided]': `thyTheme === 'divided'`,
        '[class.thy-collapse-bordered]': `thyTheme === 'bordered'`,
        '[class.thy-collapse-ghost]': `thyTheme === 'ghost'`,
        '[class.thy-collapse-icon-position-right]': `thyExpandIconPosition === 'right'`,
        '[class.thy-collapse-icon-position-left]': `thyExpandIconPosition === 'left'`
    },
    providers: [UpdateHostClassService]
})
export class ThyCollapseComponent implements OnInit {
    constructor(private cdr: ChangeDetectorRef, private elementRef: ElementRef, private updateHostClassService: UpdateHostClassService) {}

    @HostBinding('class.thy-collapse') isCollapse = true;

    // @HostBinding('class.thy-collapse-ghost') themeGhost = false;

    // @HostBinding('class.thy-collapse-bordered') themeBordered = false;

    // @HostBinding('class.thy-collapse-divided') themeDivided = true;

    @Input() thyAccordion: boolean;

    @Input() thyExpandIconPosition: Position = 'left';

    @Input() thyTheme: ThyTheme = 'divided';
    // set thyTheme(value: ThyTheme) {
    // if (value === 'bordered') {
    //     this.themeBordered = true;
    //     this.themeDivided = false;
    // } else if (value === 'ghost') {
    //     this.themeGhost = true;
    //     this.themeDivided = false;
    // } else {
    //     this.themeDivided = true;
    // }
    // }

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
