import { NgModule } from '@angular/core';
import { ThyPaginationComponent } from './pagination.component';
import { CommonModule } from '@angular/common';
import { PaginationTotalCountFormat } from './pagination.pipe';
import { ThyDirectiveModule } from 'ngx-tethys/directive';
import { THY_PAGINATION_CONFIG } from './pagination.config';
import { ThyIconModule } from 'ngx-tethys/icon';

@NgModule({
    imports: [CommonModule, ThyDirectiveModule, ThyIconModule],
    exports: [ThyPaginationComponent],
    declarations: [ThyPaginationComponent, PaginationTotalCountFormat]
})
export class ThyPaginationModule {}
