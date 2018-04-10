import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'demo-loading-section',
    templateUrl: './loading-section.component.html'
})
export class DemoLoadingSectionComponent implements OnInit {

    public isDone = false;

    ngOnInit() {
        setInterval(() => {
            this.isDone = true;
        }, 3000);
    }
}
