import { ChangeDetectionStrategy, Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import { InputBoolean } from 'ngx-tethys/core';

@Component({
    selector: 'thy-sidebar-header',
    templateUrl: `./sidebar-header.component.html`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'sidebar-header',
        '[class.sidebar-header-divided]': 'thyDivided'
    }
})
export class ThySidebarHeaderComponent implements OnInit {
    @Input()
    thyTitle: string;

    @ContentChild('headerOperation')
    public operationTemplateRef: TemplateRef<unknown>;

    @Input() @InputBoolean() thyDivided: boolean | string;

    constructor() {}

    ngOnInit(): void {}
}
