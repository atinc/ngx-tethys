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

    @ContentChild('dialogHeader')
    public headerTemplate: TemplateRef<any>;

    @Input() thyTitle: string;

    @Input() thyIcon: string;

    @Output() thyOnClose: EventEmitter<Event> = new EventEmitter<Event>();

    constructor(private dialog: ThyDialog) {}

    ngOnInit() {}

    close(event?: Event) {
        if (this.thyOnClose.observers.length > 0) {
            this.thyOnClose.emit(event);
        } else {
            this.dialog.close();
        }
    }
}
