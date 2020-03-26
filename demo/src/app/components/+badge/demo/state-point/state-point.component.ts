import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'demo-badge-state-point',
    templateUrl: 'state-point.component.html',
    styleUrls: ['./state-point.scss']
})
export class DemoBadgeStatePointComponent implements OnInit {
    badgeDotTheme;

    themes = ['danger', 'primary', 'warning', 'secondary'];
    constructor() {}

    ngOnInit() {
        setInterval(() => {
            this.badgeDotTheme = this.themes[Math.floor(Math.random() * this.themes.length)];
        }, 2000);
    }
}
