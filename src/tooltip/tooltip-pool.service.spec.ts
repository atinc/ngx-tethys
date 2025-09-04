import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ThyPlacement } from 'ngx-tethys/core';
import { ThyTooltipPoolService } from './tooltip-pool.service';
import { ThyTooltipRef } from './tooltip-ref';
import { ThyTooltipConfig } from './tooltip.config';

describe('ThyTooltipPoolService', () => {
    let service: ThyTooltipPoolService;
    let mockElementRef: ElementRef<HTMLElement>;
    let mockConfig: ThyTooltipConfig;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ThyTooltipPoolService]
        });
        service = TestBed.inject(ThyTooltipPoolService);

        mockElementRef = {
            nativeElement: document.createElement('div')
        } as ElementRef<HTMLElement>;

        mockConfig = {
            placement: 'top',
            hasBackdrop: false
        };
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should acquire tooltip instance', () => {
        const tooltipRef = service.acquire(mockElementRef, mockConfig);
        expect(tooltipRef).toBeTruthy();
        expect(tooltipRef instanceof ThyTooltipRef).toBe(true);
    });

    it('should reuse instance from pool when compatible', () => {
        const ref1 = service.acquire(mockElementRef, mockConfig);
        service.release(ref1);

        const ref2 = service.acquire(mockElementRef, mockConfig);
        expect(ref2).toBe(ref1);
    });

    it('should create new instance when config is incompatible', () => {
        const ref1 = service.acquire(mockElementRef, mockConfig);
        service.release(ref1);

        const incompatibleConfig = { ...mockConfig, placement: 'bottom' as ThyPlacement };
        const ref2 = service.acquire(mockElementRef, incompatibleConfig);
        expect(ref2).not.toBe(ref1);
    });

    it('should provide pool statistics', () => {
        const stats = service.getPoolStats();
        expect(stats.total).toBe(0);
        expect(stats.inUse).toBe(0);
        expect(stats.available).toBe(0);

        const ref = service.acquire(mockElementRef, mockConfig);
        const statsAfterAcquire = service.getPoolStats();
        expect(statsAfterAcquire.total).toBe(1);
        expect(statsAfterAcquire.inUse).toBe(1);
        expect(statsAfterAcquire.available).toBe(0);

        service.release(ref);
        const statsAfterRelease = service.getPoolStats();
        expect(statsAfterRelease.total).toBe(1);
        expect(statsAfterRelease.inUse).toBe(0);
        expect(statsAfterRelease.available).toBe(1);
    });

    it('should clear pool', () => {
        const ref = service.acquire(mockElementRef, mockConfig);
        service.release(ref);

        expect(service.getPoolStats().total).toBe(1);

        service.clear();
        expect(service.getPoolStats().total).toBe(0);
    });
});
