import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-nav-extra-example',
    templateUrl: './extra.component.html',
    styleUrls: ['./extra.component.scss']
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
