import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'demo-badge-section',
    templateUrl: './badge-section.component.html',
    styleUrls: ['./badge-section.component.scss']
})

export class DemoBadgeSectionComponent implements OnInit {

    badgeDotTheme;

    themes = ['danger', 'primary', 'warning', 'secondary'];

    nullValue;

    badgeCount = 0;

    constructor() {

    }

    ngOnInit() {
        setInterval(() => {
            this.badgeDotTheme = this.themes[Math.floor(Math.random() * this.themes.length)];
            this.badgeCount = Math.floor(Math.random() * 10);
        }, 2000);
    }
}
