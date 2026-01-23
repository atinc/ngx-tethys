// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import { getTestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';
import { setPrintErrorWhenIconNotFound } from './icon';
import { setWarnDeprecation } from './util';
import { DebounceTimeWrapper } from './core';
import { debounce, interval } from 'rxjs';

/**
 * mock debounceTime for issue https://github.com/angular/angular/issues/44351
 */
DebounceTimeWrapper.debounceTime = (time: number) => {
    return debounce(() => interval(time));
};

setPrintErrorWhenIconNotFound(false);
setWarnDeprecation(false);

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(BrowserTestingModule, platformBrowserTesting(), {
    teardown: { destroyAfterEach: true }
});
