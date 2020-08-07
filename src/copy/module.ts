import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyCopyDirective } from './copy.directive';

@NgModule({
    declarations: [ThyCopyDirective],
    imports: [CommonModule],
    exports: [ThyCopyDirective]
})
export class ThyCopyModule {}
