import { Component, OnInit } from '@angular/core';

@Component({
    selector: '',
    templateUrl: './progress-section.component.html'
})

export class DemoProgressSectionComponent implements OnInit {
    stacked: any[] = [];
    constructor() {

    }
    randomStacked(): void {
        const types = ['success', 'info', 'warning', 'danger'];

        this.stacked = [];
        const n = Math.floor(Math.random() * 4 + 1);
        for (let i = 0; i < n; i++) {
            const index = Math.floor(Math.random() * 4);
            const value = Math.floor(Math.random() * 27 + 3);
            this.stacked.push({
                value,
                type: types[index]
            });
        }
    }
    ngOnInit() {
        this.randomStacked();
    }
}
