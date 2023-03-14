import { NgIf, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { InputBoolean } from 'ngx-tethys/core';

@Component({
    selector: 'thy-sidebar-header',
    templateUrl: `./sidebar-header.component.html`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'sidebar-header',
        '[class.sidebar-header-divided]': 'thyDivided'
    },
    standalone: true,
    imports: [NgTemplateOutlet, NgIf]
})
export class ThySidebarHeaderComponent implements OnInit {
    @Input()
    thyTitle: string;

    @ContentChild('headerOperation')
    public operationTemplateRef: TemplateRef<unknown>;

    @ContentChild('headerTitle')
    public titleTemplateRef: TemplateRef<any>;

    @Input() @InputBoolean() thyDivided: boolean | string;

    constructor() {}

    ngOnInit(): void {}
}
