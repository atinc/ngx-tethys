import { Component, Input, Output, EventEmitter, ContentChild, TemplateRef, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { ThyModalService } from './modal.service';

@Component({
    selector: 'thy-modal-header',
    templateUrl: './modal-header.component.html'
})
export class ModalHeaderComponent implements OnInit {
    @ContentChild(TemplateRef, { static: true })
    public headerTemplate: TemplateRef<any>;

    public isTemplateRef: boolean;

    constructor(private bsModalService: BsModalService, private thyModalService: ThyModalService) {}

    @Input() thyTitle: string;

    @Input() thyIcon: string;

    @Output() thyOnClose: EventEmitter<any> = new EventEmitter<any>();

    ngOnInit() {
        this.isTemplateRef = this.headerTemplate instanceof TemplateRef;
    }

    closeModal(event?: Event) {
        if (this.thyOnClose.observers.length > 0) {
            this.thyOnClose.emit();
        } else {
            this.thyModalService.close();
        }
    }
}
