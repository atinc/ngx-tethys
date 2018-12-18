import {
    Component,
    Input,
    Output,
    EventEmitter,
    ContentChild,
    TemplateRef,
    OnInit,
    HostBinding,
    ChangeDetectionStrategy
} from '@angular/core';
import { ThyDialog } from '../dialog.service';

@Component({
    selector: 'thy-dialog-header',
    templateUrl: './dialog-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogHeaderComponent implements OnInit {
    @HostBinding(`class.dialog-header`) _isDialogHeader = true;

    @ContentChild(TemplateRef)
    public headerTemplate: TemplateRef<any>;

    isTemplateRef: boolean;

    @Input() thyTitle: string;

    @Input() thyIcon: string;

    @Output() thyOnClose: EventEmitter<any> = new EventEmitter<any>();

    constructor(private dialog: ThyDialog) {}

    ngOnInit() {
        this.isTemplateRef = this.headerTemplate instanceof TemplateRef;
    }

    close(event?: Event) {
        if (this.thyOnClose.observers.length > 0) {
            this.thyOnClose.emit();
        } else {
            this.dialog.close();
        }
    }
}
