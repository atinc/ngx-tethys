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
import { InputBoolean, ThyTranslate } from 'ngx-tethys/core';
import { ThyInternalDialogRef } from '../dialog-ref';
import { ThyActionComponent } from 'ngx-tethys/action';
import { ThyIconComponent } from 'ngx-tethys/icon';
import { NgIf, NgTemplateOutlet } from '@angular/common';

@Component({
    selector: 'thy-dialog-header',
    templateUrl: './dialog-header.component.html',
    // changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'thyDialogHeader',
    host: {
        class: 'dialog-header thy-dialog-header',
        '[class.thy-dialog-header-lg]': `thySize === 'lg'`,
        '[class.thy-dialog-header-divided]': `thyDivided`
    },
    standalone: true,
    imports: [NgIf, NgTemplateOutlet, ThyIconComponent, ThyActionComponent]
})
export class DialogHeaderComponent implements OnInit {
    @ContentChild('dialogHeader')
    public headerTemplate: TemplateRef<any>;

    @Input() thyTitle: string;

    @Input() thySize: 'lg' | 'md';

    @Input() @InputBoolean() thyDivided: boolean;

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
