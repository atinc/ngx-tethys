import { SelectionModel } from '@angular/cdk/collections';
import { Injectable, OnDestroy } from '@angular/core';
import { SelectOptionBase } from 'ngx-tethys/shared';
import { ThyCascaderOption, ThyCascaderSearchOption } from './types';
import { helpers, isArray, isEmpty, set } from 'ngx-tethys/util';
import { Id } from '@tethys/cdk/immutable';
const defaultDisplayRender = (label: any) => label.join(' / ');

@Injectable()
export class ThyCascaderService implements OnDestroy {
    selectionModel: SelectionModel<SelectOptionBase>;

    columns: ThyCascaderOption[][] = [];

    cascaderOptions: {
        labelProperty?: string;
        valueProperty?: string;
        isMultiple?: boolean;
        isOnlySelectLeaf?: boolean;
        isLabelRenderTemplate?: boolean;
        loadData?: (node: ThyCascaderOption, index?: number) => PromiseLike<any>;
    };

    selectedOptions: ThyCascaderOption[] = [];

    activatedOptions: ThyCascaderOption[] = [];

    labelRenderText: string;

    flattenOptions: ThyCascaderSearchOption[] = [];

    leafNodes: ThyCascaderSearchOption[] = [];

    isLoading = false;

    private prevSelectedOptions: Set<ThyCascaderOption> = new Set<ThyCascaderOption>();

    constructor() {}

    setCascaderOptions(options: {
        labelProperty?: string;
        valueProperty?: string;
        isMultiple?: boolean;
        isOnlySelectLeaf?: boolean;
        isLabelRenderTemplate?: boolean;
        loadData?: (node: ThyCascaderOption, index?: number) => PromiseLike<any>;
    }) {
        this.cascaderOptions = { ...this.cascaderOptions, ...options };
        this.initSelectionModel(this.cascaderOptions.isMultiple);
    }

    initSelectionModel(isMultiple?: boolean) {
        if (this.selectionModel) {
            this.selectionModel.clear();
        } else {
            this.selectionModel = new SelectionModel(isMultiple);
        }
    }

    initColumns(columns: ThyCascaderOption[][]) {
        this.columns = columns;
    }

    initActivatedOptions(menuVisible: boolean) {
        if (isEmpty(this.selectedOptions) || !menuVisible) {
            return;
        }
        this.activatedOptions = [...this.selectedOptions];
        this.activatedOptions.forEach((item, index) => {
            if (!isEmpty(item.children) && !item.isLeaf) {
                this.columns[index + 1] = item.children;
            }
        });
    }

    setActiveOption(
        option: ThyCascaderOption,
        index: number,
        select: boolean,
        loadChildren: boolean = true,
        selectFn?: (option: ThyCascaderOption, index: number) => void
    ): void {
        this.activatedOptions[index] = option;
        for (let i = index - 1; i >= 0; i--) {
            const originOption = this.activatedOptions[i + 1]?.parent;
            if (
                !this.activatedOptions[i] ||
                originOption?.[this.cascaderOptions.valueProperty] !== this.activatedOptions[i]?.[this.cascaderOptions.valueProperty]
            ) {
                this.activatedOptions[i] = originOption ?? this.activatedOptions[i];
            }
        }
        if (index < this.activatedOptions.length - 1) {
            this.activatedOptions = this.activatedOptions.slice(0, index + 1);
        }
        if (isArray(option.children) && option.children.length) {
            option.isLeaf = false;
            option.children.forEach(child => (child.parent = option));
            this.setColumnData(option.children, index + 1);
        } else if (!option.isLeaf && loadChildren) {
            this.loadChildren(option, index);
        } else {
            if (index < this.columns.length - 1) {
                this.columns = this.columns.slice(0, index + 1);
            }
        }

        if (select) {
            selectFn(option, index);
        }
    }

    loadChildren(option: ThyCascaderOption, index: number, success?: () => void, failure?: () => void): void {
        if (this.cascaderOptions?.loadData) {
            this.isLoading = true;
            this.cascaderOptions?.loadData(option, index).then(
                () => {
                    option.loading = this.isLoading = false;
                    if (option.children) {
                        option.children.forEach(child => (child.parent = index < 0 ? undefined : option));
                        this.setColumnData(option.children, index + 1);
                    }
                    if (success) {
                        success();
                    }
                },
                () => {
                    option.loading = this.isLoading = false;
                    option.isLeaf = true;
                    if (failure) {
                        failure();
                    }
                }
            );
        } else {
            this.setColumnData(option.children || [], index + 1);
        }
    }

    activateOnInit(index: number, value: any): void {
        let option = this.findOption(value, index);
        if (!option) {
            option =
                typeof value === 'object'
                    ? value
                    : {
                          [`${this.cascaderOptions.valueProperty || 'value'}`]: value,
                          [`${this.cascaderOptions.labelProperty || 'label'}`]: value
                      };
        }
        this.updatePrevSelectedOptions(option, true);
        this.setActiveOption(option, index, false, false);
    }

    isSelectedOption(option: ThyCascaderOption, index: number): boolean {
        if (this.cascaderOptions?.isOnlySelectLeaf) {
            if (option.isLeaf) {
                return option.selected;
            } else {
                return this.checkSelectedStatus(option, true);
            }
        } else {
            const selectedOpts = this.selectionModel.selected;
            const appearIndex = selectedOpts.findIndex(item => {
                if (item.thyRawValue.value.length - 1 === index) {
                    const selectedItem = helpers.get(item, `thyRawValue.value.${index}`);
                    return helpers.shallowEqual(selectedItem, option);
                } else {
                    return false;
                }
            });
            return appearIndex >= 0;
        }
    }

    toggleAllChildren(
        option: ThyCascaderOption,
        index: number,
        selected: boolean,
        selectFn?: (option: ThyCascaderOption, index: number) => void
    ): void {
        const allLeafs: {
            option: ThyCascaderOption;
            index: number;
        }[] = this.getAllLeafs(option, index, selected);
        option.selected = selected;

        while (allLeafs.length) {
            const { option, index } = allLeafs.shift();
            option.selected = !selected;
            this.setActiveOption(option, index, true, null, selectFn);
        }

        for (let i = 0; i < this.activatedOptions.length; i++) {
            const option = this.activatedOptions[i];
            if (isArray(option.children) && option.children.length) {
                this.setColumnData(option.children, i + 1);
            }
        }
    }

    getAllLeafs(
        option: ThyCascaderOption,
        index: number,
        selected: boolean
    ): {
        option: ThyCascaderOption;
        index: number;
    }[] {
        let allLeafs: {
            option: ThyCascaderOption;
            index: number;
        }[] = [];
        if (option.children.length > 0) {
            for (const childOption of option.children) {
                childOption.parent = option;
                if (childOption.isLeaf && !childOption.selected === selected) {
                    allLeafs.push({
                        option: childOption,
                        index: index + 1
                    });
                } else if (!childOption.isLeaf) {
                    allLeafs = allLeafs.concat(this.getAllLeafs(childOption, index + 1, selected));
                }
            }
        }
        return allLeafs;
    }

    /**
     * 检查所有所有子项的选择状态, 有一个不符合预期，就直接返回 false
     * @param option
     * @param trueOrFalse
     * @private
     */
    checkSelectedStatus(option: ThyCascaderOption, isSelected: boolean): boolean {
        for (const childOption of option.children) {
            if (isArray(childOption.children) && childOption.children.length && !this.checkSelectedStatus(childOption, isSelected)) {
                return false;
            }
            if (!childOption.selected === isSelected) {
                return false;
            }
        }
        return true;
    }

    isLoaded(index: number): boolean {
        return this.columns[index] && this.columns[index].length > 0;
    }

    findOption(option: any, index: number): ThyCascaderOption {
        const options: ThyCascaderOption[] = this.columns[index];
        if (options) {
            const value = typeof option === 'object' ? this.getOptionValue(option) : option;
            return options.find(o => value === this.getOptionValue(o));
        }
        return null;
    }

    setColumnData(options: ThyCascaderOption[], index: number): void {
        if (!this.arrayEquals(this.columns[index], options)) {
            this.columns[index] = options;
            if (index < this.columns.length - 1) {
                this.columns = this.columns.slice(0, index + 1);
            }
        }
    }

    getSubmitValue(originOptions: ThyCascaderOption[]): any[] {
        const values: any[] = [];
        (originOptions || []).forEach(option => {
            values.push(this.getOptionValue(option));
        });
        return values;
    }

    removeSelectedItem(item: SelectOptionBase) {
        const selectedItems = this.selectionModel.selected;
        const currentItem = selectedItems.find(i => {
            return helpers.shallowEqual(i.thyValue, item.thyValue);
        });
        this.deselectOption(currentItem);
        this.selectionModel.deselect(currentItem);
        // update selectedOptions
        const updatedSelectedItems = this.selectionModel.selected;
        if (isArray(updatedSelectedItems) && updatedSelectedItems.length) {
            this.selectedOptions = updatedSelectedItems[updatedSelectedItems.length - 1].thyRawValue.value;
        }
    }

    deselectAllSelected() {
        const selectedOptions = this.selectionModel.selected;
        selectedOptions.forEach(item => this.deselectOption(item));
        this.selectionModel.clear();
    }

    selectOption(option: ThyCascaderOption, index: number): void {
        this.selectedOptions = this.activatedOptions;
        this.updatePrevSelectedOptions(option, false, index);
        if (option.selected) {
            this.buildDisplayLabel();
        } else {
            const selectedItems = this.selectionModel.selected;
            const currentItem = selectedItems.find(item => {
                if (item.thyRawValue.value.length - 1 === index) {
                    const selectedItem = helpers.get(item, `thyRawValue.value.${index}`);
                    return helpers.shallowEqual(selectedItem, option);
                } else {
                    return false;
                }
            });
            this.selectionModel.deselect(currentItem);
        }
    }

    deselectOption(option: SelectOptionBase) {
        const value: ThyCascaderOption[] = option.thyRawValue.value;
        value.forEach(item => {
            if (item.isLeaf && item.selected) {
                set(item, 'selected', false);
            }
        });
    }

    addSelectedState(selectOptions: ThyCascaderOption[]) {
        if (this.cascaderOptions.isMultiple && this.cascaderOptions.isOnlySelectLeaf) {
            selectOptions.forEach(opt => {
                if (opt.isLeaf) {
                    opt.selected = true;
                    set(opt, 'selected', true);
                }
            });
        }
    }

    private buildDisplayLabel(): void {
        const selectedOptions = [...this.selectedOptions];
        const labels: string[] = selectedOptions.map(o => this.getOptionLabel(o));
        if (labels.length === 0) {
            return;
        }
        let labelRenderContext;
        let labelRenderText;
        if (this.cascaderOptions.isLabelRenderTemplate) {
            labelRenderContext = { labels, selectedOptions };
        } else {
            labelRenderText = defaultDisplayRender.call(this, labels, selectedOptions);
            this.labelRenderText = labelRenderText;
        }
        if (this.labelRenderText || this.cascaderOptions.isLabelRenderTemplate) {
            const selectedData: SelectOptionBase = {
                thyRawValue: {
                    value: selectedOptions,
                    labelText: labelRenderText,
                    labelRenderContext: labelRenderContext
                },
                thyValue: labels,
                thyLabelText: labelRenderText
            };
            this.selectionModel.select(selectedData);
        }
    }

    afterWriteValue(): void {
        this.selectedOptions = this.activatedOptions;
        this.addSelectedState(this.selectedOptions);
        this.buildDisplayLabel();
    }

    isActivatedOption(option: ThyCascaderOption, index: number): boolean {
        if (!this.cascaderOptions?.isMultiple || this.cascaderOptions.isOnlySelectLeaf) {
            const activeOpt = this.activatedOptions[index];
            return activeOpt === option;
        } else {
            if (option.isLeaf) {
                return option.selected;
            } else {
                const selectedOpts = this.selectionModel.selected;
                const appearIndex = selectedOpts.findIndex(item => {
                    const selectedItem = helpers.get(item, `thyRawValue.value.${index}`);
                    return helpers.shallowEqual(selectedItem, option);
                });
                return appearIndex >= 0;
            }
        }
    }

    getValues() {
        let selectedItems: any[];
        const selected = this.selectionModel.selected;
        selectedItems = selected.map(item => this.getSubmitValue(item.thyRawValue.value));
        return this.cascaderOptions?.isMultiple ? selectedItems : selectedItems[0] ?? selectedItems;
    }

    forEachColumns(currentLabel?: string[], currentValue: Id[] = [], currentRowValue: ThyCascaderOption[] = [], list = this.columns[0]) {
        list.forEach(item => {
            const curOptionLabel = this.getOptionLabel(item);
            const curOptionValue = this.getOptionValue(item);
            const label: string[] = currentLabel ? [...currentLabel, curOptionLabel] : [curOptionLabel];
            const valueList: Id[] = [...currentValue, curOptionValue];
            const rowValueList: ThyCascaderOption[] = [...currentRowValue, item];
            const isSelected = this.isSelectedOption(item, valueList.length - 1);

            const node = {
                labelList: label,
                valueList,
                selected: isSelected,
                thyRowValue: rowValueList,
                isLeaf: item.isLeaf,
                disabled: item.disabled
            };

            this.flattenOptions.push(node);
            if (item.children && item.children.length) {
                this.forEachColumns(label, valueList, rowValueList, item.children);
            } else {
                this.leafNodes.push(node);
            }
        });
    }

    updatePrevSelectedOptions(option: ThyCascaderOption, isActivateInit: boolean, index?: number) {
        if (isActivateInit) {
            if (this.cascaderOptions.isOnlySelectLeaf && option.isLeaf) {
                set(option, 'selected', true);
            }
            this.prevSelectedOptions.add(option);
        } else {
            if (!this.cascaderOptions.isMultiple) {
                const prevSelectedOptions = Array.from(this.prevSelectedOptions);
                while (prevSelectedOptions.length) {
                    set(prevSelectedOptions.pop(), 'selected', false);
                }
                this.prevSelectedOptions = new Set([]);
            }
            if (this.cascaderOptions.isOnlySelectLeaf && !option.isLeaf && this.cascaderOptions.isMultiple) {
                set(option, 'selected', this.isSelectedOption(option, index));
            } else {
                set(option, 'selected', !this.isSelectedOption(option, index));
            }
            if (this.cascaderOptions.isOnlySelectLeaf && this.cascaderOptions.isMultiple && option.parent) {
                this.updatePrevSelectedOptions(option.parent, false, index - 1);
            }
            this.prevSelectedOptions.add(option);
        }
    }

    private getOptionLabel(option: ThyCascaderOption): any {
        return option[this.cascaderOptions.labelProperty || 'label'];
    }

    private getOptionValue(option: ThyCascaderOption): any {
        return option[this.cascaderOptions.valueProperty || 'value'];
    }

    toArray<T>(value: T | T[]): T[] {
        let ret: T[];
        if (value == null) {
            ret = [];
        } else if (!Array.isArray(value)) {
            ret = [value];
        } else {
            ret = value;
        }
        return ret;
    }

    arrayEquals<T>(array1: T[], array2: T[]): boolean {
        if (!array1 || !array2 || array1.length !== array2.length) {
            return false;
        }

        const len = array1.length;
        for (let i = 0; i < len; i++) {
            if (array1[i] !== array2[i]) {
                return false;
            }
        }
        return true;
    }

    ngOnDestroy(): void {}
}
