import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
    selector: 'thy-back-top-target-example',
    templateUrl: './target.component.html',
    styleUrls: ['./target.scss']
})
export class ThyBackTopTargetExampleComponent implements OnInit {
    demos: number[] = [];

    constructor() {}

    ngOnInit(): void {
        for (let index = 0; index < 20; index++) {
            this.demos.push(index);
        }
    }
}
