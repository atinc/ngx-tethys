import { Component, OnInit } from '@angular/core';
import { ThyBadge } from 'ngx-tethys/badge';

@Component({
    selector: 'thy-badge-state-point-example',
    templateUrl: 'state-point.component.html',
    styleUrls: ['./state-point.component.scss'],
    imports: [ThyBadge]
})
export class ThyBadgeStatePointExampleComponent implements OnInit {
    badgeDotTheme!: string;

    themes = ['danger', 'primary', 'warning', 'secondary'];
    constructor() {}

    ngOnInit() {
        setInterval(() => {
            this.badgeDotTheme = this.themes[Math.floor(Math.random() * this.themes.length)];
        }, 2000);
    }
}
