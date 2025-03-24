export interface GetBooksParams {
  pageIndex: number;
  pageSize: number;
  sortColumn: string;
  sortDirection: 'asc' | 'desc';

  query?: string;
  noteAbove?: number;
  noteBelow?: number;
  deleted?: boolean;
}
