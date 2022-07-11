import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyVirtualListComponent } from './virtual-list.component';
import { ThyIconModule } from 'ngx-tethys/icon';

@NgModule({
    declarations: [ThyVirtualListComponent],
    imports: [CommonModule, ThyIconModule],
    exports: [ThyVirtualListComponent]
})
export class ThyVirtualListModule {}
