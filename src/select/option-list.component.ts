// import { Component, OnInit, Input, ContentChild, TemplateRef, ContentChildren, QueryList, } from '@angular/core';
// import { ThySelectCustomComponent } from './select-custom.component';
// import { UpdateHostClassService } from '../shared';
// import { helpers } from '../util';
// import { ThyOptionComponent } from './option.component';

// @Component({
//     selector: 'thy-option-list',
//     templateUrl: './option-list.component.html'
// })
// export class ThyOptionListComponent implements OnInit {

//     @Input() option: any;

//     constructor(
//         public parent: ThySelectCustomComponent,
//         private updateHostClassService: UpdateHostClassService
//     ) {

//     }

//     ngOnInit() {
//     }

//     selectedOption(option: ThyOptionComponent) {
//         if (option.thyGroupLabel || option.thyDisabled) {
//             return;
//         }
//         this.parent.selectItem(option);
//     }
// }

