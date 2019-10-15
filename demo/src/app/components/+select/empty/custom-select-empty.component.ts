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
    selector: 'custom-select-empty',
    templateUrl: './custom-select-empty.component.html'
})
export class CustomSelectEmptyComponent implements OnInit {
    listOfOption: Array<{ label: string; value: string }> = [];

    ngOnInit() {
        const children: Array<{ label: string; value: string }> = [];
        for (let i = 10; i < 36; i++) {
            children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
        }
        this.listOfOption = children;
    }
}
