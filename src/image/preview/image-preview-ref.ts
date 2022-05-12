import { OverlayRef } from '@angular/cdk/overlay';
import { ThyImagePreviewOptions } from '../image.interface';
import { ThyImagePreviewComponent } from './image-preview.component';
import { filter, take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/internal/Subject';
import { ESCAPE } from '@angular/cdk/keycodes';

export class ThyImagePreviewRef {
    private destroy$ = new Subject<void>();
    constructor(public previewInstance: ThyImagePreviewComponent, private config: ThyImagePreviewOptions, private overlayRef: OverlayRef) {
        overlayRef
            .keydownEvents()
            .pipe(filter(event => event.keyCode === ESCAPE && this.config.backdropClosable))
            .subscribe(() => this.close());
        previewInstance.containerClick.pipe(take(1), takeUntil(this.destroy$)).subscribe(() => {
            this.close();
        });
    }

    close() {
        this.overlayRef.dispose();
    }
}
