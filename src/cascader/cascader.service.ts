import { SelectionModel } from '@angular/cdk/collections';
import { Injectable } from '@angular/core';
import { SelectOptionBase } from 'ngx-tethys/shared';
import { ThyCascaderOption, ThyCascaderSearchOption } from './types';
import { helpers, isArray, isEmpty, set } from 'ngx-tethys/util';
import { Id } from '@tethys/cdk/immutable';
import { Subject } from 'rxjs';
import { debounceTime, finalize, map } from 'rxjs/operators';
const defaultDisplayRender = (label: any) => label.join(' / ');

/**
 * @internal
 */
@Injectable()
export class ThyCascaderService {
    public selectionModel: SelectionModel<SelectOptionBase>;

    public columns: ThyCascaderOption[][] = [];

    public cascaderOptions: {
        labelProperty?: string;
        valueProperty?: string;
        isMultiple?: boolean;
        isOnlySelectLeaf?: boolean;
        isLabelRenderTemplate?: boolean;
        loadData?: (node: ThyCascaderOption, index?: number) => PromiseLike<any>;
    };

    public selectedOptions: ThyCascaderOption[] = [];

    public activatedOptions: ThyCascaderOption[] = [];

    public labelRenderText: string;

    public flattenOptions: ThyCascaderSearchOption[] = [];

    public leafNodes: ThyCascaderSearchOption[] = [];

    public isLoading = false;

    public searchResultList: ThyCascaderSearchOption[] = [];

    public defaultValue: any[];

    public value: any[];

    private prevSelectedOptions: Set<ThyCascaderOption> = new Set<ThyCascaderOption>();

    public valueChange$ = new Subject();

    public cascaderValueChange() {
        return this.valueChange$.pipe(
            map(() => {
                return {
                    value: this.getValues(),
                    isValueEqual: this.arrayEquals(this.value, this.getValues()),
                    isSelectionModelEmpty: this.selectionModel.isEmpty()
                };
            }),
            finalize(() => {
                this.defaultValue = null;
                this.value = this.getValues();
            }),
            debounceTime(100)
        );
    }

    public setCascaderOptions(options: {
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

    public initSelectionModel(isMultiple?: boolean) {
        if (this.selectionModel) {
            this.selectionModel.clear();
        } else {
            this.selectionModel = new SelectionModel(isMultiple);
        }
    }

    public initColumns(columns: ThyCascaderOption[][]) {
        this.columns = columns;
    }

    public initActivatedOptions(menuVisible: boolean) {
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

    public initOptions(index: number) {
        const vs = this.defaultValue;
        const load = () => {
            this.activateOnInit(index, vs[index]);
            if (index < vs.length - 1) {
                this.initOptions(index + 1);
            }
            if (index === vs.length - 1) {
                this.afterWriteValue();
            }
        };

        if (this.columns[index]?.length || !this.cascaderOptions.loadData) {
            load();
        } else {
            const node = this.activatedOptions[index - 1] || {};
            this.loadChildren(node, index - 1, load, this.afterWriteValue.bind(this));
        }
    }

    public clickOption(
        option: ThyCascaderOption,
        index: number,
        event: Event | boolean,
        selectFn?: (option: ThyCascaderOption, index: number) => void
    ) {
        if (option?.disabled && !this.cascaderOptions.isMultiple) {
            return;
        }

        const isSelect = event instanceof Event ? !this.cascaderOptions.isMultiple && option.isLeaf : true;

        if (this.cascaderOptions.isMultiple && !option.isLeaf && this.cascaderOptions.isOnlySelectLeaf && isSelect) {
            this.toggleAllChildren(option, index, event as boolean, selectFn);
        } else {
            this.setActiveOption(option, index, isSelect, true, selectFn);
        }
    }

    public setActiveOption(
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
        } else if (index < this.columns.length - 1) {
            this.columns = this.columns.slice(0, index + 1);
        }

        if (select) {
            selectFn(option, index);
        }
    }

    private loadChildren(option: ThyCascaderOption, index: number, success?: () => void, failure?: () => void): void {
        if (!this.cascaderOptions?.loadData) {
            this.setColumnData(option.children || [], index + 1);
            return;
        }

        this.isLoading = true;

        this.cascaderOptions.loadData(option, index).then(
            () => this.handleLoadDataSuccess(option, index, success),
            () => this.handleLoadDataFailure(option, index, failure)
        );
    }

    private handleLoadDataSuccess(option: ThyCascaderOption, index: number, success?: () => void): void {
        option.loading = this.isLoading = false;

        if (option.children) {
            option.children.forEach(child => (child.parent = index < 0 ? undefined : option));
            this.setColumnData(option.children, index + 1);
        }

        if (success) {
            success();
        }
    }

    private handleLoadDataFailure(option: ThyCascaderOption, index: number, failure?: () => void): void {
        option.loading = this.isLoading = false;
        option.isLeaf = true;

        if (failure) {
            failure();
        }
    }

    private activateOnInit(index: number, value: any): void {
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

    public isSelectedOption(option: ThyCascaderOption, index: number): boolean {
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

    private toggleAllChildren(
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

    private getAllLeafs(
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

    public searchInLocal(searchText: string): void {
        this.forEachColumns();

        this.setSearchResultList(this.cascaderOptions.isOnlySelectLeaf ? this.leafNodes : this.flattenOptions, searchText);
    }

    private forEachColumns(
        currentLabel?: string[],
        currentValue: Id[] = [],
        currentRowValue: ThyCascaderOption[] = [],
        list = this.columns[0]
    ) {
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
            if (item?.children?.length) {
                this.forEachColumns(label, valueList, rowValueList, item.children);
            } else {
                this.leafNodes.push(node);
            }
        });
    }

    private setSearchResultList(listOfOption: ThyCascaderSearchOption[], searchText: string) {
        this.searchResultList = [];
        listOfOption.forEach(item => {
            if (!item.disabled && item.isLeaf && item.labelList.join().toLowerCase().indexOf(searchText.toLowerCase()) !== -1) {
                this.searchResultList.push(item);
            }
        });
    }

    /**
     * 检查所有所有子项的选择状态, 有一个不符合预期，就直接返回 false
     * @param option
     * @param trueOrFalse
     * @private
     */
    private checkSelectedStatus(option: ThyCascaderOption, isSelected: boolean): boolean {
        if (option.isLeaf) {
            return option.selected === isSelected;
        }
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

    private findOption(option: any, index: number): ThyCascaderOption {
        const options: ThyCascaderOption[] = this.columns[index];
        if (options) {
            const value = typeof option === 'object' ? this.getOptionValue(option) : option;
            return options.find(o => value === this.getOptionValue(o));
        }
        return null;
    }

    private setColumnData(options: ThyCascaderOption[], index: number): void {
        if (!this.arrayEquals(this.columns[index], options)) {
            this.columns[index] = options;
            if (index < this.columns.length - 1) {
                this.columns = this.columns.slice(0, index + 1);
            }
        }
    }

    private getSubmitValue(originOptions: ThyCascaderOption[]): any[] {
        const values: any[] = [];
        (originOptions || []).forEach(option => {
            values.push(this.getOptionValue(option));
        });
        return values;
    }

    public removeSelectedItem(item: SelectOptionBase) {
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

        this.valueChange$.next();
    }

    public resetSearch() {
        this.searchResultList = [];
        this.leafNodes = [];
        this.flattenOptions = [];
    }

    public clearSelection() {
        this.labelRenderText = '';
        this.selectedOptions = [];
        this.activatedOptions = [];
        this.deselectAllSelected();
    }

    private deselectAllSelected() {
        const selectedOptions = this.selectionModel.selected;
        selectedOptions.forEach(item => this.deselectOption(item));
        this.selectionModel.clear();
        this.valueChange$.next();
    }

    private deselectOption(option: SelectOptionBase) {
        const value: ThyCascaderOption[] = option.thyRawValue.value;
        value.forEach(item => {
            if (item.isLeaf && item.selected) {
                set(item, 'selected', false);
            }
        });
    }

    public selectOption(option: ThyCascaderOption, index: number): void {
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
        this.valueChange$.next();
    }

    private addSelectedState(selectOptions: ThyCascaderOption[]) {
        if (this.cascaderOptions.isMultiple && this.cascaderOptions.isOnlySelectLeaf) {
            selectOptions.forEach(opt => {
                if (opt.isLeaf) {
                    opt.selected = true;
                    set(opt, 'selected', true);
                }
            });
            this.addParentSelectedState(selectOptions);
        }
    }

    private addParentSelectedState(selectOptions: ThyCascaderOption[]) {
        selectOptions.forEach(opt => {
            if (opt?.children?.length && opt.children.every(i => i.selected)) {
                opt.selected = true;
                set(opt, 'selected', true);
                if (opt.parent) {
                    this.addParentSelectedState([opt.parent]);
                }
            }
        });
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

    public writeCascaderValue(value: any): void {
        if (!this.selectionModel) {
            this.initSelectionModel(this.cascaderOptions.isMultiple);
        }
        if (!this.cascaderOptions.isMultiple) {
            const vs = (this.defaultValue = this.toArray(value));
            if (vs.length) {
                this.initOptions(0);
            } else {
                this.value = vs;
                this.activatedOptions = [];
                this.afterWriteValue();
            }
        } else {
            const values = this.toArray(value);
            this.selectionModel.clear();
            values.forEach(item => {
                const vs = (this.defaultValue = this.toArray(item));
                if (vs.length) {
                    this.initOptions(0);
                } else {
                    this.value = vs;
                    this.activatedOptions = [];
                    this.afterWriteValue();
                }
            });
        }
    }

    private afterWriteValue() {
        this.selectedOptions = this.activatedOptions;
        this.value = this.getSubmitValue(this.selectedOptions);
        this.addSelectedState(this.selectedOptions);
        this.buildDisplayLabel();
    }

    public isActivatedOption(option: ThyCascaderOption, index: number): boolean {
        if (!this.cascaderOptions?.isMultiple || this.cascaderOptions.isOnlySelectLeaf) {
            const activeOpt = this.activatedOptions[index];
            return activeOpt === option;
        } else if (option.isLeaf) {
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

    public isHalfSelectedOption(option: ThyCascaderOption, index: number): boolean {
        if (!option.selected && this.cascaderOptions.isOnlySelectLeaf && !option.isLeaf && !this.checkSelectedStatus(option, false)) {
            return true;
        }
        return false;
    }

    public getValues() {
        let selectedItems: any[];
        const selected = this.selectionModel.selected;
        selectedItems = selected.map(item => this.getSubmitValue(item.thyRawValue.value));
        return this.cascaderOptions?.isMultiple ? selectedItems : selectedItems[0] ?? selectedItems;
    }

    private updatePrevSelectedOptions(option: ThyCascaderOption, isActivateInit: boolean, index?: number) {
        set(option, 'selected', this.isSelected(option, isActivateInit, index));
        if (!this.cascaderOptions.isMultiple) {
            this.clearPrevSelectedOptions();
        }

        if (this.cascaderOptions.isOnlySelectLeaf && this.cascaderOptions.isMultiple && option.parent) {
            this.updatePrevSelectedOptions(option.parent, false, index - 1);
        }

        this.prevSelectedOptions.add(option);
    }

    private isSelected(option: ThyCascaderOption, isActivateInit: boolean, index?: number) {
        if (isActivateInit && this.cascaderOptions.isOnlySelectLeaf && option.isLeaf) {
            return true;
        } else if (!isActivateInit) {
            return this.cascaderOptions.isOnlySelectLeaf && !option.isLeaf && this.cascaderOptions.isMultiple
                ? this.isSelectedOption(option, index)
                : !this.isSelectedOption(option, index);
        }
    }

    private clearPrevSelectedOptions() {
        const prevSelectedOptions = Array.from(this.prevSelectedOptions);
        while (prevSelectedOptions.length) {
            set(prevSelectedOptions.pop(), 'selected', false);
        }
        this.prevSelectedOptions.clear();
    }

    private getOptionLabel(option: ThyCascaderOption): any {
        return option[this.cascaderOptions.labelProperty || 'label'];
    }

    private getOptionValue(option: ThyCascaderOption): any {
        return option[this.cascaderOptions.valueProperty || 'value'];
    }

    toArray<T>(value: T | T[]): T[] {
        if (value == null) {
            return [];
        } else if (!Array.isArray(value)) {
            return [value];
        } else {
            return value;
        }
    }

    arrayEquals<T>(array1: T[], array2: T[]): boolean {
        if (!Array.isArray(array1) || !Array.isArray(array2) || array1.length !== array2.length) {
            return false;
        }

        return array1.every((element, index) => element === array2[index]);
    }
}
