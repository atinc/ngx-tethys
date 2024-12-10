import { ThyFormDirective } from 'ngx-tethys/form';
import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';

@Component({
    selector: 'thy-form-columns-example',
    templateUrl: './columns.component.html',
    standalone: false
})
export class ThyFormColumnsExampleComponent implements OnInit {
    submitSuccess = false;

    constructor() {}

    ngOnInit(): void {}

    save(form: ThyFormDirective) {
        console.log(`submit success!`);
        this.submitSuccess = true;
    }
}
