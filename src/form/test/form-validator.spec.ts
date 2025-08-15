import { ThyFormValidatorLoader, ThyFormValidatorGlobalConfig, THY_VALIDATOR_CONFIG, ThyFormModule } from 'ngx-tethys/form';
import { TestBed } from '@angular/core/testing';
import { EnvironmentInjector, runInInjectionContext } from '@angular/core';

describe('module', () => {
    const globalConfig: ThyFormValidatorGlobalConfig = {
        globalValidationMessages: {
            required: 'This filed is required'
        }
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyFormModule.forRoot(globalConfig)]
        }).compileComponents();
    });

    it('should set global config success use forRoot', () => {
        const config = TestBed.inject(THY_VALIDATOR_CONFIG);
        expect(config).toEqual(globalConfig);
    });
});

describe('form-validator-loader', () => {
    const globalConfig: ThyFormValidatorGlobalConfig = {
        globalValidationMessages: {
            required: 'This filed is required',
            maxlength: '该选项输入值长度不能大于{maxlength}',
            minlength: '该选项输入值长度不能小于{minlength}',
            thyUniqueCheck: '输入值已经存在，请重新输入',
            email: '输入邮件的格式不正确',
            confirm: '两次输入不一致',
            pattern: '该选项输入格式不正确',
            number: '必须输入数字',
            min: '该选项输入值不能小于{min}'
        },
        validationMessages: {
            username: {
                required: 'username is required'
            }
        }
    };

    let formValidatorLoader!: ThyFormValidatorLoader;

    function run(fn: Function): void {
        runInInjectionContext(TestBed.inject(EnvironmentInjector), () => {
            fn();
        });
    }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ThyFormModule.forRoot(globalConfig)]
        }).compileComponents();
        formValidatorLoader = TestBed.inject(ThyFormValidatorLoader);
    });

    it('should create validator loader success', () => {
        expect(formValidatorLoader).toBeTruthy();
        expect(formValidatorLoader['config']).toEqual({
            ...globalConfig,
            showElementError: true,
            removeElementError: true
        });
    });

    it('should set global validationMessages success', () => {
        const newGlobalMessages = {
            required: 'new message is: this filed is required'
        };
        formValidatorLoader.setGlobalValidationMessages(newGlobalMessages);
        expect(formValidatorLoader['config'].globalValidationMessages).toEqual(newGlobalMessages);
    });

    it('should get correct validationMessages', () => {
        expect(formValidatorLoader.validationMessages).toEqual(globalConfig.validationMessages);
    });

    it('should add validationMessages success', () => {
        formValidatorLoader.addValidationMessages({
            age: {
                required: 'age is required'
            }
        });
        expect(formValidatorLoader.validationMessages).toEqual({
            ...globalConfig.validationMessages,
            age: {
                required: 'age is required'
            }
        });
    });

    it('should get error message success when there are validation configuration', () => {
        const result = formValidatorLoader.getErrorMessage('username', 'required');
        expect(result).toEqual(globalConfig.validationMessages.username.required);
    });

    it('should get global validation error message success when there are not in validation messages', () => {
        const result = formValidatorLoader.getErrorMessage('username1', 'required');
        expect(result).toEqual(globalConfig.globalValidationMessages.required);
    });

    it('should get default global validation error message success', () => {
        const result = formValidatorLoader.getErrorMessage('username1', 'max');
        expect(result).toEqual('该选项输入值不能大于{max}');
    });

    it('should get global validation error messages success', () => {
        const result = formValidatorLoader.getErrorMessages('username', {
            required: true,
            email: true
        });
        expect(result).toEqual([globalConfig.validationMessages.username.required, globalConfig.globalValidationMessages.email]);
    });

    function createFromGroup() {
        const group = document.createElement('div');
        const element = document.createElement('div');
        group.appendChild(element);
        return [group, element];
    }

    function createInputGroupFromGroup() {
        const group = document.createElement('div');
        const inputGroup = document.createElement('thy-input-group');
        const element = document.createElement('div');
        inputGroup.appendChild(element);
        group.appendChild(inputGroup);
        return [group, inputGroup, element];
    }

    function assertFromGroupErrorMessage(group: HTMLElement, element: HTMLElement, message: string) {
        expect(element.classList.contains('is-invalid')).toBe(true);
        expect(group.textContent).toEqual(message);
    }

    it('should show error success', () => {
        const [group, element] = createFromGroup();
        formValidatorLoader.showError(element, ['error message', 'error message2']);
        assertFromGroupErrorMessage(group, element, 'error message');
    });

    it(`should show error success when form-control is thy-input-group`, () => {
        const [group, inputGroup, element] = createInputGroupFromGroup();
        formValidatorLoader.showError(element, ['error message', 'error message2']);
        assertFromGroupErrorMessage(group, inputGroup, 'error message');
    });

    it('should remove error success', () => {
        const [group, element] = createFromGroup();
        formValidatorLoader.showError(element, ['error message', 'error message2']);
        formValidatorLoader.removeError(element);
        expect(element.classList.contains('is-invalid')).toBe(false);
        expect(group.textContent).toEqual('');
    });

    it('should remove error success when form-control is thy-input-group', () => {
        const [group, inputGroup, element] = createInputGroupFromGroup();
        formValidatorLoader.showError(element, ['error message', 'error message2']);
        formValidatorLoader.removeError(element);
        expect(inputGroup.classList.contains('is-invalid')).toBe(false);
        expect(group.textContent).toEqual('');
    });

    it('should invoke custom showElementError function success', () => {
        run(() => {
            const [_group, element] = createFromGroup();
            const showElementErrorSpy = jasmine.createSpy('show element error spy');

            formValidatorLoader = new ThyFormValidatorLoader({
                showElementError: showElementErrorSpy
            });
            expect(showElementErrorSpy).not.toHaveBeenCalled();
            const errorMessages = ['error message', 'error message2'];
            formValidatorLoader.showError(element, errorMessages);
            expect(showElementErrorSpy).toHaveBeenCalled();
            expect(showElementErrorSpy).toHaveBeenCalledWith(element, errorMessages);
        });
    });

    it('should invoke custom removeElementError function success', () => {
        run(() => {
            const [_group, element] = createFromGroup();
            const removeElementErrorSpy = jasmine.createSpy('remove element error spy');

            formValidatorLoader = new ThyFormValidatorLoader({
                removeElementError: removeElementErrorSpy
            });
            expect(removeElementErrorSpy).not.toHaveBeenCalled();
            formValidatorLoader.removeError(element);
            expect(removeElementErrorSpy).toHaveBeenCalled();
            expect(removeElementErrorSpy).toHaveBeenCalledWith(element);
        });
    });
});
