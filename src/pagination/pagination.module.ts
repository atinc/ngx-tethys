import { NgModule } from '@angular/core';
import { ThyPaginationComponent } from './pagination.component';
import { CommonModule } from '@angular/common';
import { ThyPaginationConfig } from './pagination.config';
import { PaginationTotalCountFormat } from './pagination.pipe';
import { ThyDirectiveModule } from '../directive';

@NgModule({
    imports: [CommonModule, ThyDirectiveModule],
    exports: [ThyPaginationComponent],
    declarations: [ThyPaginationComponent, PaginationTotalCountFormat],
    providers: [ThyPaginationConfig]
})
export class ThyPaginationModule {}
