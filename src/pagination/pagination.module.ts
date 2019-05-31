import { NgModule } from '@angular/core';
import { ThyPaginationComponent } from './pagination.component';
import { CommonModule } from '@angular/common';
import { PaginationTotalCountFormat } from './pagination.pipe';
import { ThyDirectiveModule } from '../directive';
import { THY_PAGINATION_CONFIG } from './pagination.config';

@NgModule({
    imports: [CommonModule, ThyDirectiveModule],
    exports: [ThyPaginationComponent],
    declarations: [ThyPaginationComponent, PaginationTotalCountFormat]
})
export class ThyPaginationModule {}
