import { Component, OnInit } from '@angular/core';
import { ThyLayout, ThyHeader, ThyContent, ThyContentSection, ThyContentMain, ThySidebar } from 'ngx-tethys/layout';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'thy-layout-basic-example',
    templateUrl: './basic.component.html',
    styleUrls: ['./basic.component.scss'],
    imports: [ThyLayout, ThyHeader, ThyContent, ThyContentSection, ThyContentMain, ThySidebar, CommonModule]
})
export class ThyLayoutBasicExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
