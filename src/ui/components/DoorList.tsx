import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { Door } from '@/models/Door';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import { getLocaleString, DateTime } from '@/lib/dateTime';

interface DoorListProps {
  doors: Door[];
}

const columns: GridColDef<Door>[] = [
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
  },
  {
    field: 'buildingName',
    headerName: 'Building',
    flex: 1,
  },
  {
    field: 'apartmentName',
    headerName: 'Apartment Name',
    flex: 1,
  },
  {
    field: 'connectionType',
    headerName: 'Connection type',
    flex: 1,
  },
  {
    field: 'connectionStatus',
    headerName: 'Connection status',
    flex: 1,
    renderCell: ({ row: door }) => {
      return (
        <Typography
          color={
            door.connectionStatus === 'online' ? 'success.main' : 'error.main'
          }
        >
          {door.connectionStatus}
        </Typography>
      );
    },
  },
  {
    field: 'lastConnectionStatusUpdate',
    headerName: 'Last Connection Status',
    flex: 1,
    renderCell: ({ row: door }) => {
      return (
        <Typography fontSize="14px">
          {getLocaleString(
            door.lastConnectionStatusUpdate,
            DateTime.DATETIME_SHORT,
          )}
        </Typography>
      );
    },
  },
];

export function DoorList({ doors }: DoorListProps) {
  const router = useRouter();

  const onDoorRowClick = useCallback(
    (gridRow: GridRowParams<Door>) => {
      router.push({
        pathname: '/doors/[doorId]',
        query: { doorId: gridRow.id },
      });
    },
    [router],
  );

  return (
    <DataGrid
      autoHeight
      hideFooter
      rows={doors}
      columns={columns}
      disableRowSelectionOnClick
      onRowClick={onDoorRowClick}
    />
  );
}
