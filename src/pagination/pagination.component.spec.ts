import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThyPaginationComponent } from './pagination.component';

describe('ThyPaginationComponent', () => {
    let component: ThyPaginationComponent;
    let fixture: ComponentFixture<ThyPaginationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ThyPaginationComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ThyPaginationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
