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
    Optional,
    ElementRef
} from '@angular/core';
import { ThyDialog } from '../dialog.service';
import { ThyDialogContainerComponent } from '../dialog-container.component';
import { ThyTranslate } from '../../shared';
import { ThyInternalDialogRef } from '../dialog-ref';

@Component({
    selector: 'thy-dialog-header',
    templateUrl: './dialog-header.component.html',
    // changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'thyDialogHeader'
})
export class DialogHeaderComponent implements OnInit {
    @HostBinding(`class.dialog-header`) isDialogHeader = true;

    @HostBinding(`class.dialog-header-lg`) isDialogHeaderLg = false;

    @ContentChild('dialogHeader', { static: true })
    public headerTemplate: TemplateRef<any>;

    @Input() thyTitle: string;

    @Input() set thySize(value: 'lg' | 'md') {
        this.isDialogHeaderLg = value === 'lg';
    }

    @Input()
    set thyTitleTranslationKey(key: string) {
        if (key && !this.thyTitle) {
            this.thyTitle = this.translate.instant(key);
        }
    }

    @Input() thyIcon: string;

    @Output() thyOnClose: EventEmitter<Event> = new EventEmitter<Event>();

    constructor(
        private elementRef: ElementRef,
        private dialog: ThyDialog,
        private translate: ThyTranslate,
        @Optional() private dialogContainer: ThyDialogContainerComponent
    ) {}

    ngOnInit() {
        if (!this.dialogContainer) {
            // When this directive is included in a dialog via TemplateRef (rather than being
            // in a Component), the ThyDialogContainerComponent isn't available via injection because embedded
            // views cannot be given a custom injector. Instead, we look up the ThyDialogContainerComponent by
            // ID. This must occur in `onInit`, as the ID binding for the dialog container won't
            // be resolved at constructor time.
            const dialogRef = this.dialog.getClosestDialog(this.elementRef.nativeElement) as ThyInternalDialogRef<any>;
            this.dialogContainer = dialogRef ? dialogRef.containerInstance : null;
        }

        // change in next microtask avoid throw ExpressionChangedAfterItHasBeenCheckedError
        // because sub component change parent's HostBinding property (ariaLabelledBy)
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
