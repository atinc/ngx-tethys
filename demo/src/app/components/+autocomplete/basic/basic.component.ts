import {
    Component,
    ViewEncapsulation,
    OnInit,
    Input,
    ViewChild,
    ElementRef,
    Renderer2,
    Output,
    EventEmitter,
    TemplateRef
} from '@angular/core';

@Component({
    selector: 'demo-autocomplete-basic',
    templateUrl: './basic.component.html'
})
export class DemoAutocompleteBasicComponent implements OnInit {
    thySize = '';

    value = '';

    placeholder = 'autocomplete a page';

    children: Array<{ label: string; value: string }> = [];

    listOfOption: Array<{ label: string; value: string }> = [];

    constructor(private renderer: Renderer2) {}

    ngOnInit() {
        for (let i = 10; i < 36; i++) {
            this.children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
        }
        this.listOfOption = [...this.children];
    }

    valueChange(newValue: string) {
        this.listOfOption = this.children.filter(item => item.label.includes(newValue));
    }
}
