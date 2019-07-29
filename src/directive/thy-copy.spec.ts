import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ComponentFixture, async, TestBed, flush, fakeAsync, tick } from '@angular/core/testing';
import { ThyDirectiveModule } from './module';
import { ThyCopyDirective } from './thy-copy.directive';
import { dispatchFakeEvent } from '../core/testing';

describe('thy-copy', () => {
    let fixture: ComponentFixture<ThyCopyBasicComponent>;
    let testBasicComponent: ThyCopyBasicComponent;
    let testTargetComponent: ThyCopyBasicComponent;
    let testInputComponent: ThyCopyBasicComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ThyDirectiveModule],
            declarations: [ThyCopyBasicComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyCopyBasicComponent);
        testBasicComponent = fixture.componentInstance;
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ThyDirectiveModule],
            declarations: [ThyCopyTargetComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyCopyTargetComponent);
        testTargetComponent = fixture.componentInstance;
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ThyDirectiveModule],
            declarations: [ThyCopyInputComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyCopyInputComponent);
        testInputComponent = fixture.componentInstance;
    });

    describe('copy listener', () => {
        it('thyOnCopyed should be called', fakeAsync(() => {
            const el = testBasicComponent;
        }));
    });
});

@Component({
    template: `
        <button thyButton="primary-square" [thyCopy]="target">复制</button>
        <p #target>复制的是我</p>
    `
})
class ThyCopyTargetComponent implements OnInit {
    ngOnInit() {}
}

@Component({
    template: `
        <button thyButton="primary-square" thyCopy [thyCopyContent]="'我是第二只猪'">复制</button>
    `
})
class ThyCopyBasicComponent implements OnInit {
    ngOnInit() {}
}

@Component({
    template: `
        <button thyButton="primary-square" [thyCopy]="target">复制</button>
        <p>
            <input #target [ngModel]="inputText" />
        </p>
    `
})
class ThyCopyInputComponent implements OnInit {
    ngOnInit() {}
}
