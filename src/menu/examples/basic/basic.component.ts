import { Component, OnInit } from '@angular/core';
import { ThyMenu } from 'ngx-tethys/menu';
@Component({
    selector: 'thy-menu-basic-example',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss'],
    imports: [ThyMenu]
})
export class ThyMenuBasicExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
