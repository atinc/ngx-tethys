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
    selector: 'native-select-basic',
    templateUrl: './native-select-basic.component.html'
})
export class NativeSelectBasicComponent implements OnInit {
    thySize = '';

    selectedOption = '';

    ngOnInit() {}
}
