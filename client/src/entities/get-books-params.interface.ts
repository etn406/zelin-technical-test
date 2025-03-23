export interface GetBooksParams {
  pageIndex: number;
  pageSize: number;
  sortColumn: string;
  sortDirection: 'asc' | 'desc';
}
