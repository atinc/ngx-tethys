import { Component, Input } from '@angular/core';
import { InputNumber } from 'ngx-tethys/core';

@Component({
    selector: 'thy-test-decorators-component',
    template: `<p>{{ value }}</p>`
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
    });

    it('should be 0 if input is not a number', () => {
        component.value = 'abc';

        expect(component.value).toEqual(0);
    });
});
