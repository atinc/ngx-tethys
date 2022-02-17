import { collapseMotion } from 'ngx-tethys/core';

import {
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Host,
    HostBinding,
    Input,
    OnDestroy,
    OnInit,
    Output,
    TemplateRef
} from '@angular/core';

import { ThyCollapseComponent } from './collapse.component';

@Component({
    selector: 'thy-collapse-panel',
    templateUrl: './collapse-panel.component.html',
    exportAs: 'ThyCollapseComponent',
    animations: [collapseMotion],
    host: {
        '[class.thy-collapse-no-arrow]': '!thyShowArrow',
        '[class.thy-collapse-item-active]': 'thyActive',
        '[class.thy-collapse-item-disabled]': 'thyDisabled'
    }
})
export class ThyCollapsePanelComponent implements OnInit, OnDestroy {
    constructor(private cdr: ChangeDetectorRef, @Host() private thyCollapseComponent: ThyCollapseComponent) {}
    @HostBinding('class.thy-collapse-item') isCollapsePanel = true;

    @Input() thyDisabled: boolean;

    @Input() thyTitle: string;

    @Input() thyHeaderTemplate: TemplateRef<any>;

    @Input()
    set thyExpandedIcon(value: string | TemplateRef<any>) {
        if (value instanceof TemplateRef) {
            this.expandedIconTemplate = value as TemplateRef<any>;
        } else {
            this.expandedIcon = value as string;
        }
    }

    @Input() thyExtraTemplate: TemplateRef<any>;

    @Input() thyShowArrow: boolean = true;

    @Input() thyActive: boolean = false;

    @Output() thyExpandChange = new EventEmitter<{ expanded: boolean; event: Event }>();

    public expandedIconTemplate: TemplateRef<any>;

    public expandedIcon: string = 'angle-right';

    ngOnInit() {
        this.thyCollapseComponent.addPanel(this);
    }

    markForCheck(): void {
        this.cdr.markForCheck();
    }

    activeChange(event: Event) {
        if (!this.thyDisabled) {
            this.thyCollapseComponent.click(this, event);
        }
    }

    ngOnDestroy(): void {
        this.thyCollapseComponent.removePanel(this);
    }
}
