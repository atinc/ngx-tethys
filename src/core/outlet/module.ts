import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ThyStringOrTemplateOutletDirective } from './string-or-template-outlet.directive';

@NgModule({
    imports: [CommonModule],
    exports: [ThyStringOrTemplateOutletDirective],
    declarations: [ThyStringOrTemplateOutletDirective]
})
export class ThyOutletModule {}
