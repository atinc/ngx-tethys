import { Component, OnInit } from '@angular/core';
import { ThyNav, ThyNavItemDirective } from 'ngx-tethys/nav';

@Component({
    selector: 'thy-nav-card-example',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    imports: [ThyNav, ThyNavItemDirective]
})
export class ThyNavCardExampleComponent implements OnInit {
    public activeIndex = 1;

    public items: Array<{ index: number; name: string; disabled?: boolean }> = [];

    ngOnInit(): void {
        for (let i = 0; i < 5; i++) {
            this.items.push({ index: i, name: `Item ${i + 1}` });
            if (i === 3) {
                this.items[i].disabled = true;
            }
        }
    }
}
