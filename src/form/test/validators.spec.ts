import { ThyFormDirective } from './../form.directive';
import { ThyFormModule } from 'ngx-tethys/form';
import { Component, ViewChild } from '@angular/core';
import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { UntypedFormControl, FormsModule, NgModel } from '@angular/forms';
import { confirmValidator, ThyMaxDirective, ThyMinDirective } from './../validator/index';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

describe('validator', () => {
    describe(`confirm`, () => {
        it('should create confirm attributes and validator true or false', () => {
            const control = new UntypedFormControl('123456');
            expect(confirmValidator('123456')(control)).toBeNull();
            expect(confirmValidator('111111')(control)).toEqual({
                confirm: {
                    value: '111111',
                    actual: '123456'
                }
            });
        });
    });

    describe(`max`, () => {
        it('should not error on 100 when max is 100', () => {
            const maxDirective = new ThyMaxDirective();
            maxDirective.max = '100';
            expect(maxDirective.validate(new UntypedFormControl(1))).toBeNull();
            expect(maxDirective.validate(new UntypedFormControl(99))).toBeNull();
            expect(maxDirective.validate(new UntypedFormControl(100))).toBeNull();
            expect(maxDirective.validate(new UntypedFormControl(101))).toEqual({
                max: { max: 100, actual: 101 }
            });
        });

        it('should error on 101 when max is 100', () => {
            const maxDirective = new ThyMaxDirective();
            maxDirective.max = '100';
            expect(maxDirective.validate(new UntypedFormControl(101))).toEqual({
                max: { max: 100, actual: 101 }
            });
        });

        describe('directive', () => {
            @Component({
    selector: 'test-max',
    template: `
                    <form name="demoForm">
                        <input type="number" max="10" name="age" #age="ngModel" [(ngModel)]="value" />
                    </form>
                `,
    standalone: false
})
            class TestMaxComponent {
                @ViewChild('age') ngModel: NgModel;

                value: number;
            }

            let fixture: ComponentFixture<TestMaxComponent>;

            beforeEach(() => {
                TestBed.configureTestingModule({
                    declarations: [TestMaxComponent],
                    imports: [ThyFormModule, FormsModule]
                }).compileComponents();

                fixture = TestBed.createComponent(TestMaxComponent);
            });

            it(`should not error`, fakeAsync(() => {
                fixture.componentInstance.value = 10;
                fixture.detectChanges();
                tick();
                expect(fixture.componentInstance.ngModel.errors).toBeNull();
            }));

            it(`should error`, fakeAsync(() => {
                fixture.componentInstance.value = 11;
                fixture.detectChanges();
                tick();
                expect(fixture.componentInstance.ngModel.errors).toEqual({
                    max: { max: 10, actual: 11 }
                });
            }));
        });
    });

    describe(`min`, () => {
        it('should not error on 100 when min is 100', () => {
            const minDirective = new ThyMinDirective();
            minDirective.min = '100';
            expect(minDirective.validate(new UntypedFormControl(100))).toBeNull();
            expect(minDirective.validate(new UntypedFormControl(101))).toBeNull();
        });

        it('should error on 99 when min is 100', () => {
            const minDirective = new ThyMinDirective();
            minDirective.min = '100';
            expect(minDirective.validate(new UntypedFormControl(99))).toEqual({
                min: { min: 100, actual: 99 }
            });
            expect(minDirective.validate(new UntypedFormControl(10))).toEqual({
                min: { min: 100, actual: 10 }
            });
        });

        describe('directive', () => {
            @Component({
    selector: 'test-min',
    template: `
                    <form name="demoForm">
                        <input type="number" min="10" name="age" #age="ngModel" [(ngModel)]="value" />
                    </form>
                `,
    standalone: false
})
            class TestMinComponent {
                @ViewChild('age') ngModel: NgModel;

                value: number;
            }

            let fixture: ComponentFixture<TestMinComponent>;

            beforeEach(() => {
                TestBed.configureTestingModule({
                    declarations: [TestMinComponent],
                    imports: [ThyFormModule, FormsModule]
                }).compileComponents();

                fixture = TestBed.createComponent(TestMinComponent);
            });

            it(`should not error`, fakeAsync(() => {
                fixture.componentInstance.value = 10;
                fixture.detectChanges();
                tick();
                expect(fixture.componentInstance.ngModel.errors).toBeNull();
            }));

            it(`should error`, fakeAsync(() => {
                fixture.componentInstance.value = 9;
                fixture.detectChanges();
                tick();
                expect(fixture.componentInstance.ngModel.errors).toEqual({
                    min: { min: 10, actual: 9 }
                });
            }));
        });
    });

    describe(`thyUniqueCheck`, () => {
        @Component({
    selector: 'test-unique-check',
    template: `
                <form #thyForm="thyForm" thyForm name="demoForm">
                    <input name="username" #username="ngModel" [(ngModel)]="value" [thyUniqueCheck]="checkFn" />
                </form>
            `,
    standalone: false
})
        class TestUniqueCheckComponent {
            @ViewChild('username') ngModel: NgModel;

            @ViewChild('thyForm') thyForm: ThyFormDirective;

            value = '';

            checkFn: (value: string) => Observable<boolean> = (value: string) => {
                return of(value).pipe(
                    map(value => {
                        if (value === 'hello') {
                            return true;
                        } else if (value === 'error') {
                            throw new Error(`custom error`);
                        } else {
                            return false;
                        }
                    })
                );
            };
        }

        let fixture: ComponentFixture<TestUniqueCheckComponent>;

        beforeEach(() => {
            TestBed.configureTestingModule({
                declarations: [TestUniqueCheckComponent],
                imports: [ThyFormModule, FormsModule]
            }).compileComponents();

            fixture = TestBed.createComponent(TestUniqueCheckComponent);
        });

        it('should not error on input name is not exist', fakeAsync(() => {
            fixture.componentInstance.value = 'somethings';
            fixture.detectChanges();
            tick();
            expect(fixture.componentInstance.ngModel.errors).toBeNull();
            expect(fixture.componentInstance.ngModel.invalid).toBe(false);
            expect(fixture.componentInstance.ngModel.valid).toBe(true);
            expect(fixture.componentInstance.thyForm.validator.validations).toEqual({});
        }));

        it('should error on input name is exist', fakeAsync(() => {
            fixture.componentInstance.value = 'hello';
            fixture.detectChanges();
            tick();
            expect(fixture.componentInstance.ngModel.errors).toEqual({
                thyUniqueCheck: true
            });
            expect(fixture.componentInstance.ngModel.invalid).toBe(true);
            expect(fixture.componentInstance.ngModel.valid).toBe(false);
            expect(fixture.componentInstance.thyForm.validator.validations).toEqual({
                username: {
                    hasError: true,
                    errorMessages: ['输入值已经存在，请重新输入']
                }
            });
        }));

        it('should not error when throw error in thyUniqueCheck', fakeAsync(() => {
            fixture.componentInstance.value = 'error';
            fixture.detectChanges();
            tick();
            expect(fixture.componentInstance.ngModel.errors).toBeNull();
            expect(fixture.componentInstance.ngModel.invalid).toBe(false);
            expect(fixture.componentInstance.ngModel.valid).toBe(true);
            expect(fixture.componentInstance.thyForm.validator.validations).toEqual({});
        }));
    });
});
