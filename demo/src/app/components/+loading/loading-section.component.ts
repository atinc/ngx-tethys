import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'demo-loading-section',
    templateUrl: './loading-section.component.html',
    styleUrls:['./loading.scss']
})
export class DemoLoadingSectionComponent implements OnInit {

    public isDone = false;

    ngOnInit() {
        setInterval(() => {
            this.isDone = true;
        }, 3000);
    }
}
