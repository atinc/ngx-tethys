import { TethysUpgradeData } from '../core/upgrade-data';
import { afterInsertElement } from './after-insert-element';
import { attributeSelectors } from './attribute-selectors';
import { beforeInsertElement } from './before-insert-element';
import { classNames } from './class-names';
import { constructorChecks } from './constructor-checks';
import { cssSelectors } from './css-selectors';
import { elementSelectors } from './element-selectors';
import { entryPoints } from './entry-points';
import { inputNames } from './input-names';
import { inputNamesRemoval } from './input-names-removal';
import { inputValues } from './input-values';
import { methodCallChecks } from './method-call-checks';
import { outputNames } from './output-names';
import { outputNamesRemoval } from './output-names-removal';
import { propertyNames } from './property-names';
import { symbolRemoval } from './symbol-removal';

export * from './after-insert-element';
export * from './attribute-selectors';
export * from './before-insert-element';
export * from './class-names';
export * from './constructor-checks';
export * from './css-selectors';
export * from './element-selectors';
export * from './input-names';
export * from './input-names-removal';
export * from './input-values';
export * from './method-call-checks';
export * from './output-names';
export * from './output-names-removal';
export * from './property-names';
export * from './symbol-removal';

export const ruleUpgradeData: TethysUpgradeData = {
    attributeSelectors,
    classNames,
    constructorChecks,
    cssSelectors,
    elementSelectors,
    inputNames,
    inputNamesRemoval,
    methodCallChecks,
    outputNames,
    propertyNames,
    symbolRemoval,
    outputNamesRemoval,
    inputValues,
    beforeInsertElement,
    afterInsertElement,
    entryPoints
};
