import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyNativeSelect } from 'ngx-tethys/select';

@Component({
    selector: 'thy-native-select-basic-example',
    templateUrl: './native-basic.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [ThyNativeSelect, FormsModule]
})
export class ThyNativeSelectBasicExampleComponent implements OnInit {
    selectedOption = '';

    ngOnInit() {}
}
