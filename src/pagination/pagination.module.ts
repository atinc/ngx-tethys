
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule, PaginationConfig } from 'ngx-bootstrap/pagination';
import { ThyPaginationConfig } from './pagination.config';


@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        PaginationModule.forRoot()
    ],
    exports: [
        PaginationModule
    ],
    providers: [
        {
            provide: PaginationConfig, useClass: ThyPaginationConfig
        }
    ]
})
export class ThyPaginationModule {
}
