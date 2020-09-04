import { FormControl, Validators } from '@angular/forms';
import { confirmValidator } from './../validator/index';

describe('validator', () => {
    describe(`confirm validator`, () => {
        it('should create confirm attributes and validator true or false', () => {
            const control = new FormControl('123456');
            expect(confirmValidator('123456')(control)).toBeNull();
            expect(confirmValidator('111111')(control).confirm.value).toEqual('123456');
        });
    });
});
