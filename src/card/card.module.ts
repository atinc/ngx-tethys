import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyCard } from './card.component';
import { ThyCardHeader } from './header.component';
import { ThyCardContent } from './content.component';

@NgModule({
    imports: [CommonModule, ThyCard, ThyCardHeader, ThyCardContent],
    exports: [ThyCard, ThyCardHeader, ThyCardContent]
})
export class ThyCardModule {}
