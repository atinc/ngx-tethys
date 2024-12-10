import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-badge-state-point-example',
    templateUrl: 'state-point.component.html',
    styleUrls: ['./state-point.component.scss'],
    standalone: false
})
export class ThyBadgeStatePointExampleComponent implements OnInit {
    badgeDotTheme: string;

    themes = ['danger', 'primary', 'warning', 'secondary'];
    constructor() {}

    ngOnInit() {
        setInterval(() => {
            this.badgeDotTheme = this.themes[Math.floor(Math.random() * this.themes.length)];
        }, 2000);
    }
}
