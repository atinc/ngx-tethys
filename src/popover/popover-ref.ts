import { ESCAPE } from '@angular/cdk/keycodes';
import { GlobalPositionStrategy, OverlayRef } from '@angular/cdk/overlay';
import { Observable, Subject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { PopoverPosition } from './popover.config';
import { ThyPopoverContainerComponent } from './popover-container.component';

export abstract class ThyPopoverRef<T, TResult = any> {
    componentInstance: T;
    backdropClosable: boolean;
    abstract close(dialogResult?: TResult): void;
    abstract afterOpened(): Observable<void>;
    abstract afterClosed(): Observable<TResult | undefined>;
    abstract beforeClosed(): Observable<TResult | undefined>;
    abstract keydownEvents(): Observable<KeyboardEvent>;
    abstract backdropClick(): Observable<MouseEvent>;
    abstract getOverlayRef(): OverlayRef;
    abstract updatePosition(position?: PopoverPosition): this;
}

export class ThyPopoverRefInternal<T, TResult = any> implements ThyPopoverRef<T, TResult> {
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

    constructor(private overlayRef: OverlayRef, public containerInstance: ThyPopoverContainerComponent) {
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
            .subscribe(() => {
                // this.overlayRef.detach();
                this.overlayRef.dispose();
            });

        containerInstance.insideClicked.subscribe(() => {
            this.close();
        });

        overlayRef.detachments().subscribe(() => {
            this._beforeClosed.next(this._result);
            this._beforeClosed.complete();
            this._afterClosed.next(this._result);
            this._afterClosed.complete();
            this.componentInstance = null;
            // this.overlayRef.detach();
            this.overlayRef.dispose();
        });

        overlayRef
            .keydownEvents()
            .pipe(filter(event => event.keyCode === ESCAPE && this.backdropClosable))
            .subscribe(() => this.close());
    }

    /**
     * Close the popover.
     * @param popoverResult Optional result to return to the popover opener.
     */
    close(popoverResult?: TResult): void {
        this._result = popoverResult;
        this.containerInstance.animationStateChanged
            .pipe(
                filter(event => event.phaseName === 'start'),
                take(1)
            )
            .subscribe(() => {
                this._beforeClosed.next(popoverResult);
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
    updatePosition(position?: PopoverPosition): this {
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
    updateSizeAndPosition(width: string = '', height: string = '', position?: PopoverPosition): this {
        this._getPositionStrategy()
            .width(width)
            .height(height);
        this.updatePosition(position);
        return this;
    }

    getOverlayRef() {
        return this.overlayRef;
    }
}
