import { ThyImagePreview } from './image-preview.component';
import { ThyDialogRef } from 'ngx-tethys/dialog';
import { LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';
import { ThyImageInfo, ThyImagePreviewOptions } from '../image.class';
import { Observable } from 'rxjs';
import { outputToObservable } from '@angular/core/rxjs-interop';

export class ThyImagePreviewRef {
    get componentInstance() {
        return this.dialogRef.componentInstance;
    }

    constructor(
        public previewInstance: ThyImagePreview,
        private config: ThyImagePreviewOptions,
        private dialogRef: ThyDialogRef<ThyImagePreview>
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

    downloadClicked(): Observable<ThyImageInfo> {
        return outputToObservable(this.previewInstance.downloadClicked);
    }
}
