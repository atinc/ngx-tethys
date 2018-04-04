import { PaginationConfig } from 'ngx-bootstrap/pagination';

export class ThyPaginationConfig extends PaginationConfig {
  main: any = {
    maxSize: void 0,
    itemsPerPage: 20,
    boundaryLinks: false,
    directionLinks: true,
    firstText: '第一页',
    previousText: '上一页',
    nextText: '下一页',
    lastText: '最后一页',
    pageBtnClass: '',
    rotate: true
  };
  pager: any = {
    itemPerPage: 20,
    previousText: '上一页',
    nextText: '下一页',
    pageBtnClass: '',
    align: true
  };
}
