import { Component, DebugElement, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThyActionModule } from '../action.module';
import { injectDefaultSvgIconSet } from 'ngx-tethys/testing';
import { By } from '@angular/platform-browser';

@Component({
    selector: 'thy-test-action-basic',
    template: `
        <a id="default" thyAction thyActionIcon="inbox"></a>
        <a id="with-text" thyAction thyActionIcon="inbox">Inbox</a>
        <a id="with-active" thyAction thyActionActive="true" thyActionIcon="inbox"></a>
        <a id="with-type" thyAction thyType="danger" thyActionIcon="inbox"></a>
        <a id="with-theme-lite" thyTheme="lite" thyAction thyType="danger" thyActionIcon="inbox"></a>
    `
})
class ThyActionTestBasicComponent {}

describe('thy-action', () => {
    let fixture: ComponentFixture<ThyActionTestBasicComponent>;
    let actionDebugElement: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyActionModule],
            declarations: [ThyActionTestBasicComponent],
            providers: []
        });
        TestBed.compileComponents();
    });

    beforeEach(() => {
        injectDefaultSvgIconSet();
        fixture = TestBed.createComponent(ThyActionTestBasicComponent);
        fixture.detectChanges();
    });

    function assertActionExpected(actionElement: HTMLElement, iconName: string, text?: string) {
        expect(actionElement.classList.contains('thy-action')).toBeTruthy();
        expect(actionElement.children[0]).toBeTruthy();
        expect(actionElement.children[0].classList.contains('thy-icon')).toBeTruthy();
        expect(actionElement.children[0].classList.contains(`thy-icon-${iconName}`)).toBeTruthy();
        if (text) {
            expect(actionElement.children[1]).toBeTruthy();
            expect(actionElement.children[1].nodeName).toEqual('SPAN');
            expect(actionElement.children[1].textContent).toContain(text);
        }
    }

    it('should create', () => {
        actionDebugElement = fixture.debugElement.query(By.css('#default'));
        expect(fixture.componentInstance).toBeTruthy();
        expect(actionDebugElement.componentInstance).toBeTruthy();
        assertActionExpected(actionDebugElement.nativeElement, 'inbox');
    });

    it('should create with text', () => {
        actionDebugElement = fixture.debugElement.query(By.css('#with-text'));
        expect(fixture.componentInstance).toBeTruthy();
        expect(actionDebugElement.componentInstance).toBeTruthy();
        assertActionExpected(actionDebugElement.nativeElement, 'inbox', 'Inbox');
    });

    it('should active', () => {
        actionDebugElement = fixture.debugElement.query(By.css('#with-active'));
        expect(fixture.componentInstance).toBeTruthy();
        expect(actionDebugElement.componentInstance).toBeTruthy();
        assertActionExpected(actionDebugElement.nativeElement, 'inbox');
        expect(actionDebugElement.nativeElement.classList.contains('active')).toBeTruthy();
    });

    it('should create with type', () => {
        actionDebugElement = fixture.debugElement.query(By.css('#with-type'));
        expect(fixture.componentInstance).toBeTruthy();
        expect(actionDebugElement.componentInstance).toBeTruthy();
        assertActionExpected(actionDebugElement.nativeElement, 'inbox');
        expect(actionDebugElement.nativeElement.classList.contains('action-danger')).toBeTruthy();
    });

    it('should create with lite theme', () => {
        actionDebugElement = fixture.debugElement.query(By.css('#with-theme-lite'));
        expect(fixture.componentInstance).toBeTruthy();
        expect(actionDebugElement.componentInstance).toBeTruthy();
        assertActionExpected(actionDebugElement.nativeElement, 'inbox');
        expect(actionDebugElement.nativeElement.classList.contains('action-danger')).toBeTruthy();
        expect(actionDebugElement.nativeElement.classList.contains('thy-action-lite')).toBeTruthy();
    });
});
