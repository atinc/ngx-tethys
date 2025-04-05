import { Component, OnInit } from '@angular/core';
import { ThyList, ThyListItem, ThyListItemMeta } from 'ngx-tethys/list';

@Component({
    selector: 'app-list-item-meat-example',
    templateUrl: './item-meta.component.html',
    imports: [ThyList, ThyListItem, ThyListItemMeta]
})
export class ThyListItemMetaExampleComponent implements OnInit {
    public listItems = [
        {
            title: 'Sara Bradley',
            avatar: 'assets/images/one-avatar.jpg',
            description:
                'attack ship easily laugh tribe dozen blanket fifty box solar finally neighbor moment tail loose safety only daily sleep check whom recently realize die'
        },
        {
            title: 'Jim Hardy',
            avatar: 'assets/images/one-avatar.jpg',
            description:
                'saved recall religious canal should stems goes speed package sang people hung explanation send ahead wrapped equally chance early let lucky today individual rubbed'
        },
        {
            title: 'Sara Bowers',
            avatar: 'assets/images/one-avatar.jpg',
            description:
                'bet mighty public strong correctly way tiny shallow cookies temperature pipe realize bring beneath solid connected feed pleasant club running vapor difference course attempt'
        },
        {
            title: 'Bernice Morgan',
            avatar: 'assets/images/one-avatar.jpg',
            description:
                'sat stared chicken vegetable student memory card plates practical layers guide chosen porch buffalo forward satellites face see yourself draw sell grew generally thus'
        }
    ];
    constructor() {}

    ngOnInit() {}
}
