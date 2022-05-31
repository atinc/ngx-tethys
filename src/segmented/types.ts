export interface thySegmentedOption {
    value?: string | number;
    labelText?: string;
    icon?: string;
    disabled?: boolean;
    [key: string]: any;
}

export type thySegmentedCustomOption = thySegmentedOption | string | number;

export interface ThySegmentedEvent {
    option: thySegmentedOption;
    index: number;
}
