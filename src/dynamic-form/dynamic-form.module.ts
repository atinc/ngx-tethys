import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ThySharedModule } from 'ngx-tethys/shared';
import { ThyDynamicFormComponent } from './dynamic-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormQuestionComponent } from './dynamic-form-question.component';

@NgModule({
    declarations: [ThyDynamicFormComponent, DynamicFormQuestionComponent],
    imports: [CommonModule, ThySharedModule, ReactiveFormsModule],
    exports: [ThyDynamicFormComponent],
    providers: []
})
export class ThyDynamicFormModule {}
