import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-grid-custom-empty-example',
    templateUrl: './custom-empty.component.html'
})
export class ThyGridCustomEmptyExampleComponent implements OnInit {
    public model: any[] = [];

    ngOnInit() {}
}
