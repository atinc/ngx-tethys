import { Component, Input, Output, EventEmitter, TemplateRef, ContentChild ,OnInit} from '@angular/core';

@Component({
    selector: 'thy-modal-footer',
    template: `<div class="modal-footer">
    <ng-container *ngIf="!isTemplateRef">
    <button thyButton="primary" (click)="saveFn()">确认</button>
    <button thyButton="link-secondary" class="btn btn-link btn-link-default" (click)="cancelFn()">取消</button>
    </ng-container>
    <ng-container *ngIf="isTemplateRef">
    <template [ngTemplateOutlet]="footerTemplate"></template>
    </ng-container>
    </div>`
})

export class ModalFooterComponent implements OnInit {

    @Input() thyLoadingText?: string;
    @Output() thySave: EventEmitter<any> = new EventEmitter<any>();
    @Output() thyCancel: EventEmitter<any> = new EventEmitter<any>();

    @ContentChild(TemplateRef)
    public footerTemplate: TemplateRef<any>;
    public isTemplateRef:boolean;

    public savingStatus: boolean;

    @Input()
    set thySaving(value: boolean) {
        this.savingStatus = value;
    }

    constructor() { }

    ngOnInit() {
        this.isTemplateRef = this.footerTemplate instanceof TemplateRef;
    }

    saveFn() {
        this.thySave.emit();
    }

    cancelFn() {
        this.thyCancel.emit();
    }
}
