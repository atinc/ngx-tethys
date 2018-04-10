import { Component } from '@angular/core';
@Component({
    selector: 'demo-label-section',
    templateUrl: './label-section.component.html',
})
export class DemoLabelSectionComponent {

    public color?: string;
    public color1?: string;

    constructor() {
        this.color = '#7076fa';
        this.color1 = '#f969aa';
    }

    add() {
        alert('add success');
    }

    showMore() {
        alert('show more menu');
    }

}
