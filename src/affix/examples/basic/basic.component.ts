import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ThyAffix } from 'ngx-tethys/affix';
import { ThyButton } from 'ngx-tethys/button';

@Component({
    selector: 'thy-affix-basic-example',
    templateUrl: './basic.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyAffix, ThyButton]
})
export class ThyAffixBasicExampleComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
