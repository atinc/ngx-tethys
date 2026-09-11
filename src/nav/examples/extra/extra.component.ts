import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyNav, ThyNavItemDirective } from 'ngx-tethys/nav';
import { ThyAction } from 'ngx-tethys/action';

@Component({
    selector: 'thy-nav-extra-example',
    templateUrl: './extra.component.html',
    styleUrls: ['./extra.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyNav, ThyNavItemDirective, ThyAction]
})
export class ThyNavExtraExampleComponent implements OnInit {
    activeIndex = 1;

    items: { index: number; name: string }[] = [];

    ngOnInit(): void {
        for (let i = 0; i < 5; i++) {
            this.items.push({ index: i, name: `Item ${i + 1}` });
        }
    }
}
