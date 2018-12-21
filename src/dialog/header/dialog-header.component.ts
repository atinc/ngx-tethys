import {
    Component,
    Input,
    Output,
    EventEmitter,
    ContentChild,
    TemplateRef,
    OnInit,
    HostBinding,
    ChangeDetectionStrategy,
    Optional
} from '@angular/core';
import { ThyDialog } from '../dialog.service';
import { ThyDialogContainerComponent } from '../dialog-container.component';

@Component({
    selector: 'thy-dialog-header',
    templateUrl: './dialog-header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogHeaderComponent implements OnInit {
    @HostBinding(`class.dialog-header`) _isDialogHeader = true;

    @ContentChild('dialogHeader')
    public headerTemplate: TemplateRef<any>;

    @Input() thyTitle: string;

    @Input() thyIcon: string;

    @Output() thyOnClose: EventEmitter<Event> = new EventEmitter<Event>();

    constructor(
        private dialog: ThyDialog,
        @Optional() private dialogContainer: ThyDialogContainerComponent
    ) {}

    ngOnInit() {
        Promise.resolve().then(() => {
            if (this.dialogContainer) {
                this.dialogContainer.ariaLabelledBy = this.thyTitle;
            }
        });
    }

    close(event?: Event) {
        if (this.thyOnClose.observers.length > 0) {
            this.thyOnClose.emit(event);
        } else {
            this.dialog.close();
        }
    }
}
