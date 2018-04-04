import { Component, Input, Output, EventEmitter, ContentChild, TemplateRef, OnInit } from '@angular/core';

@Component({
    selector: 'thy-modal-header',
    templateUrl:'./modal-header.component.html'
})
export class ModalHeaderComponent implements OnInit {
    @Input() thyTitle: string;
    @Input() thyIcon: string;
    @Output() thyOnClose: EventEmitter<any> = new EventEmitter<any>();

    @ContentChild(TemplateRef)
    public headerTemplate: TemplateRef<any>;

    public isTemplateRef: boolean;

    constructor() { }

    ngOnInit() {
        this.isTemplateRef = this.headerTemplate instanceof TemplateRef;
    }

    closeModal() {
        this.thyOnClose.emit();
    }
}
