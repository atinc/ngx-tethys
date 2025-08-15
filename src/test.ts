// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
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
getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting(), {
    teardown: { destroyAfterEach: true }
});
