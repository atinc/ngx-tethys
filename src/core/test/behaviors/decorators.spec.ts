import { Component, Input } from '@angular/core';
import { InputNumber } from 'ngx-tethys/core';

@Component({
    selector: 'thy-test-decorators-component',
    template: `<p>{{ value }}</p>`,
    standalone: false
})
class TestComponent {
    @Input() @InputNumber() value: any;
}

describe('InputNumber', () => {
    let component: TestComponent;

    beforeEach(() => {
        component = new TestComponent();
    });

    it('should set value if input is number', () => {
        component.value = 123;

        expect(component.value).toEqual(123);

        component.value = '234';

        expect(component.value).toEqual(234);
    });

    it('should be null if input is not a number', () => {
        component.value = 'abc';

        expect(component.value).toEqual(null);

        component.value = undefined;

        expect(component.value).toEqual(null);

        component.value = null;

        expect(component.value).toEqual(null);
    });
});
