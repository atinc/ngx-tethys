import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-table-fixed-example',
    templateUrl: './fixed.component.html',
    standalone: false
})
export class ThyTableFixedExampleComponent implements OnInit {
    data = [
        { id: 1, name: 'Peter', age: 25, job: 'Engineer', address: 'Beijing Dong Sheng Technology Technology Technology' },
        {
            id: 2,
            name: 'James',
            age: 26,
            job: 'Designer',
            address: 'Xian Economic Development Zone, Xian Economic Development Zone'
        },
        { id: 4, name: '3', age: 26, job: 'Designer', address: 'Xian Economic Development Zone' },
        { id: 5, name: '5', age: 26, job: 'Designer', address: 'Xian Economic Development Zone' },
        { id: 3, name: 'Tom', age: 30, job: 'Engineer', address: 'New Industrial Park, Shushan, Hefei, Anhui' }
    ];

    constructor() {}

    ngOnInit(): void {}
}
