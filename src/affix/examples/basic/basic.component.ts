import { Component, OnInit } from '@angular/core';
import { ThyAffix } from 'ngx-tethys/affix';

@Component({
    selector: 'thy-affix-basic-example',
    templateUrl: './basic.component.html',
    imports: [ThyAffix]
})
export class ThyAffixBasicExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
