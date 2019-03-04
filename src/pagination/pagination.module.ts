import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginationModule, PaginationConfig } from 'ngx-bootstrap/pagination';
import { ThyPaginationConfig } from './pagination.config';
import { ThyPaginationComponent } from './pagination.component';
import { ThyPaginationPagerComponent } from './pagination-pager.component';
import { ThyPaginationJumpComponent } from './pagination-jump.component';

@NgModule({
    declarations: [ThyPaginationComponent, ThyPaginationPagerComponent, ThyPaginationJumpComponent],
    imports: [CommonModule, FormsModule, PaginationModule.forRoot()],
    exports: [PaginationModule, ThyPaginationComponent],
    providers: [
        {
            provide: PaginationConfig,
            useClass: ThyPaginationConfig
        }
    ]
})
export class ThyPaginationModule {}
