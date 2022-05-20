import { ThyImagePreviewComponent } from './image-preview.component';
import { ThyDialogRef } from 'ngx-tethys/dialog';
import { LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';
import { ThyImagePreviewOptions } from '../image.class';

export class ThyImagePreviewRef {
    get componentInstance() {
        return this.dialogRef.componentInstance;
    }

    constructor(
        public previewInstance: ThyImagePreviewComponent,
        private config: ThyImagePreviewOptions,
        private dialogRef: ThyDialogRef<ThyImagePreviewComponent>
    ) {
        dialogRef
            .keydownEvents()
            .pipe()
            .subscribe(event => {
                if (!config.disableKeyboardSelectable && event.keyCode === LEFT_ARROW) {
                    this.prev();
                }
                if (!config.disableKeyboardSelectable && event.keyCode === RIGHT_ARROW) {
                    this.next();
                }
            });
    }

    next(): void {
        this.previewInstance.next();
    }

    prev(): void {
        this.previewInstance.prev();
    }
}
