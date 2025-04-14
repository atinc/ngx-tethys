import { Component, OnInit } from '@angular/core';
import { ThyAffix } from 'ngx-tethys/affix';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-affix-basic-example',
    templateUrl: './basic.component.html',
    imports: [ThyAffix, ThyButton]
})
export class ThyAffixBasicExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
