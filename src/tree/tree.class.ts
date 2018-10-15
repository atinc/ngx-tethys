
export class ThyTreeNode {

  key?: string;

  title?: string;

  icon?: string;

  children?: ThyTreeNode[];

  expanded?: boolean;

  edited?: boolean;

  disabled?: boolean;

  selected?: boolean;

  [key: string]: any;

}
