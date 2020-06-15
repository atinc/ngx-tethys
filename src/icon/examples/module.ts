import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyIconBasicExampleComponent } from './basic/basic.component';
import { ThyIconModule } from 'ngx-tethys/icon';

@NgModule({
    declarations: [ThyIconBasicExampleComponent],
    imports: [CommonModule, ThyIconModule],
    exports: [ThyIconBasicExampleComponent],
    entryComponents: [ThyIconBasicExampleComponent],
    providers: []
})
export class ThyIconExamplesModule {}
