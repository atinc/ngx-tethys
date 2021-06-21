import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-table-custom-empty-example',
    templateUrl: './custom-empty.component.html'
})
export class ThyTableCustomEmptyExampleComponent implements OnInit {
    public model: any[] = [];

    ngOnInit() {}
}
