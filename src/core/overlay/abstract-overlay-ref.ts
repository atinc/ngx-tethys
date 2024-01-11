import { ESCAPE, helpers } from 'ngx-tethys/util';
import { Observable, of, Subject } from 'rxjs';
import { filter, finalize, take } from 'rxjs/operators';

import { GlobalPositionStrategy, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';

import { ThyAbstractOverlayContainer } from './abstract-overlay-container';
import { ThyAbstractOverlayConfig, ThyAbstractOverlayOptions, ThyAbstractOverlayPosition } from './abstract-overlay.config';

export abstract class ThyAbstractOverlayRef<
    TComponent = unknown,
    TContainer extends ThyAbstractOverlayContainer = ThyAbstractOverlayContainer,
    TResult = unknown
> {
    id: string;
    componentInstance: TComponent;
    backdropClosable: boolean;
    disableClose: boolean;
    containerInstance: TContainer;

    /**
     * 获取 OverlayRef
     */
    abstract getOverlayRef(): OverlayRef;

    /**
     * 关闭当前模态框，若force为true，则canClose无效，强制关闭
     * @param dialogResult
     * @param force
     */
    abstract close(dialogResult?: TResult, force?: boolean): void;

    /**
     * 模态框打开后的回调
     */
    abstract afterOpened(): Observable<void>;

    /**
     * 模态框关闭后的回调
     */
    abstract afterClosed(): Observable<TResult | undefined>;

    /**
     * 模态框关闭前的回调
     */
    abstract beforeClosed(): Observable<TResult | undefined>;

    abstract keydownEvents(): Observable<KeyboardEvent>;

    /**
     * 点击模态框遮罩层的回调
     */
    abstract backdropClick(): Observable<MouseEvent>;

    /**
     * 更新模态框的位置
     * @param position
     */
    abstract updatePosition(position?: ThyAbstractOverlayPosition): this;
}

// Counter for unique overlay ids.
const uniqueIdMap: { [key: string]: number } = {};

function getUniqueId(name: string) {
    if (uniqueIdMap[name] !== undefined) {
        uniqueIdMap[name] = uniqueIdMap[name] + 1;
    } else {
        uniqueIdMap[name] = 0;
    }
    return uniqueIdMap[name];
}

export abstract class ThyAbstractInternalOverlayRef<
    T,
    TContainer extends ThyAbstractOverlayContainer,
    TResult = undefined
> extends ThyAbstractOverlayRef<T, TContainer, TResult> {
    /** The instance of component opened into the dialog. */
    componentInstance: T;

    /** Whether the user is allowed to close the dialog. */
    backdropClosable: boolean = this.config.backdropClosable;

    /** Whether the user is not allowed to close the dialog. */
    disableClose: boolean = this.config.disableClose;

    /** Subject for notifying the user that the dialog has finished opening. */
    private readonly _afterOpened = new Subject<void>();

    /** Subject for notifying the user that the dialog has finished closing. */
    private readonly _afterClosed = new Subject<TResult | undefined>();

    /** Subject for notifying the user that the dialog has started closing. */
    private readonly _beforeClosed = new Subject<TResult | undefined>();

    /** Result to be passed to afterClosed. */
    private _result: TResult | undefined;

    /** Fetches the position strategy object from the overlay ref. */
    protected getPositionStrategy(): PositionStrategy {
        return this.overlayRef.getConfig().positionStrategy;
    }

    constructor(
        private options: ThyAbstractOverlayOptions,
        protected overlayRef: OverlayRef,
        containerInstance: TContainer,
        protected config: ThyAbstractOverlayConfig
    ) {
        super();
        this.containerInstance = containerInstance;
        // Pass the id along to the container.
        this.id = containerInstance.id = config.id ? config.id : `thy-${this.options.name}-${getUniqueId(this.options.name)}`;
        // Emit when opening animation completes
        containerInstance.animationOpeningDone.pipe(take(1)).subscribe(() => {
            this._afterOpened.next();
            if (this.options.disposeWhenClose) {
                this._afterOpened.complete();
            }
        });

        // Dispose overlay when closing animation is complete
        containerInstance.animationClosingDone.pipe(take(1)).subscribe(() => {
            if (this.options.disposeWhenClose) {
                this.overlayRef.dispose();
            }
        });

        // Dispose overlay when container after destroy
        containerInstance.containerDestroy.pipe(take(1)).subscribe(() => {
            if (this.options.disposeWhenClose) {
                // component element has not been deleted when the component destroy, so use promise wait for component element destroyed
                Promise.resolve().then(() => {
                    this.overlayRef.dispose();
                });
            }
        });

        overlayRef
            .detachments()
            .pipe(
                finalize(() => {
                    this.overlayRef.dispose();
                })
            )
            .subscribe(() => {
                this._beforeClosed.next(this._result);
                this._beforeClosed.complete();
                this._afterClosed.next(this._result);
                this._afterClosed.complete();
                this.componentInstance = null;
            });

        // ESC close
        overlayRef
            .keydownEvents()
            .pipe(filter(event => event.keyCode === ESCAPE))
            .subscribe(() => {
                if ((this.disableClose !== undefined && !this.disableClose) || this.backdropClosable) {
                    this.close();
                }
            });
    }

    /**
     * Close the overlay.
     * @param overlayResult Optional result to return to the dialog opener.
     */
    close(overlayResult?: TResult, force?: boolean): void {
        if (force || !this.config.canClose || !!this.config.canClose(overlayResult)) {
            this._result = overlayResult;
            // Transition the backdrop in parallel to the overlay.
            this._beforeClosed.next(overlayResult);
            if (this.options.disposeWhenClose) {
                this._beforeClosed.complete();
            }

            this.overlayRef.detachBackdrop();
            this.containerInstance.startExitAnimation();
        }
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

    /** Get overlay ref */
    getOverlayRef() {
        return this.overlayRef;
    }

    /**
     * Updates the overlay's position when is GlobalPositionStrategy
     * @param position New overlay position.
     */
    updateGlobalPosition(position?: ThyAbstractOverlayPosition): this {
        const strategy = this.getPositionStrategy() as GlobalPositionStrategy;

        if ((typeof ngDevMode === 'undefined' || ngDevMode) && !(strategy instanceof GlobalPositionStrategy)) {
            throw new Error(`current strategy is not GlobalPositionStrategy`);
        }

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
}
