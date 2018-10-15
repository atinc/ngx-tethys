
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

export interface ThyTreeEmitEvent {

  eventName: string;

  node?: ThyTreeNode;

  event?: Event | any;

  dragNode?: ThyTreeNode;

  targetNode?: ThyTreeNode;

}
