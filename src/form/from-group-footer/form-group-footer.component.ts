import {
    Component,
    HostBinding,
    ViewEncapsulation,
    OnInit
} from '@angular/core';

@Component({
    selector: 'thy-form-group-footer',
    templateUrl: './form-group-footer.component.html',
    encapsulation: ViewEncapsulation.None
})
export class ThyFormGroupFooterComponent implements OnInit {

    @HostBinding('class.form-group') _isFormGroup = true;

    @HostBinding('class.row') _isRow = true;


    constructor(
    ) {
    }

    ngOnInit() {
    }
}
