export interface ThyTreeSelectNode {
    [key: string]: any;
    childCount?: number;
    level?: number;
    expand?: boolean;
    parentValues?: string[] | any;
    children?: ThyTreeSelectNode[];
    hidden?: boolean;
    disable?: boolean;
    isLoading?: boolean;
}
