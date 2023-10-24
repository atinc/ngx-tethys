import { OverlayContainer } from '@angular/cdk/overlay';
import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';
import { ViewContainerRef } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, flushMicrotasks, inject, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { bypassSanitizeProvider, dispatchKeyboardEvent, injectDefaultSvgIconSet } from 'ngx-tethys/testing';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { A, ESCAPE } from '../../util/keycodes';
import { ThyDialogContainerComponent } from '../dialog-container.component';
import { ThyDialogRef } from '../dialog-ref';
import { ThyDialogSizes } from '../dialog.config';
import { ThyDialog, ThyDialogModule, THY_CONFIRM_DEFAULT_OPTIONS } from '../index';
import {
    DialogFullContentComponent,
    DialogRestoreComponent,
    DialogSimpleContentComponent,
    DialogTestModule,
    WithChildViewContainerComponent,
    WithInjectedDataDialogComponent,
    WithOnPushViewContainerComponent,
    WithTemplateRefComponent,
    WithViewContainerDirective
} from './module';

describe('ThyDialog', () => {
    let dialog: ThyDialog;
    let overlayContainer: OverlayContainer;
    let overlayContainerElement: HTMLElement;
    // let scrolledSubject = new Subject();

    let testViewContainerRef: ViewContainerRef;
    let viewContainerFixture: ComponentFixture<WithChildViewContainerComponent>;
    let mockLocation: SpyLocation;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [ThyDialogModule, DialogTestModule],
            providers: [
                bypassSanitizeProvider,
                { provide: Location, useClass: SpyLocation },
                {
                    provide: THY_CONFIRM_DEFAULT_OPTIONS,
                    useValue: {
                        title: '全局定义标题'
                    }
                }
                // {
                //     provide: ScrollDispatcher,
                //     useFactory: () => ({
                //         scrolled: () => scrolledSubject.asObservable()
                //     })
                // }
            ]
        });
        injectDefaultSvgIconSet();
        TestBed.compileComponents();
    }));

    beforeEach(inject(
        [ThyDialog, Location, OverlayContainer],
        (_dialog: ThyDialog, _location: Location, _overlayContainer: OverlayContainer) => {
            dialog = _dialog;
            mockLocation = _location as SpyLocation;
            overlayContainer = _overlayContainer;
            overlayContainerElement = _overlayContainer.getContainerElement();
        }
    ));

    afterEach(() => {
        overlayContainer.ngOnDestroy();
    });

    beforeEach(() => {
        viewContainerFixture = TestBed.createComponent(WithChildViewContainerComponent);
        viewContainerFixture.detectChanges();
        testViewContainerRef = viewContainerFixture.componentInstance.childViewContainer;
    });

    function getDialogContainerElement() {
        return overlayContainerElement.querySelector(`thy-dialog-container`);
    }

    function getDialogContainerElements() {
        return overlayContainerElement.querySelectorAll(`thy-dialog-container`);
    }

    function getOverlayBackdropElement() {
        return overlayContainerElement.querySelector('.cdk-overlay-backdrop');
    }

    function assertDialogSimpleContentComponent(dialogRef: ThyDialogRef<DialogSimpleContentComponent>) {
        viewContainerFixture.detectChanges();

        expect(overlayContainerElement.textContent).toContain('Hello Dialog');
        expect(dialogRef.componentInstance instanceof DialogSimpleContentComponent).toBe(true);
        expect(dialogRef.componentInstance.dialogRef).toBe(dialogRef);

        viewContainerFixture.detectChanges();
        const dialogContainerElement = getDialogContainerElement();
        expect(dialogContainerElement.getAttribute('role')).toBe('dialog');
    }

    function getElementByDialogContainer(selectors: string) {
        const confirmDialog = getDialogContainerElement() as HTMLElement;
        return confirmDialog && (confirmDialog.querySelector(selectors) as HTMLElement);
    }

    function assertHeaderButtonClick(spy: jasmine.Spy, done: DoneFn) {
        viewContainerFixture.detectChanges();
        const headerButton = getElementByDialogContainer('.dialog-header .thy-icon-close');
        if (headerButton) {
            headerButton.click();
        }

        viewContainerFixture.detectChanges();
        viewContainerFixture.whenStable().then(() => {
            expect(getDialogContainerElement()).toBeNull();
            expect(spy).toHaveBeenCalled();
            done();
        });
    }

    function assertConfirmBtnWork(done: DoneFn, shouldClose: boolean = true) {
        viewContainerFixture.detectChanges();
        expect(overlayContainerElement.querySelector('.thy-dialog-container') as HTMLDivElement).toBeTruthy();

        viewContainerFixture.detectChanges();
        const confirmBtn = getElementByDialogContainer('.thy-confirm-footer button:first-child');
        if (confirmBtn) {
            confirmBtn.click();
        }

        viewContainerFixture.detectChanges();
        viewContainerFixture.whenStable().then(() => {
            if (shouldClose) {
                expect(getDialogContainerElement()).toBeNull();
            } else {
                expect(getDialogContainerElement()).not.toBeNull();
            }
            done();
        });
    }

    function getConfirmElements() {
        return {
            headerTitle: getElementByDialogContainer('.dialog-header>h3'),
            confirmFooter: getElementByDialogContainer('.thy-confirm-footer'),
            okButton: getElementByDialogContainer('.thy-confirm-footer button:first-child'),
            cancelButton: getElementByDialogContainer('.thy-confirm-footer button:nth-child(2)')
        };
    }

    it('should find the closest dialog', () => {
        dialog.open(DialogSimpleContentComponent);
        viewContainerFixture.detectChanges();
        const element = getDialogContainerElement() as HTMLElement;
        expect(dialog.getClosestDialog(element.querySelector('thy-dialog-content-component'))).toBeTruthy();
    });

    it('should open a dialog with a component', () => {
        const dialogRef = dialog.open(DialogSimpleContentComponent);
        assertDialogSimpleContentComponent(dialogRef);
    });

    it('should open a dialog with a component and viewContainerRef', () => {
        const dialogRef = dialog.open(DialogSimpleContentComponent, {
            viewContainerRef: testViewContainerRef
        });
        assertDialogSimpleContentComponent(dialogRef);
    });

    it('should open a dialog with a template', () => {
        const templateRefFixture = TestBed.createComponent(WithTemplateRefComponent);
        templateRefFixture.componentInstance.localValue = 'Bees';
        templateRefFixture.detectChanges();

        const initialState = { value: 'Knees' };

        const dialogRef = dialog.open(templateRefFixture.componentInstance.templateRef, { initialState });

        viewContainerFixture.detectChanges();

        expect(overlayContainerElement.textContent).toContain('Cheese Bees Knees');
        expect(templateRefFixture.componentInstance.dialogRef).toBe(dialogRef);

        viewContainerFixture.detectChanges();

        const dialogContainerElement = getDialogContainerElement();
        expect(dialogContainerElement.getAttribute('role')).toBe('dialog');

        dialogRef.close();
    });

    it('should emit when dialog opening animation is complete', fakeAsync(() => {
        const dialogRef = dialog.open(DialogSimpleContentComponent, {
            viewContainerRef: testViewContainerRef
        });
        const spy = jasmine.createSpy('afterOpened spy');

        dialogRef.afterOpened().subscribe(spy);

        viewContainerFixture.detectChanges();

        // callback should not be called before animation is complete
        expect(spy).not.toHaveBeenCalled();

        flush();

        expect(spy).toHaveBeenCalledTimes(1);
    }));

    it('should use injector from viewContainerRef for DialogInjector', () => {
        const dialogRef = dialog.open(DialogSimpleContentComponent, {
            viewContainerRef: testViewContainerRef
        });

        viewContainerFixture.detectChanges();

        const dialogInjector = dialogRef.componentInstance.dialogInjector;

        expect(dialogRef.componentInstance.dialogRef).toBe(dialogRef);
        expect(dialogInjector.get<WithViewContainerDirective>(WithViewContainerDirective)).toBeTruthy(
            'Expected the dialog component to be created with the injector from the viewContainerRef.'
        );
    });

    it('should apply the configured role to the dialog element', () => {
        dialog.open(DialogSimpleContentComponent, { role: 'alertdialog' });

        viewContainerFixture.detectChanges();

        const dialogContainerElement = getDialogContainerElement();
        expect(dialogContainerElement.getAttribute('role')).toBe('alertdialog');
    });

    describe('passing in data', () => {
        it('should be able to pass in data', () => {
            const config = {
                initialState: {
                    data: {
                        stringParam: 'hello initialState',
                        dateParam: new Date()
                    }
                }
            };
            const instance = dialog.open(WithInjectedDataDialogComponent, config).componentInstance;
            expect(instance.data.stringParam).toBe(config.initialState.data.stringParam);
            expect(instance.data.dateParam).toBe(config.initialState.data.dateParam);
        });

        it('should default to null if no data is passed', () => {
            expect(() => {
                const dialogRef = dialog.open(WithInjectedDataDialogComponent);
                expect(dialogRef.componentInstance.data).toBeUndefined();
            }).not.toThrow();
        });
    });

    it('should close a dialog and get back a result', fakeAsync(() => {
        const dialogRef = dialog.open(DialogSimpleContentComponent, {
            viewContainerRef: testViewContainerRef
        });
        const afterClosedCallback = jasmine.createSpy('afterClosed callback');

        dialogRef.afterClosed().subscribe(afterClosedCallback);
        dialogRef.close('close result');
        viewContainerFixture.detectChanges();

        flush();

        expect(afterClosedCallback).toHaveBeenCalledWith('close result');
        expect(getDialogContainerElement()).toBeNull();
    }));

    it('should close a dialog and get back a result before it is closed', fakeAsync(() => {
        const dialogRef = dialog.open(DialogSimpleContentComponent, {
            viewContainerRef: testViewContainerRef
        });

        flush();
        viewContainerFixture.detectChanges();

        // beforeClose should emit before dialog container is destroyed
        const beforeCloseHandler = jasmine.createSpy('beforeClose callback').and.callFake(() => {
            expect(getDialogContainerElement()).not.toBeNull('dialog container exists when beforeClose is called');
        });

        dialogRef.beforeClosed().subscribe(beforeCloseHandler);
        dialogRef.close('Bulbasaur');
        viewContainerFixture.detectChanges();
        flush();

        expect(beforeCloseHandler).toHaveBeenCalledWith('Bulbasaur');
        expect(getDialogContainerElement()).toBeNull();
    }));

    it('should close a dialog via the escape key', fakeAsync(() => {
        dialog.open(DialogSimpleContentComponent, {
            viewContainerRef: testViewContainerRef
        });

        dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
        viewContainerFixture.detectChanges();
        flush();

        expect(getDialogContainerElement()).toBeNull();
    }));

    it('should close from a ViewContainerRef with OnPush change detection', fakeAsync(() => {
        const onPushFixture = TestBed.createComponent(WithOnPushViewContainerComponent);

        onPushFixture.detectChanges();

        const dialogRef = dialog.open(DialogSimpleContentComponent, {
            viewContainerRef: onPushFixture.componentInstance.viewContainerRef
        });

        flushMicrotasks();
        onPushFixture.detectChanges();
        flushMicrotasks();

        expect(overlayContainerElement.querySelectorAll('thy-dialog-container').length).toBe(1, 'Expected one open dialog.');

        dialogRef.close();
        flushMicrotasks();
        onPushFixture.detectChanges();
        tick(500);

        expect(overlayContainerElement.querySelectorAll('thy-dialog-container').length).toBe(0, 'Expected no open dialogs.');
    }));

    it('should close when clicking on the overlay backdrop', fakeAsync(() => {
        dialog.open(DialogSimpleContentComponent, {
            viewContainerRef: testViewContainerRef
        });

        viewContainerFixture.detectChanges();

        const backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop') as HTMLElement;

        backdrop.click();
        viewContainerFixture.detectChanges();
        flush();

        expect(getDialogContainerElement()).toBeFalsy();
    }));

    it('should emit the backdropClick stream when clicking on the overlay backdrop', fakeAsync(() => {
        const dialogRef = dialog.open(DialogSimpleContentComponent, {
            viewContainerRef: testViewContainerRef
        });

        const spy = jasmine.createSpy('backdropClick spy');
        dialogRef.backdropClick().subscribe(spy);

        viewContainerFixture.detectChanges();

        const backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop') as HTMLElement;

        backdrop.click();
        expect(spy).toHaveBeenCalledTimes(1);

        viewContainerFixture.detectChanges();
        flush();

        // Additional clicks after the dialog has closed should not be emitted
        backdrop.click();
        expect(spy).toHaveBeenCalledTimes(1);
    }));

    it('should emit the keyboardEvent stream when key events target the overlay', fakeAsync(() => {
        const dialogRef = dialog.open(DialogSimpleContentComponent, {
            viewContainerRef: testViewContainerRef
        });
        tick(1);
        const spy = jasmine.createSpy('keyboardEvent spy');
        dialogRef.keydownEvents().subscribe(spy);

        viewContainerFixture.detectChanges();

        const backdrop = overlayContainerElement.querySelector('.cdk-overlay-backdrop') as HTMLElement;
        const container = getDialogContainerElement();
        dispatchKeyboardEvent(document.body, 'keydown', A);
        dispatchKeyboardEvent(backdrop, 'keydown', A);
        dispatchKeyboardEvent(container, 'keydown', A);

        expect(spy).toHaveBeenCalledTimes(3);
    }));

    it('should notify the observers if a dialog has been opened', () => {
        dialog.afterOpened().subscribe(ref => {
            expect(
                dialog.open(DialogSimpleContentComponent, {
                    viewContainerRef: testViewContainerRef
                })
            ).toBe(ref);
        });
    });

    it('should notify the observers if all open dialogs have finished closing', fakeAsync(() => {
        const ref1 = dialog.open(DialogSimpleContentComponent, { viewContainerRef: testViewContainerRef });
        const ref2 = dialog.open(DialogFullContentComponent, { viewContainerRef: testViewContainerRef });
        const spy = jasmine.createSpy('afterAllClosed spy');

        dialog.afterAllClosed().subscribe(spy);

        ref1.close();
        viewContainerFixture.detectChanges();
        flush();

        expect(spy).not.toHaveBeenCalled();

        ref2.close();
        viewContainerFixture.detectChanges();
        flush();
        expect(spy).toHaveBeenCalled();
    }));

    it('should has a element class with dialog-body-clear-padding if thyClearPadding', () => {
        dialog.open(DialogFullContentComponent, { viewContainerRef: testViewContainerRef });
        viewContainerFixture.detectChanges();
        expect(overlayContainerElement.querySelector('.dialog-body-clear-padding') as HTMLDivElement).toBeTruthy();
    });

    it('should not emit the afterAllClosed stream on subscribe if there are no open dialogs', () => {
        const spy = jasmine.createSpy('afterAllClosed spy');

        dialog.afterAllClosed().subscribe(spy);

        expect(spy).not.toHaveBeenCalled();
    });

    describe(`width, height,min-width,min-height,max-width,max-height`, () => {
        it('should override the width of the overlay pane', () => {
            dialog.open(DialogSimpleContentComponent, {
                width: '500px'
            });

            viewContainerFixture.detectChanges();

            const overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;
            expect(overlayPane.style.width).toBe('500px');
        });

        it('should override the height of the overlay pane', () => {
            dialog.open(DialogSimpleContentComponent, {
                height: '100px'
            });

            viewContainerFixture.detectChanges();

            const overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;

            expect(overlayPane.style.height).toBe('100px');
        });

        it('should override the min-width of the overlay pane', () => {
            dialog.open(DialogSimpleContentComponent, {
                minWidth: '500px'
            });

            viewContainerFixture.detectChanges();

            const overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;

            expect(overlayPane.style.minWidth).toBe('500px');
        });

        it('should override the max-width of the overlay pane', () => {
            dialog.open(DialogSimpleContentComponent, {
                maxWidth: '100px'
            });

            viewContainerFixture.detectChanges();

            const overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;

            expect(overlayPane.style.maxWidth).toBe('100px');
        });

        it('should override the min-height of the overlay pane', () => {
            dialog.open(DialogSimpleContentComponent, {
                minHeight: '300px'
            });

            viewContainerFixture.detectChanges();

            const overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;

            expect(overlayPane.style.minHeight).toBe('300px');
        });

        it('should override the max-height of the overlay pane', () => {
            dialog.open(DialogSimpleContentComponent, {
                maxHeight: '100px'
            });

            viewContainerFixture.detectChanges();

            const overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;

            expect(overlayPane.style.maxHeight).toBe('100px');
        });
    });

    describe(`position`, () => {
        it('should override the top offset of the overlay pane', () => {
            dialog.open(DialogSimpleContentComponent, {
                position: {
                    top: '100px'
                }
            });

            viewContainerFixture.detectChanges();
            const overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;

            expect(overlayPane.style.marginTop).toBe('100px');
        });

        it('should override the bottom offset of the overlay pane', () => {
            dialog.open(DialogSimpleContentComponent, {
                position: {
                    bottom: '200px'
                }
            });

            viewContainerFixture.detectChanges();

            const overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;

            expect(overlayPane.style.marginBottom).toBe('200px');
        });

        it('should override the left offset of the overlay pane', () => {
            dialog.open(DialogSimpleContentComponent, {
                position: {
                    left: '250px'
                }
            });

            viewContainerFixture.detectChanges();

            const overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;

            expect(overlayPane.style.marginLeft).toBe('250px');
        });

        it('should override the right offset of the overlay pane', () => {
            dialog.open(DialogSimpleContentComponent, {
                position: {
                    right: '125px'
                }
            });

            viewContainerFixture.detectChanges();

            const overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;

            expect(overlayPane.style.marginRight).toBe('125px');
        });

        it('should allow for the position to be updated', () => {
            const dialogRef = dialog.open(DialogSimpleContentComponent, {
                position: {
                    left: '250px'
                }
            });

            viewContainerFixture.detectChanges();

            const overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;

            expect(overlayPane.style.marginLeft).toBe('250px');

            dialogRef.updatePosition({ left: '500px' });

            expect(overlayPane.style.marginLeft).toBe('500px');
        });
    });

    // describe('dimensions', () => {
    //     it('should allow for the dimensions to be updated', () => {
    //         let dialogRef = dialog.open(DialogSimpleContentComponent, { width: '100px' });

    //         viewContainerFixture.detectChanges();

    //         let overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;

    //         expect(overlayPane.style.width).toBe('100px');

    //         dialogRef.updateSize('200px');

    //         expect(overlayPane.style.width).toBe('200px');
    //     });

    //     it('should reset the overlay dimensions to their initial size', () => {
    //         let dialogRef = dialog.open(DialogSimpleContentComponent);

    //         viewContainerFixture.detectChanges();

    //         let overlayPane = overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;

    //         expect(overlayPane.style.width).toBeFalsy();
    //         expect(overlayPane.style.height).toBeFalsy();

    //         dialogRef.updateSize('200px', '200px');

    //         expect(overlayPane.style.width).toBe('200px');
    //         expect(overlayPane.style.height).toBe('200px');

    //         dialogRef.updateSize();

    //         expect(overlayPane.style.width).toBeFalsy();
    //         expect(overlayPane.style.height).toBeFalsy();
    //     });
    // });

    describe('direction', () => {
        it('should allow setting the layout direction', () => {
            dialog.open(DialogSimpleContentComponent, { direction: 'rtl' });

            viewContainerFixture.detectChanges();

            const overlayPane = overlayContainerElement.querySelector('.cdk-global-overlay-wrapper');

            expect(overlayPane.getAttribute('dir')).toBe('rtl');
        });

        it('should inject the correct layout direction in the component instance', () => {
            const dialogRef = dialog.open(DialogSimpleContentComponent, { direction: 'rtl' });

            viewContainerFixture.detectChanges();

            expect(dialogRef.componentInstance.directionality.value).toBe('rtl');
        });

        it('should fall back to injecting the global direction if none is passed by the config', () => {
            const dialogRef = dialog.open(DialogSimpleContentComponent, {});

            viewContainerFixture.detectChanges();

            expect(dialogRef.componentInstance.directionality.value).toBe('ltr');
        });
    });

    describe('close', () => {
        it('should close all of the dialogs', fakeAsync(() => {
            dialog.open(DialogSimpleContentComponent);
            dialog.open(DialogSimpleContentComponent);
            dialog.open(DialogSimpleContentComponent);

            expect(getDialogContainerElements().length).toBe(3);

            dialog.closeAll();
            viewContainerFixture.detectChanges();
            flush();

            expect(getDialogContainerElements().length).toBe(0);
        }));

        it('should close all dialogs when the user goes forwards/backwards in history', fakeAsync(() => {
            dialog.open(DialogSimpleContentComponent);
            dialog.open(DialogSimpleContentComponent);

            expect(getDialogContainerElements().length).toBe(2);

            mockLocation.simulateUrlPop('');
            viewContainerFixture.detectChanges();
            flush();

            expect(getDialogContainerElements().length).toBe(0);
        }));

        it('should close all open dialogs when the location hash changes', fakeAsync(() => {
            dialog.open(DialogSimpleContentComponent);
            dialog.open(DialogSimpleContentComponent);

            expect(getDialogContainerElements().length).toBe(2);

            mockLocation.simulateHashChange('');
            viewContainerFixture.detectChanges();
            flush();

            expect(getDialogContainerElements().length).toBe(0);
        }));

        it('should close all of the dialogs when the injectable is destroyed', fakeAsync(() => {
            dialog.open(DialogSimpleContentComponent);
            dialog.open(DialogSimpleContentComponent);
            dialog.open(DialogSimpleContentComponent);

            expect(getDialogContainerElements().length).toBe(3);

            dialog.ngOnDestroy();
            viewContainerFixture.detectChanges();
            flush();

            expect(getDialogContainerElements().length).toBe(0);
        }));

        it('should complete open and close streams when the injectable is destroyed', fakeAsync(() => {
            const afterOpenedSpy = jasmine.createSpy('after opened spy');
            const afterAllClosedSpy = jasmine.createSpy('after all closed spy');
            const afterOpenedSubscription = dialog.afterOpened().subscribe({ complete: afterOpenedSpy });
            const afterAllClosedSubscription = dialog.afterAllClosed().subscribe({
                complete: afterAllClosedSpy
            });

            dialog.ngOnDestroy();

            expect(afterOpenedSpy).toHaveBeenCalled();
            expect(afterAllClosedSpy).toHaveBeenCalled();

            afterOpenedSubscription.unsubscribe();
            afterAllClosedSubscription.unsubscribe();
        }));

        it('should allow the consumer to disable closing a dialog on navigation', fakeAsync(() => {
            dialog.open(DialogSimpleContentComponent);
            dialog.open(DialogSimpleContentComponent, { closeOnNavigation: false });

            expect(getDialogContainerElements().length).toBe(2);

            mockLocation.simulateUrlPop('');
            viewContainerFixture.detectChanges();
            flush();

            expect(getDialogContainerElements().length).toBe(1);
        }));

        it('should have the componentInstance available in the afterClosed callback', fakeAsync(() => {
            const dialogRef = dialog.open(DialogSimpleContentComponent);
            const spy = jasmine.createSpy('afterClosed spy');

            flushMicrotasks();
            viewContainerFixture.detectChanges();
            flushMicrotasks();

            dialogRef.afterClosed().subscribe(() => {
                spy();
                expect(dialogRef.componentInstance).toBeTruthy('Expected component instance to be defined.');
            });

            dialogRef.close();

            flushMicrotasks();
            viewContainerFixture.detectChanges();
            tick(500);

            // Ensure that the callback actually fires.
            expect(spy).toHaveBeenCalled();
        }));

        it('should close dialog when canClose return true', fakeAsync(() => {
            dialog.open(DialogSimpleContentComponent, {
                canClose: () => true
            });
            expect(getDialogContainerElements().length).toBe(1);
            dialog.close();
            viewContainerFixture.detectChanges();
            flush();
            expect(getDialogContainerElements().length).toBe(0);
        }));

        it('should not close when canClose return false', fakeAsync(() => {
            dialog.open(DialogSimpleContentComponent, {
                canClose: () => false
            });
            expect(getDialogContainerElements().length).toBe(1);
            dialog.close();
            viewContainerFixture.detectChanges();
            flush();
            expect(getDialogContainerElements().length).toBe(1);
        }));

        it('should force close worked', fakeAsync(() => {
            dialog.open(DialogSimpleContentComponent, {
                canClose: () => false
            });
            expect(getDialogContainerElements().length).toBe(1);
            dialog.close(null, true);
            viewContainerFixture.detectChanges();
            flush();
            expect(getDialogContainerElements().length).toBe(0);
        }));
    });

    it('should set the proper animation states', () => {
        const dialogRef = dialog.open(DialogSimpleContentComponent, { viewContainerRef: testViewContainerRef });
        const dialogContainer: ThyDialogContainerComponent = viewContainerFixture.debugElement.query(
            By.directive(ThyDialogContainerComponent)
        ).componentInstance;

        expect(dialogContainer.animationState).toBe('void');

        dialogRef.close();

        expect(dialogContainer.animationState).toBe('exit');
    });

    it('should not keep a reference to the component after the dialog is closed', fakeAsync(() => {
        const dialogRef = dialog.open(DialogSimpleContentComponent);

        expect(dialogRef.componentInstance).toBeTruthy();

        dialogRef.close();
        viewContainerFixture.detectChanges();
        flush();

        expect(dialogRef.componentInstance).toBeFalsy('Expected reference to have been cleared.');
    }));

    describe('unique id', () => {
        it('should assign a unique id to each dialog', () => {
            const one = dialog.open(DialogSimpleContentComponent);
            const two = dialog.open(DialogSimpleContentComponent);

            expect(one.id).toBeTruthy();
            expect(two.id).toBeTruthy();
            expect(one.id).not.toBe(two.id);
        });

        it('should allow for the id to be overwritten', () => {
            const dialogRef = dialog.open(DialogSimpleContentComponent, { id: 'pizza' });
            expect(dialogRef.id).toBe('pizza');
        });

        it('should throw when trying to open a dialog with the same id as another dialog', () => {
            dialog.open(DialogSimpleContentComponent, { id: 'pizza' });
            expect(() => dialog.open(DialogSimpleContentComponent, { id: 'pizza' })).toThrowError(/must be unique/g);
        });

        it('should be able to find a dialog by id', () => {
            const dialogRef = dialog.open(DialogSimpleContentComponent, { id: 'pizza' });
            expect(dialog.getDialogById('pizza')).toBe(dialogRef);
        });

        it('should get correct openedDialogs', () => {
            const dialogRef = dialog.open(DialogSimpleContentComponent, { id: 'pizza' });
            const openedDialog = dialog.getOpenedDialogs();
            expect(openedDialog.length).toEqual(1);
            expect(openedDialog[0]).toEqual(dialogRef);

            const dialogRef1 = dialog.open(DialogSimpleContentComponent, { id: 'hamburg' });
            expect(openedDialog.length).toEqual(2);
            expect(openedDialog[1]).toEqual(dialogRef1);
        });
    });

    // describe('aria-hidden', () => {
    //     it('should toggle `aria-hidden` on the overlay container siblings', fakeAsync(() => {
    //         const sibling = document.createElement('div');
    //         overlayContainerElement.parentNode.appendChild(sibling);
    //         const dialogRef = dialog.open(DialogSimpleContentComponent, { viewContainerRef: testViewContainerRef });
    //         viewContainerFixture.detectChanges();
    //         flush();
    //         expect(sibling.getAttribute('aria-hidden')).toBe('true', 'Expected sibling to be hidden');
    //         expect(overlayContainerElement.hasAttribute('aria-hidden')).toBe(
    //             false,
    //             'Expected overlay container not to be hidden.'
    //         );
    //         dialogRef.close();
    //         viewContainerFixture.detectChanges();
    //         flush();
    //         expect(sibling.hasAttribute('aria-hidden')).toBe(false, 'Expected sibling to no longer be hidden.');
    //         sibling.parentNode.removeChild(sibling);
    //     }));
    //     it('should restore `aria-hidden` to the overlay container siblings on close', fakeAsync(() => {
    //         const sibling = document.createElement('div');
    //         sibling.setAttribute('aria-hidden', 'true');
    //         overlayContainerElement.parentNode.appendChild(sibling);
    //         const dialogRef = dialog.open(DialogSimpleContentComponent, { viewContainerRef: testViewContainerRef });
    //         viewContainerFixture.detectChanges();
    //         flush();
    //         expect(sibling.getAttribute('aria-hidden')).toBe('true', 'Expected sibling to be hidden.');
    //         dialogRef.close();
    //         viewContainerFixture.detectChanges();
    //         flush();
    //         expect(sibling.getAttribute('aria-hidden')).toBe('true', 'Expected sibling to remain hidden.');
    //         sibling.parentNode!.removeChild(sibling);
    //     }));
    //     it('should not set `aria-hidden` on `aria-live` elements', fakeAsync(() => {
    //         const sibling = document.createElement('div');
    //         sibling.setAttribute('aria-live', 'polite');
    //         overlayContainerElement.parentNode.appendChild(sibling);
    //         dialog.open(DialogSimpleContentComponent, { viewContainerRef: testViewContainerRef });
    //         viewContainerFixture.detectChanges();
    //         flush();
    //         expect(sibling.hasAttribute('aria-hidden')).toBe(false, 'Expected live element not to be hidden.');
    //         sibling.parentNode.removeChild(sibling);
    //     }));
    // });

    describe('hasBackdrop option', () => {
        it('should have a backdrop', () => {
            dialog.open(DialogSimpleContentComponent, {
                hasBackdrop: true,
                viewContainerRef: testViewContainerRef
            });

            viewContainerFixture.detectChanges();

            expect(getOverlayBackdropElement()).toBeTruthy();
        });

        it('should not have a backdrop', () => {
            dialog.open(DialogSimpleContentComponent, {
                hasBackdrop: false,
                viewContainerRef: testViewContainerRef
            });

            viewContainerFixture.detectChanges();

            expect(getOverlayBackdropElement()).toBeFalsy();
        });
    });

    describe('backdropClosable option', () => {
        it('should prevent closing via clicks on the backdrop', fakeAsync(() => {
            dialog.open(DialogSimpleContentComponent, {
                backdropClosable: false,
                viewContainerRef: testViewContainerRef
            });

            viewContainerFixture.detectChanges();

            const backdrop = getOverlayBackdropElement() as HTMLElement;
            backdrop.click();
            viewContainerFixture.detectChanges();
            flush();

            expect(getDialogContainerElement()).toBeTruthy();
        }));

        it('should prevent closing via the escape key', fakeAsync(() => {
            dialog.open(DialogSimpleContentComponent, {
                backdropClosable: false,
                viewContainerRef: testViewContainerRef
            });

            viewContainerFixture.detectChanges();
            dispatchKeyboardEvent(document.body, 'keydown', ESCAPE);
            viewContainerFixture.detectChanges();
            flush();

            expect(getDialogContainerElement()).toBeTruthy();
        }));

        it('should allow for the backdropClosable option to be updated while open', fakeAsync(() => {
            const dialogRef = dialog.open(DialogSimpleContentComponent, {
                backdropClosable: false,
                viewContainerRef: testViewContainerRef
            });

            viewContainerFixture.detectChanges();

            const backdrop = getOverlayBackdropElement() as HTMLElement;
            backdrop.click();
            viewContainerFixture.detectChanges();
            flush();

            expect(getDialogContainerElement()).toBeTruthy();

            dialogRef.backdropClosable = true;
            backdrop.click();
            viewContainerFixture.detectChanges();
            flush();

            expect(getDialogContainerElement()).toBeFalsy();
        }));
    });

    describe('panelClass option', () => {
        it('should have custom panel class', () => {
            dialog.open(DialogSimpleContentComponent, {
                panelClass: 'custom-panel-class',
                viewContainerRef: testViewContainerRef
            });

            viewContainerFixture.detectChanges();

            expect(overlayContainerElement.querySelector('.custom-panel-class')).toBeTruthy();
        });

        it('should work with custom panel class use array ', () => {
            dialog.open(DialogSimpleContentComponent, {
                panelClass: ['custom-panel-class', 'custom-panel-class-other'],
                viewContainerRef: testViewContainerRef
            });

            viewContainerFixture.detectChanges();

            expect(overlayContainerElement.querySelector('.custom-panel-class')).toBeTruthy();
            expect(overlayContainerElement.querySelector('.custom-panel-class-other')).toBeTruthy();
        });
    });

    describe('backdropClass option', () => {
        it('should have default backdrop class', () => {
            dialog.open(DialogSimpleContentComponent, {
                backdropClass: '',
                viewContainerRef: testViewContainerRef
            });

            viewContainerFixture.detectChanges();

            expect(overlayContainerElement.querySelector('.cdk-overlay-dark-backdrop')).toBeTruthy();
        });

        it('should have custom backdrop class', () => {
            dialog.open(DialogSimpleContentComponent, {
                backdropClass: 'custom-backdrop-class',
                viewContainerRef: testViewContainerRef
            });

            viewContainerFixture.detectChanges();

            expect(overlayContainerElement.querySelector('.custom-backdrop-class')).toBeTruthy();
        });
    });

    describe('size option', () => {
        it('should have default panel class dialog-md', () => {
            dialog.open(DialogSimpleContentComponent, {});
            viewContainerFixture.detectChanges();
            expect(overlayContainerElement.querySelector('.dialog-md')).toBeTruthy();
        });

        it('should have panel class dialog-sm', () => {
            dialog.open(DialogSimpleContentComponent, {
                size: ThyDialogSizes.sm
            });
            viewContainerFixture.detectChanges();
            expect(overlayContainerElement.querySelector('.dialog-sm')).toBeTruthy();
        });

        it('should have panel class dialog-lg', () => {
            dialog.open(DialogSimpleContentComponent, {
                size: ThyDialogSizes.lg
            });
            viewContainerFixture.detectChanges();
            expect(overlayContainerElement.querySelector('.dialog-lg')).toBeTruthy();
        });

        it('should have panel class dialog-max-lg', () => {
            dialog.open(DialogSimpleContentComponent, {
                size: ThyDialogSizes.maxLg
            });
            viewContainerFixture.detectChanges();
            expect(overlayContainerElement.querySelector('.dialog-max-lg')).toBeTruthy();
        });

        it('should have panel class dialog-super-lg', () => {
            dialog.open(DialogSimpleContentComponent, {
                size: ThyDialogSizes.superLg
            });
            viewContainerFixture.detectChanges();
            expect(overlayContainerElement.querySelector('.dialog-super-lg')).toBeTruthy();
        });
    });

    describe('autoFocus option', () => {
        // When testing focus, all of the elements must be in the DOM.
        beforeEach(() => document.body.appendChild(overlayContainerElement));
        afterEach(() => document.body.removeChild(overlayContainerElement));

        it('should focus the first tabbable element of the dialog on open', (done: DoneFn) => {
            dialog.open(DialogSimpleContentComponent);

            viewContainerFixture.detectChanges();
            viewContainerFixture.whenStable().then(() => {
                expect(document.activeElement!.tagName).toBe('BUTTON');
                done();
            });
        });

        it('should focus the first tabbable element（ThyAction here） when confirm dialog content is string type', (done: DoneFn) => {
            dialog.confirm({
                content: 'The Content of Confirm Dialog',
                onOk: () => {
                    return of([1]).pipe(
                        map(() => {
                            return true;
                        })
                    );
                }
            });
            viewContainerFixture.detectChanges();
            viewContainerFixture.whenStable().then(() => {
                expect(document.activeElement!.tagName).toBe('A');
                done();
            });
        });

        it('should focus the thy-dialog-container element when autoFocus as false', (done: DoneFn) => {
            dialog.open(DialogSimpleContentComponent, { autoFocus: false });
            viewContainerFixture.detectChanges();
            viewContainerFixture.whenStable().then(() => {
                expect(document.activeElement!.tagName).toBe('THY-DIALOG-CONTAINER');
                done();
            });
        });
    });

    describe('confirm', () => {
        it('should work with a confirm dialog when onOk callback return undefined', (done: DoneFn) => {
            dialog.confirm({
                content: 'test: ok button return undefined',
                onOk: () => {}
            });
            assertConfirmBtnWork(done);
        });

        it('should work with a confirm dialog when onOk callback return true', (done: DoneFn) => {
            dialog.confirm({
                content: 'test: ok button return true',
                onOk: () => {
                    return of([1]).pipe(
                        map(() => {
                            return true;
                        })
                    );
                }
            });
            assertConfirmBtnWork(done);
        });

        it('should work with a confirm dialog when onOk callback return false', (done: DoneFn) => {
            dialog.confirm({
                content: 'test: ok button return false',
                onOk: () => {
                    return of([1]).pipe(
                        map(() => {
                            return false;
                        })
                    );
                }
            });
            assertConfirmBtnWork(done, false);
        });

        it('should the cancel button work and callback work', (done: DoneFn) => {
            const spy = jasmine.createSpy('cancel spy');

            dialog.confirm({
                content: 'test: cancel button',
                onCancel: spy,
                onOk: () => {
                    return of([1]).pipe(
                        map(() => {
                            return true;
                        })
                    );
                }
            });
            viewContainerFixture.detectChanges();
            const cancelBtn = getElementByDialogContainer('.thy-confirm-footer button:nth-child(2)');
            if (cancelBtn) {
                cancelBtn.click();
            }
            viewContainerFixture.detectChanges();
            viewContainerFixture.whenStable().then(() => {
                expect(spy).toHaveBeenCalled();
                expect(getDialogContainerElement()).toBeNull();
                done();
            });
        });

        describe('confirm options', () => {
            it('should show default value', () => {
                dialog.confirm({
                    content: 'test: global custom',
                    onOk: () => {}
                });
                viewContainerFixture.detectChanges();
                expect(getConfirmElements().headerTitle.textContent).toBe('全局定义标题');
                expect(getConfirmElements().okButton.textContent).toBe('确定');
                expect(getConfirmElements().cancelButton.textContent).toBe('取消');
                expect(getConfirmElements().okButton.classList.contains('btn-danger')).toBeTruthy();
                expect(getConfirmElements().confirmFooter.classList.contains('thy-confirm-footer-left'));
            });

            it('should show custom value', () => {
                dialog.confirm({
                    title: '自定义标题',
                    content: 'test: custom options',
                    okText: '好的，知道了',
                    cancelText: '不了，谢谢',
                    okType: 'primary',
                    footerAlign: 'right',
                    onOk: () => {}
                });
                viewContainerFixture.detectChanges();
                expect(getConfirmElements().headerTitle.textContent).toBe('自定义标题');
                expect(getConfirmElements().okButton.textContent).toBe('好的，知道了');
                expect(getConfirmElements().cancelButton.textContent).toBe('不了，谢谢');
                expect(getConfirmElements().okButton.classList.contains('btn-primary')).toBeTruthy();
                expect(getConfirmElements().confirmFooter.classList.contains('thy-confirm-footer-right'));
            });

            it('should show okText when loading and okLoadingText is not custom', () => {
                const dialogRef = dialog.confirm({
                    content: 'test: not custom okLoadingText',
                    onOk: () => {}
                });
                const okButton = getConfirmElements().okButton;
                if (okButton) {
                    okButton.click();
                }
                viewContainerFixture.detectChanges();
                expect(dialogRef.componentInstance.okLoadingText).toBe(dialogRef.componentInstance.okText);
                expect(getConfirmElements().okButton.textContent).toBe(dialogRef.componentInstance.okText);
            });

            it('should show okLoadingText when loading and okLoadingText is custom', fakeAsync(() => {
                const dialogRef = dialog.confirm({
                    content: 'test: custom okLoadingText',
                    okLoadingText: '加载中...',
                    onOk: () => {}
                });
                viewContainerFixture.detectChanges();
                // 这个是因为按钮组件在 ngAfterViewInit 钩子中替换了 Dom 元素，如果不 tick 一下加载状态会修改失败
                tick();
                const okButton = getConfirmElements().okButton;
                if (okButton) {
                    okButton.click();
                }
                viewContainerFixture.detectChanges();
                expect(dialogRef.componentInstance.okLoadingText).toBe('加载中...');
                expect(okButton.textContent).toBe('加载中...');
                flush();
            }));
        });
    });

    describe(`dialog should work with header close button`, () => {
        it('should close the dialog when click dialog header close button', (done: DoneFn) => {
            const dialogRef = dialog.open(DialogFullContentComponent, { viewContainerRef: testViewContainerRef });
            const spy = jasmine.createSpy('Dialog afterClosed spy');
            dialogRef.afterClosed().subscribe(spy);
            assertHeaderButtonClick(spy, done);
        });

        it('should close the confirm dialog when click dialog header close button', (done: DoneFn) => {
            const confirmRef = dialog.confirm({
                content: 'test: confirm dialog header close button',
                onOk: () => {
                    return of([1]).pipe(
                        map(() => {
                            return true;
                        })
                    );
                }
            });
            const spy = jasmine.createSpy('confirm dialog afterClosed spy');
            confirmRef.afterClosed().subscribe(spy);
            assertHeaderButtonClick(spy, done);
        });
    });

    // it('should add and remove panel classes while open', () => {
    //     let dialogRef = dialog.open(DialogSimpleContentComponent, {
    //         backdropClosable:true,
    //         viewContainerRef: testViewContainerRef
    //     });

    //     const pane = overlayContainerElement.querySelector('.cdk-overlay-pane') as HTMLElement;
    //     expect(pane.classList).not.toContain('custom-class-one', 'Expected class to be initially missing');

    //     dialogRef.addPanelClass('custom-class-one');
    //     expect(pane.classList).toContain('custom-class-one', 'Expected class to be added');

    //     dialogRef.removePanelClass('custom-class-one');
    //     expect(pane.classList).not.toContain('custom-class-one', 'Expected class to be removed');
    // });

    describe(`restoreFocus and restoreFocusOptions`, () => {
        function setup() {
            const scrollFixture = TestBed.createComponent(DialogRestoreComponent);
            const scrollComponent = scrollFixture.componentInstance;
            const button = scrollFixture.debugElement.query(By.css('button'));
            return { scrollFixture, scrollComponent, button };
        }

        function close(scrollComponent: DialogRestoreComponent) {
            const headerButton = scrollComponent.dialogRef
                .getOverlayRef()
                .overlayElement.querySelector(`.dialog-header .thy-icon-close`) as HTMLElement;
            if (headerButton) {
                headerButton.focus();
                headerButton.click();
            }
        }

        it('should blur when restoreFocus is false ', fakeAsync(() => {
            const { scrollFixture, scrollComponent, button } = setup();
            expect(scrollComponent).toBeTruthy();
            scrollComponent.restoreFocus = false;
            scrollFixture.detectChanges();
            button.nativeElement.focus();
            expect(document.activeElement).toEqual(button.nativeElement);
            button.nativeElement.click();
            flush();
            expect(scrollComponent.dialogRef).toBeTruthy();
            expect(scrollComponent.dialogRef.containerInstance.config.restoreFocus).toBe(false);
            close(scrollComponent);
            scrollFixture.detectChanges();
            scrollFixture.whenStable().then(() => {
                expect(document.activeElement).not.toEqual(button.nativeElement);
            });
        }));

        it('should focus when restoreFocus is true ', fakeAsync(() => {
            const { scrollFixture, scrollComponent, button } = setup();
            expect(scrollComponent).toBeTruthy();
            scrollComponent.restoreFocus = true;
            scrollFixture.detectChanges();
            button.nativeElement.focus();
            button.nativeElement.click();
            flush();
            expect(scrollComponent.dialogRef).toBeTruthy();
            expect(scrollComponent.dialogRef.containerInstance.config.restoreFocus).toBe(true);
            expect(document.activeElement).not.toEqual(button.nativeElement);
            close(scrollComponent);
            scrollFixture.detectChanges();
            scrollFixture.whenStable().then(() => {
                expect(document.activeElement).toEqual(button.nativeElement);
            });
        }));

        it('shoule scroll when restoreFocusOptions is preventScroll false', fakeAsync(() => {
            const { scrollFixture, scrollComponent, button } = setup();
            expect(scrollComponent).toBeTruthy();
            scrollComponent.restoreFocus = true;
            scrollComponent.restoreFocusOptions = {
                preventScroll: false
            };
            scrollFixture.detectChanges();
            button.nativeElement.focus({
                preventScroll: true
            });
            const _scrollElement = scrollFixture.nativeElement.querySelector(`.scrollable-container`);
            const _previouslyScrollTop = _scrollElement.scrollTop;
            expect(_previouslyScrollTop).toBe(0);
            button.nativeElement.click();
            flush();
            expect(
                scrollComponent.dialogRef.getOverlayRef().overlayElement.querySelector(`.thy-dialog-container`) as HTMLElement
            ).toBeTruthy();
            close(scrollComponent);
            scrollFixture.detectChanges();
            scrollFixture.whenStable().then(() => {
                expect(document.activeElement).toEqual(button.nativeElement);
                expect(_scrollElement.scrollTop).not.toEqual(_previouslyScrollTop);
                expect(_scrollElement.scrollTop).not.toBe(0);
            });
        }));

        it('shoule prevent scroll when restoreFocusOptions is preventScroll', fakeAsync(() => {
            const { scrollFixture, scrollComponent, button } = setup();
            expect(scrollComponent).toBeTruthy();
            scrollComponent.restoreFocus = true;
            scrollComponent.restoreFocusOptions = {
                preventScroll: true
            };
            scrollFixture.detectChanges();
            button.nativeElement.focus({
                preventScroll: true
            });
            const _scrollElement = scrollFixture.nativeElement.querySelector(`.scrollable-container`);
            const _previouslyScrollTop = _scrollElement.scrollTop;
            expect(_previouslyScrollTop).toBe(0);
            button.nativeElement.click();
            flush();
            expect(
                scrollComponent.dialogRef.getOverlayRef().overlayElement.querySelector(`.thy-dialog-container`) as HTMLElement
            ).toBeTruthy();
            close(scrollComponent);
            scrollFixture.detectChanges();
            scrollFixture.whenStable().then(() => {
                expect(document.activeElement).toEqual(button.nativeElement);
                expect(_scrollElement.scrollTop).toEqual(_previouslyScrollTop);
                expect(_scrollElement.scrollTop).toBe(0);
            });
        }));
    });
});
