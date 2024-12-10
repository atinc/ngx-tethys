import { Component, OnInit } from '@angular/core';
import { THY_SELECT_CONFIG } from 'ngx-tethys/select';
import { ThyPlacement } from 'ngx-tethys/core';

@Component({
    selector: 'thy-select-placement-example',
    templateUrl: './placement.component.html',
    styles: [
        `
            :host {
                display: flex;
                justify-content: left;
                flex-wrap: wrap;
            }
            thy-select {
                flex: 0 0 auto;
                width: 150px;
                margin: 0 20px 20px 0;
            }
        `
    ],
    providers: [
        {
            provide: THY_SELECT_CONFIG,
            useValue: {
                dropdownWidthMode: 'min-width',
                placement: 'bottomLeft'
            }
        }
    ],
    standalone: false
})
export class ThySelectPlacementExampleComponent implements OnInit {
    _placements: ThyPlacement[] = [
        'top',
        'topLeft',
        'topRight',
        'bottom',
        'bottomLeft',
        'bottomRight',
        'left',
        'leftTop',
        'leftBottom',
        'right',
        'rightTop',
        'rightBottom'
    ];

    placements: { value: string; text: string }[] = [];

    ngOnInit(): void {
        this.placements = this._placements.map(item => {
            return {
                value: item,
                text: item
            };
        });

        this.placements = [
            ...this.placements,
            {
                value: '',
                text: '支持全局配置'
            }
        ];
    }

    trackByFn(index: number, item: { value: string }) {
        return item?.value || index;
    }
}
