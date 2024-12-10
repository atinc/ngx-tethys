import { Component, DebugElement, NgModule, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ThyWatermarkDirective } from '../watermark.directive';
import { ThyWatermarkModule } from '../watermark.module';

@Component({
    selector: 'thy-test-watermark-basic',
    template: `
        <div
            class="demo-card"
            id="demo-card"
            style="position: relative;"
            [thyWatermark]="watermarkContent"
            [thyDisabled]="isDisabled"></div>
    `,
    standalone: false
})
class ThyTestWatermarkBasicComponent implements OnInit {
    isDisabled = false;
    watermarkContent = 'worktile';
    @ViewChild(ThyWatermarkDirective, { static: true }) watermarkDirective: ThyWatermarkDirective;

    constructor() {}

    ngOnInit(): void {}
}

@NgModule({
    imports: [ThyWatermarkModule],
    declarations: [ThyTestWatermarkBasicComponent],
    exports: []
})
export class WatermarkTestModule {}

describe('WatermarkDirective', () => {
    let fixture: ComponentFixture<ThyTestWatermarkBasicComponent>;
    let divDebugElement: DebugElement;
    let watermarkDirective: ThyWatermarkDirective;
    let testComponent: any;

    beforeEach(fakeAsync(() => {
        TestBed.configureTestingModule({
            imports: [WatermarkTestModule],
            providers: []
        }).compileComponents();

        fixture = TestBed.createComponent(ThyTestWatermarkBasicComponent);

        fixture.detectChanges();
        testComponent = fixture.debugElement.componentInstance;
        divDebugElement = fixture.debugElement.query(By.css('#demo-card'));
        watermarkDirective = divDebugElement.injector.get<ThyWatermarkDirective>(ThyWatermarkDirective);
    }));

    it('should create watermark success', () => {
        const panelElement = document.querySelector(`._vm`);
        expect(panelElement).toBeTruthy();
    });

    it('should remove watermark when thyDisabled is true', () => {
        testComponent.isDisabled = true;
        fixture.detectChanges();
        const panelElement = document.querySelector(`._vm`);
        expect(panelElement).toBeFalsy();
    });

    it('should refresh watermark when watermarkContent has been modified', () => {
        testComponent.watermarkContent = 'PingCode';
        fixture.detectChanges();
        const panelElement = document.querySelector(`._vm`);
        expect(panelElement).toBeTruthy();
    });

    it('should refresh watermark when watermark’s attribute has been modified', () => {
        testComponent.isDisabled = false;
        testComponent.watermarkContent = 'PingCode';
        const panelElement = document.querySelector(`._vm`);
        panelElement.setAttribute('style', 'top: 1');

        fixture.detectChanges();

        const DEFAULT_WATERMARK_CONFIG = {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: '0.8',
            'background-repeat': 'repeat',
            'pointer-events': 'none',
            'z-index': 2147483647,
            'background-image': `url(${watermarkDirective.createCanvas().toDataURL()})`
        };
        const styleStr = Object.keys(DEFAULT_WATERMARK_CONFIG).reduce(
            (pre, next) => ((pre += `${next}:${DEFAULT_WATERMARK_CONFIG[next]};`), pre),
            ''
        );
        expect(styleStr === document.querySelector(`._vm`).getAttribute('style')).toBeTruthy();
    });
});
