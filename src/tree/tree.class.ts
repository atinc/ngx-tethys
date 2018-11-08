
export class ThyTreeNode {

  key?: number | string;

  title?: string;

  icon?: string;

  iconStyle?: {
    [key: string]: any;
  };

  children?: ThyTreeNode[];

  origin?: any;

  expanded?: boolean;

  edited?: boolean;

  disabled?: boolean;

  selected?: boolean;

  [key: string]: any;

}

export interface ThyTreeEmitEvent {

  eventName: string;

  node?: ThyTreeNode;

  event?: Event | any;

  dragNode?: ThyTreeNode;

  targetNode?: ThyTreeNode;

}
