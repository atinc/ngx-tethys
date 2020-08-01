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
    selector: 'thy-select-basic-example',
    templateUrl: './basic.component.html'
})
export class ThySelectBasicExampleComponent implements OnInit {
    thySize = '';

    selectedOption = '';

    ngOnInit() {}
}
