import { NgZone, Platform } from '@angular/cdk/platform';
import { TestBed } from '@angular/core/testing';
import { OverlayEventDelegationService } from './overlay-event-delegation.service';

describe('OverlayEventDelegationService', () => {
    let service: OverlayEventDelegationService;
    let mockNgZone: jasmine.SpyObj<NgZone>;
    let mockPlatform: jasmine.SpyObj<Platform>;

    const mockInstance = {
        trigger: 'click' as const,
        getHostElement: () => document.createElement('div'),
        onHostMouseEnter: jasmine.createSpy('onHostMouseEnter'),
        onHostMouseLeave: jasmine.createSpy('onHostMouseLeave'),
        onHostClick: jasmine.createSpy('onHostClick'),
        onHostFocusIn: jasmine.createSpy('onHostFocusIn'),
        onHostFocusOut: jasmine.createSpy('onHostFocusOut'),
        onHostTouch: jasmine.createSpy('onHostTouch')
    };

    beforeEach(() => {
        mockNgZone = jasmine.createSpyObj('NgZone', ['run', 'runOutsideAngular']);
        mockNgZone.run.and.callFake((fn: Function) => fn());
        mockNgZone.runOutsideAngular.and.callFake((fn: Function) => fn());

        mockPlatform = jasmine.createSpyObj('Platform', [], {
            IOS: false,
            ANDROID: false
        });

        TestBed.configureTestingModule({
            providers: [
                OverlayEventDelegationService,
                { provide: NgZone, useValue: mockNgZone },
                { provide: Platform, useValue: mockPlatform }
            ]
        });

        service = TestBed.inject(OverlayEventDelegationService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should register and unregister instances', () => {
        const element = mockInstance.getHostElement();

        service.register(mockInstance);
        expect(service['elementToInstance'].has(element)).toBe(true);
        expect(service['registeredInstances'].has(mockInstance)).toBe(true);

        service.unregister(mockInstance);
        expect(service['elementToInstance'].has(element)).toBe(false);
        expect(service['registeredInstances'].has(mockInstance)).toBe(false);
    });

    it('should handle click events correctly', () => {
        const element = mockInstance.getHostElement();
        service.register(mockInstance);

        // Simulate click event
        const clickEvent = new MouseEvent('click', { bubbles: true });
        element.dispatchEvent(clickEvent);

        expect(mockInstance.onHostClick).toHaveBeenCalled();
    });

    it('should handle hover events correctly', () => {
        const element = mockInstance.getHostElement();
        mockInstance.trigger = 'hover';
        service.register(mockInstance);

        // Simulate mouseover event
        const mouseOverEvent = new MouseEvent('mouseover', { bubbles: true });
        element.dispatchEvent(mouseOverEvent);

        expect(mockInstance.onHostMouseEnter).toHaveBeenCalled();
    });

    it('should handle focus events correctly', () => {
        const element = mockInstance.getHostElement();
        mockInstance.trigger = 'focus';
        service.register(mockInstance);

        // Simulate focusin event
        const focusInEvent = new FocusEvent('focusin', { bubbles: true });
        element.dispatchEvent(focusInEvent);

        expect(mockInstance.onHostFocusIn).toHaveBeenCalled();
    });

    it('should clean up resources on destroy', () => {
        service.register(mockInstance);
        service.destroy();

        expect(service['registeredInstances'].size).toBe(0);
        expect(service['elementToInstance']).toBeDefined();
        expect(service['initialized']).toBe(false);
    });
});
