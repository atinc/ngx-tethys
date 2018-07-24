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

    constructor() {

    }

    ngOnInit() {
        setInterval(() => {
            this.badgeDotTheme = this.themes[Math.floor(Math.random() * this.themes.length)];
        }, 1000);
    }
}
