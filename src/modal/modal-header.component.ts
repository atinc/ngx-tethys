import { Component, Input, Output, EventEmitter, ContentChild, TemplateRef, OnInit } from '@angular/core';

@Component({
    selector: 'thy-modal-header',
    template: `<div class="modal-header">
    <ng-container *ngIf="!isTemplateRef">
    <h3 class="modal-title">
    <i *ngIf="icon" class="{{icon}}"></i>
    {{title}}
    </h3>
    <a href="javascript:;" class="modal-close" (click)="closeModal()"><i class="wtf wtf-times"></i></a>
    </ng-container>
    <ng-container *ngIf="isTemplateRef">
    <template [ngTemplateOutlet]="headerTemplate"></template>
    </ng-container>
    </div>`
})

export class ModalHeaderComponent implements OnInit {
    @Input() thyTitle: string;
    @Input() thyIcon: string;
    @Output() thyClose: EventEmitter<any> = new EventEmitter<any>();

    @ContentChild(TemplateRef)
    public headerTemplate: TemplateRef<any>;

    public isTemplateRef: boolean;

    constructor() { }

    ngOnInit() {
        this.isTemplateRef = this.headerTemplate instanceof TemplateRef;
    }

    closeModal() {
        this.thyClose.emit();
    }
}
