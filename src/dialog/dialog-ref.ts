import { ESCAPE } from '@angular/cdk/keycodes';
import { GlobalPositionStrategy, OverlayRef } from '@angular/cdk/overlay';
import { Observable, Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { DialogPosition } from './dialog.config';
import { ThyDialogContainerComponent } from './dialog-container.component';

// Counter for unique dialog ids.
let uniqueId = 0;

export abstract class ThyDialogRef<T, TResult = any> {
    componentInstance: T;
    id: string;
    backdropClosable: boolean;
    abstract close(dialogResult?: TResult): void;
    abstract afterOpened(): Observable<void>;
    abstract afterClosed(): Observable<TResult | undefined>;
    abstract beforeClosed(): Observable<TResult | undefined>;
    abstract keydownEvents(): Observable<KeyboardEvent>;
    abstract backdropClick(): Observable<MouseEvent>;
    abstract updatePosition(position?: DialogPosition): this;
}

export class ThyDialogRefInternal<T, TResult = any> implements ThyDialogRef<T, TResult> {
    /** The instance of component opened into the dialog. */
    componentInstance: T;

    /** Whether the user is allowed to close the dialog. */
    backdropClosable: boolean | undefined = this.containerInstance.config.backdropClosable;

    /** Subject for notifying the user that the dialog has finished opening. */
    private readonly _afterOpened = new Subject<void>();

    /** Subject for notifying the user that the dialog has finished closing. */
    private readonly _afterClosed = new Subject<TResult | undefined>();

    /** Subject for notifying the user that the dialog has started closing. */
    private readonly _beforeClosed = new Subject<TResult | undefined>();

    /** Result to be passed to afterClosed. */
    private _result: TResult | undefined;

    /** Fetches the position strategy object from the overlay ref. */
    private _getPositionStrategy(): GlobalPositionStrategy {
        return this.overlayRef.getConfig().positionStrategy as GlobalPositionStrategy;
    }

    constructor(
        private overlayRef: OverlayRef,
        public containerInstance: ThyDialogContainerComponent,
        readonly id: string = `thy-dialog-${uniqueId++}`
    ) {
        // Pass the id along to the container.
        containerInstance.id = id;

        // Emit when opening animation completes
        containerInstance.animationStateChanged
            .pipe(
                filter(event => event.phaseName === 'done' && event.toState === 'enter'),
                take(1)
            )
            .subscribe(() => {
                this._afterOpened.next();
                this._afterOpened.complete();
            });

        // Dispose overlay when closing animation is complete
        containerInstance.animationStateChanged
            .pipe(
                filter(event => event.phaseName === 'done' && event.toState === 'exit'),
                take(1)
            )
            .subscribe(() => this.overlayRef.dispose());

        overlayRef.detachments().subscribe(() => {
            this._beforeClosed.next(this._result);
            this._beforeClosed.complete();
            this._afterClosed.next(this._result);
            this._afterClosed.complete();
            this.componentInstance = null;
            this.overlayRef.dispose();
        });

        overlayRef
            .keydownEvents()
            .pipe(filter(event => event.keyCode === ESCAPE && this.backdropClosable))
            .subscribe(() => this.close());
    }

    /**
     * Close the dialog.
     * @param dialogResult Optional result to return to the dialog opener.
     */
    close(dialogResult?: TResult): void {
        this._result = dialogResult;
        // Transition the backdrop in parallel to the dialog.
        this.containerInstance.animationStateChanged
            .pipe(
                filter(event => event.phaseName === 'start'),
                take(1)
            )
            .subscribe(() => {
                this._beforeClosed.next(dialogResult);
                this._beforeClosed.complete();
                this.overlayRef.detachBackdrop();
            });
        this.containerInstance.startExitAnimation();
    }

    /**
     * Gets an observable that is notified when the dialog is finished opening.
     */
    afterOpened(): Observable<void> {
        return this._afterOpened.asObservable();
    }

    /**
     * Gets an observable that is notified when the dialog is finished closing.
     */
    afterClosed(): Observable<TResult | undefined> {
        return this._afterClosed.asObservable();
    }

    /**
     * Gets an observable that is notified when the dialog has started closing.
     */
    beforeClosed(): Observable<TResult | undefined> {
        return this._beforeClosed.asObservable();
    }

    /**
     * Gets an observable that emits when the overlay's backdrop has been clicked.
     */
    backdropClick(): Observable<MouseEvent> {
        return this.overlayRef.backdropClick();
    }

    /**
     * Gets an observable that emits when keydown events are targeted on the overlay.
     */
    keydownEvents(): Observable<KeyboardEvent> {
        return this.overlayRef.keydownEvents();
    }

    /**
     * Updates the dialog's position.
     * @param position New dialog position.
     */
    updatePosition(position?: DialogPosition): this {
        const strategy = this._getPositionStrategy();

        if (position && (position.left || position.right)) {
            position.left ? strategy.left(position.left) : strategy.right(position.right);
        } else {
            strategy.centerHorizontally();
        }

        if (position && (position.top || position.bottom)) {
            position.top ? strategy.top(position.top) : strategy.bottom(position.bottom);
        } else {
            strategy.centerVertically();
        }

        this.overlayRef.updatePosition();

        return this;
    }

    /**
     * Updates the dialog's width and height.
     * @param width New width of the dialog.
     * @param height New height of the dialog.
     */
    updateSizeAndPosition(width: string = '', height: string = '', position?: DialogPosition): this {
        this._getPositionStrategy()
            .width(width)
            .height(height);
        this.updatePosition(position);
        return this;
    }
}
