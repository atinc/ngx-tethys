import { Component, OnInit } from '@angular/core';
import { ThyNav, ThyNavItemDirective } from 'ngx-tethys/nav';

@Component({
    selector: 'thy-nav-extra-example',
    templateUrl: './extra.component.html',
    styleUrls: ['./extra.component.scss'],
    imports: [ThyNav, ThyNavItemDirective]
})
export class ThyNavExtraExampleComponent implements OnInit {
    activeIndex = 1;

    items: Array<{ index: number; name: string }> = [];

    ngOnInit(): void {
        for (let i = 0; i < 5; i++) {
            this.items.push({ index: i, name: `Item ${i + 1}` });
        }
    }
}
