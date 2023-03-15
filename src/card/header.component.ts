import {
    Component,
    HostBinding,
    Input,
    OnInit,
    TemplateRef,
    Optional,
    ViewChild,
    ContentChild,
    ViewContainerRef,
    ChangeDetectionStrategy
} from '@angular/core';
import { NgTemplateOutlet, NgIf } from '@angular/common';
@Component({
    selector: 'thy-card-header',
    preserveWhitespaces: false,
    templateUrl: './header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        class: 'thy-card-header',
        '[class.thy-card-header--sm]': 'thySize === "sm"',
        '[class.thy-card-header--lg]': 'thySize === "lg"',
        '[class.thy-card-header--md]': 'thySize === "md"'
    },
    standalone: true,
    imports: [NgTemplateOutlet, NgIf]
})
export class ThyCardHeaderComponent implements OnInit {
    public iconClass: string;

    @Input('thyTitle') thyTitle: string;

    @Input('thyDescription') thyDescription: string;

    @Input('thySize') thySize: 'sm' | 'lg' | 'md' | '';

    @ContentChild('headerTitle')
    public titleTemplateRef: TemplateRef<any>;

    @ContentChild('headerDescription')
    public descriptionTemplateRef: TemplateRef<any>;

    @ContentChild('headerOperation')
    public operationTemplateRef: TemplateRef<any>;

    constructor() {}

    ngOnInit() {}
}
