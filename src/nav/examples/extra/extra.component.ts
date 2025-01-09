import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-nav-extra-example',
    templateUrl: './extra.component.html',
    styleUrls: ['./extra.component.scss']
})
export class ThyNavExtraExampleComponent implements OnInit {
    public activeIndex = 0;
    public items: { index: number; name: string; disabled?: boolean }[] = [];

    ngOnInit(): void {
        for (let i = 0; i < 15; i++) {
            this.items.push({ index: i, name: `Item ${i + 1}` });
            if (i === 3) {
                this.items[i].disabled = true;
            }
        }
    }
}
