import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoLinkComponent } from './link/link.component';
import { NgxTethysModule } from 'ngx-tethys';

@NgModule({
    declarations: [DemoLinkComponent],
    imports: [CommonModule, NgxTethysModule]
})
export class GlobalModule {}
