import * as React from "react";
import {
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Inbox,
  MoreHorizontal,
} from "lucide-react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type Row,
  type RowSelectionState,
  type SortingState,
  type Table as TableInstance,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Empty } from "@/components/ui/empty";
import { IconActionButton } from "@/components/ui/icon-action-button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export type DataTableRowAction<TData> = {
  key: string;
  label: string;
  icon?: React.ReactNode;
  onSelect: (row: TData) => void;
  destructive?: boolean;
};

export type DataTableFilterDef = {
  columnId: string;
  type?: "text" | "select";
  placeholder?: string;
  options?: { label: string; value: string }[];
};

export interface DataTableProps<TData> {
  columns: ColumnDef<TData, any>[];
  data: TData[];
  pageSize?: number;
  pageSizeOptions?: number[];
  enableSelection?: boolean;
  enableSorting?: boolean;
  filters?: DataTableFilterDef[];
  rowActions?: DataTableRowAction<TData>[];
  onRowClick?: (row: TData) => void;
  emptyTitle?: string;
  emptyDescription?: string;
  className?: string;
  getRowId?: (row: TData, index: number) => string;
}

function buildSelectionColumn<TData>(): ColumnDef<TData, any> {
  return {
    id: "__select",
    header: ({ table }) => (
      <Checkbox
        aria-label="Zaznacz wszystkie wiersze"
        checked={
          table.getIsAllPageRowsSelected()
            ? true
            : table.getIsSomePageRowsSelected()
              ? "indeterminate"
              : false
        }
        onCheckedChange={(value) =>
          table.toggleAllPageRowsSelected(Boolean(value))
        }
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label="Zaznacz wiersz"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(Boolean(value))}
        onClick={(event) => event.stopPropagation()}
      />
    ),
    enableSorting: false,
    enableHiding: false,
    size: 40,
  };
}

function buildActionsColumn<TData>(
  actions: DataTableRowAction<TData>[]
): ColumnDef<TData, any> {
  return {
    id: "__actions",
    header: () => <span className="sr-only">Akcje</span>,
    cell: ({ row }) => (
      <div className="flex justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <IconActionButton
              label="Akcje wiersza"
              onClick={(event) => event.stopPropagation()}
              size="sm"
              variant="ghost"
            >
              <MoreHorizontal />
            </IconActionButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {actions.map((action) => (
              <DropdownMenuItem
                className={cn(
                  action.destructive &&
                    "text-destructive focus:bg-destructive-soft focus:text-destructive"
                )}
                key={action.key}
                onSelect={() => action.onSelect(row.original)}
              >
                {action.icon}
                {action.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
    size: 56,
  };
}

function DataTableFilters<TData>({
  table,
  filters,
}: {
  table: TableInstance<TData>;
  filters: DataTableFilterDef[];
}) {
  if (!filters.length) return null;
  return (
    <div className="flex flex-wrap items-center gap-2 border-b border-border p-3">
      {filters.map((filter) => {
        const column = table.getColumn(filter.columnId);
        if (!column) return null;
        const value = (column.getFilterValue() as string | undefined) ?? "";
        if (filter.type === "select" && filter.options) {
          return (
            <Select
              key={filter.columnId}
              onValueChange={(next) =>
                column.setFilterValue(next === "__all" ? undefined : next)
              }
              value={value || "__all"}
            >
              <SelectTrigger className="h-10 w-auto min-w-[180px]">
                <SelectValue placeholder={filter.placeholder ?? "Filtruj"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="__all">Wszystkie</SelectItem>
                {filter.options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        }
        return (
          <Input
            className="h-10 w-auto min-w-[200px]"
            key={filter.columnId}
            onChange={(event) =>
              column.setFilterValue(event.target.value || undefined)
            }
            placeholder={filter.placeholder ?? "Filtruj..."}
            value={value}
          />
        );
      })}
    </div>
  );
}

function DataTablePagination<TData>({
  table,
  pageSizeOptions,
}: {
  table: TableInstance<TData>;
  pageSizeOptions: number[];
}) {
  const pageIndex = table.getState().pagination.pageIndex;
  const pageCount = table.getPageCount();
  const totalRows = table.getFilteredRowModel().rows.length;
  const pageSize = table.getState().pagination.pageSize;
  const firstResult = totalRows ? pageIndex * pageSize + 1 : 0;
  const lastResult = Math.min((pageIndex + 1) * pageSize, totalRows);

  return (
    <div className="flex flex-col gap-3 border-t border-border px-4 py-3 md:flex-row md:items-center md:justify-between">
      <p className="text-sm font-semibold text-muted-foreground">
        Pokazano{" "}
        <span className="text-foreground">
          {firstResult}-{lastResult}
        </span>{" "}
        z <span className="text-foreground">{totalRows}</span> wyników
      </p>
      <div className="flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
          Wyników na stronie
          <select
            className="h-10 rounded-md border border-border bg-card px-3 font-bold text-foreground shadow-juz-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onChange={(event) => table.setPageSize(Number(event.target.value))}
            value={pageSize}
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
        <div className="flex items-center gap-1">
          <Button
            aria-label="Pierwsza strona"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.setPageIndex(0)}
            size="icon"
            variant="outline"
          >
            <ChevronsLeft />
          </Button>
          <Button
            aria-label="Poprzednia strona"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
            size="icon"
            variant="outline"
          >
            <ChevronLeft />
          </Button>
          <span className="px-2 text-sm font-semibold text-foreground">
            Strona {pageIndex + 1} z {Math.max(1, pageCount)}
          </span>
          <Button
            aria-label="Następna strona"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
            size="icon"
            variant="outline"
          >
            <ChevronRight />
          </Button>
          <Button
            aria-label="Ostatnia strona"
            disabled={!table.getCanNextPage()}
            onClick={() => table.setPageIndex(pageCount - 1)}
            size="icon"
            variant="outline"
          >
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}

function DataTableInner<TData>(
  {
    columns,
    data,
    pageSize = 10,
    pageSizeOptions = [10, 20, 40, 60],
    enableSelection = false,
    enableSorting = true,
    filters,
    rowActions,
    onRowClick,
    emptyTitle = "Brak wyników",
    emptyDescription = "Spróbuj zmienić filtry lub kryteria wyszukiwania.",
    className,
    getRowId,
  }: DataTableProps<TData>,
  ref: React.Ref<HTMLDivElement>
) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const resolvedColumns = React.useMemo<ColumnDef<TData, any>[]>(() => {
    const out: ColumnDef<TData, any>[] = [];
    if (enableSelection) out.push(buildSelectionColumn<TData>());
    out.push(...columns);
    if (rowActions?.length) out.push(buildActionsColumn<TData>(rowActions));
    return out;
  }, [columns, enableSelection, rowActions]);

  const table = useReactTable<TData>({
    data,
    columns: resolvedColumns,
    state: { sorting, rowSelection, columnFilters },
    getRowId,
    enableSorting,
    enableRowSelection: enableSelection,
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize } },
  });

  const visibleColumnCount = table.getVisibleLeafColumns().length;

  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card shadow-juz-sm",
        className
      )}
      ref={ref}
    >
      {filters?.length ? (
        <DataTableFilters filters={filters} table={table} />
      ) : null}
      <div className="overflow-x-auto">
        <Table className="border-0 shadow-none">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const canSort = header.column.getCanSort();
                  const sortState = header.column.getIsSorted();
                  return (
                    <TableHead
                      key={header.id}
                      style={{ width: header.getSize() }}
                    >
                      {header.isPlaceholder ? null : canSort ? (
                        <button
                          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
                          onClick={header.column.getToggleSortingHandler()}
                          type="button"
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {sortState === "asc" ? (
                            <ArrowUp className="size-3.5" />
                          ) : sortState === "desc" ? (
                            <ArrowDown className="size-3.5" />
                          ) : (
                            <ArrowUpDown className="size-3.5 opacity-50" />
                          )}
                        </button>
                      ) : (
                        flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length === 0 ? (
              <TableRow>
                <TableCell
                  className="p-0"
                  colSpan={visibleColumnCount || 1}
                >
                  <div className="p-6">
                    <Empty
                      description={emptyDescription}
                      icon={<Inbox />}
                      title={emptyTitle}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row: Row<TData>) => (
                <TableRow
                  className={cn(
                    onRowClick && "cursor-pointer",
                    row.getIsSelected() && "bg-primary-soft/40"
                  )}
                  data-state={row.getIsSelected() ? "selected" : undefined}
                  key={row.id}
                  onClick={
                    onRowClick ? () => onRowClick(row.original) : undefined
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination
        pageSizeOptions={pageSizeOptions}
        table={table}
      />
    </div>
  );
}

const DataTable = React.forwardRef(DataTableInner) as <TData>(
  props: DataTableProps<TData> & { ref?: React.Ref<HTMLDivElement> }
) => React.ReactElement;

export { DataTable };
export type { ColumnDef } from "@tanstack/react-table";
