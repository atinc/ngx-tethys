import { Component, Input } from '@angular/core';

class ApiParameter {
    property: string;
    description: string;
    type: string;
    default: string;
}

@Component({
    selector: 'api-parameters',
    templateUrl:'./api-parameters.component.html'
})
export class ApiParametersComponent {
    @Input() parameters: ApiParameter[];
}
