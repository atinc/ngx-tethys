import { Component, OnInit } from '@angular/core';
import { menuGroupNodes, menuNodes } from 'ngx-tethys/menu/test/mock';
import { SafeAny } from 'ngx-tethys/types';

@Component({
    selector: 'thy-menu-theme-example',
    templateUrl: './theme.component.html',
    styleUrls: ['./theme.component.scss']
})
export class ThyMenuThemeExampleComponent implements OnInit {
    theme: string = 'loose';

    public groupNodes = menuGroupNodes;

    public menuNodes = menuNodes;

    constructor() {}

    coll: boolean;

    ngOnInit(): void {}

    edit(item: SafeAny) {
        console.log('item', item);
    }

    delete(item: SafeAny) {
        console.log('item', item);
    }
}
