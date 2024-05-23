import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ThyIcon } from './icon.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@NgModule({ declarations: [],
    exports: [ThyIcon], imports: [ThyIcon, CommonModule, FormsModule], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class ThyIconModule {}
