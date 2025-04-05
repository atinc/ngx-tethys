import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ThyNativeSelect } from 'ngx-tethys/select';
import { ThyOption } from 'ngx-tethys/shared';

@Component({
    selector: 'thy-native-select-basic-example',
    templateUrl: './native-basic.component.html',
    imports: [ThyNativeSelect, FormsModule]
})
export class ThyNativeSelectBasicExampleComponent implements OnInit {
    selectedOption = '';

    ngOnInit() {}
}
