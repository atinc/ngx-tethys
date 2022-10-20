import { Component, DebugElement, TemplateRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ThyOutletModule } from './module';
import { ThyStringOrTemplateOutletDirective } from './string-or-template-outlet.directive';

@Component({
    template: `
        TargetText
        <ng-container *thyStringOrTemplateOutlet="stringTemplateOutlet; context: context; let stringTemplateOutlet">
            {{ stringTemplateOutlet }}
        </ng-container>
        <ng-template #stringTpl let-data>The data is {{ data }}</ng-template>
        <ng-template #emptyTpl>Empty Template</ng-template>
        <ng-template #dataTimeTpl let-data let-time="time">The data is {{ data }}, The time is {{ time }}</ng-template>
    `
})
export class ThyStringOrTemplateOutletTestComponent {
    @ViewChild('stringTpl') stringTpl!: TemplateRef<any>;
    @ViewChild('emptyTpl') emptyTpl!: TemplateRef<any>;
    @ViewChild('dataTimeTpl') dataTimeTpl!: TemplateRef<any>;
    @ViewChild(ThyStringOrTemplateOutletDirective) thyStringOrTemplateOutletDirective!: ThyStringOrTemplateOutletDirective;
    stringTemplateOutlet: TemplateRef<any> | string | null = null;
    context: any = { $implicit: '' };
}

describe('string or template outlet directive', () => {
    let fixture: ComponentFixture<ThyStringOrTemplateOutletTestComponent>;
    let component: ThyStringOrTemplateOutletTestComponent;
    let debugElement: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyOutletModule],
            declarations: [ThyStringOrTemplateOutletTestComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(ThyStringOrTemplateOutletTestComponent);
        component = fixture.debugElement.componentInstance;
        debugElement = fixture.debugElement.query(By.directive(ThyStringOrTemplateOutletDirective));
        fixture.detectChanges();
    });
    it(`should created`, () => {
        expect(fixture).toBeTruthy();
        expect(fixture.nativeElement.innerText).toBeTruthy();
    });
    it('should work when switch between null and string', () => {
        component.stringTemplateOutlet = 'String Testing';
        fixture.detectChanges();
        expect(fixture.nativeElement.innerText).toBe('TargetText String Testing');
        component.stringTemplateOutlet = null;
        fixture.detectChanges();
        expect(fixture.nativeElement.innerText).toBe('TargetText');
    });
    it('should work when switch between null and template', () => {
        component.stringTemplateOutlet = component.stringTpl;
        fixture.detectChanges();
        expect(fixture.nativeElement.innerText).toBe('TargetText The data is');
        component.stringTemplateOutlet = null;
        fixture.detectChanges();
        expect(fixture.nativeElement.innerText).toBe('TargetText');
    });
    it('should work when switch between string', () => {
        component.stringTemplateOutlet = 'String Testing';
        fixture.detectChanges();
        expect(fixture.nativeElement.innerText).toBe('TargetText String Testing');
        component.stringTemplateOutlet = 'String String';
        fixture.detectChanges();
        expect(fixture.nativeElement.innerText).toBe('TargetText String String');
    });
    it('should work when switch between string and template', () => {
        component.stringTemplateOutlet = 'String Testing';
        fixture.detectChanges();
        expect(fixture.nativeElement.innerText).toBe('TargetText String Testing');
        component.stringTemplateOutlet = component.stringTpl;
        fixture.detectChanges();
        expect(fixture.nativeElement.innerText).toBe('TargetText The data is');
        component.stringTemplateOutlet = 'String Testing';
        fixture.detectChanges();
        expect(fixture.nativeElement.innerText).toBe('TargetText String Testing');
    });
    it('should work when switch between template', () => {
        component.stringTemplateOutlet = component.stringTpl;
        fixture.detectChanges();
        expect(fixture.nativeElement.innerText).toBe('TargetText The data is');
        component.stringTemplateOutlet = component.emptyTpl;
        fixture.detectChanges();
        expect(fixture.nativeElement.innerText).toBe('TargetText Empty Template');
    });

    describe('context shape change', () => {
        it('should work when context shape change', () => {
            component.stringTemplateOutlet = component.dataTimeTpl;
            const spyOnUpdateContext = spyOn(component.thyStringOrTemplateOutletDirective as any, 'updateContext').and.callThrough();
            const spyOnRecreateView = spyOn(component.thyStringOrTemplateOutletDirective as any, 'recreateView').and.callThrough();
            fixture.detectChanges();
            expect(fixture.nativeElement.innerText).toBe('TargetText The data is , The time is');
            component.context = { $implicit: 'data', time: 'time' };
            fixture.detectChanges();
            expect(spyOnUpdateContext).toHaveBeenCalledTimes(0);
            expect(spyOnRecreateView).toHaveBeenCalledTimes(2);
            expect(fixture.nativeElement.innerText).toBe('TargetText The data is data, The time is time');
        });
    });
    describe('context data change', () => {
        it('should work when context implicit change', () => {
            component.stringTemplateOutlet = component.stringTpl;
            const spyOnUpdateContext = spyOn(component.thyStringOrTemplateOutletDirective as any, 'updateContext').and.callThrough();
            const spyOnRecreateView = spyOn(component.thyStringOrTemplateOutletDirective as any, 'recreateView').and.callThrough();
            fixture.detectChanges();
            expect(fixture.nativeElement.innerText).toBe('TargetText The data is');
            component.context = { $implicit: 'data' };
            fixture.detectChanges();
            expect(spyOnUpdateContext).toHaveBeenCalledTimes(1);
            expect(spyOnRecreateView).toHaveBeenCalledTimes(1);
            expect(fixture.nativeElement.innerText).toBe('TargetText The data is data');
        });
    });
});
