import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'thy-native-select-basic-example',
    templateUrl: './native-basic.component.html',
    standalone: false
})
export class ThyNativeSelectBasicExampleComponent implements OnInit {
    selectedOption = '';

    ngOnInit() {}
}
