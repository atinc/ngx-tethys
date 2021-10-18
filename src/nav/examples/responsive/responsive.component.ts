import { ThyNavLinkDirective } from 'ngx-tethys/nav';

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-nav-responsive-example',
    templateUrl: './responsive.component.html',
    styleUrls: ['./responsive.component.scss']
})
export class ThyNavResponsiveExampleComponent implements OnInit {
    activeIndex = 13;

    navList: { name: string; index: number }[] = [
        { name: '导航一', index: 1 },
        { name: '导航二', index: 2 },
        { name: '导航三', index: 3 },
        { name: '导航四', index: 4 },
        { name: '导航五', index: 5 },
        { name: '导航六', index: 6 },
        { name: '导航七', index: 7 },
        { name: '导航八', index: 8 },
        { name: '导航九', index: 9 },
        { name: '导航十', index: 10 },
        { name: '导航十一', index: 11 },
        { name: '导航十二', index: 12 },
        { name: '导航十三', index: 13 },
        { name: '导航十四', index: 14 }
    ];

    constructor() {}

    ngOnInit(): void {}

    select(value: number) {
        this.activeIndex = value;
    }

    navItemClick(item: ThyNavLinkDirective) {
        item.elementRef.nativeElement.click();
    }
}
