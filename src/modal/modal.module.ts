import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThyModalService } from './modal.service';
import { ThyButtonModule } from 'ngx-tethys/button';
import { ModalComponent } from './modal.component';
import { ModalHeaderComponent } from './modal-header.component';
import { ModalBodyComponent } from './modal-body.component';
import { ModalFooterComponent } from './modal-footer.component';

@NgModule({
    declarations: [ModalComponent, ModalHeaderComponent, ModalBodyComponent, ModalFooterComponent],
    imports: [CommonModule, ThyButtonModule],
    exports: [ModalComponent, ModalHeaderComponent, ModalBodyComponent, ModalFooterComponent],
    providers: [ThyModalService]
})
export class ThyModalModule {}
