import Typography from '@mui/material/Typography';
import { Door } from '@/models/Door';
import { DetailPageContainer } from '@/ui/layout/DetailPageContainer';
import { DetailPageItem } from '@/ui/layout/DetailPageItem';
import { getLocaleString, DateTime } from '@/lib/dateTime';

interface DoorDetailProps {
  door: Door;
}

export function DoorDetail({ door }: DoorDetailProps) {
  return (
    <DetailPageContainer>
      <DetailPageItem label="Apartment Name">
        <Typography>{door.apartmentName}</Typography>
      </DetailPageItem>
      <DetailPageItem label="ID">
        <Typography>{door.id}</Typography>
      </DetailPageItem>
      <DetailPageItem label="Building">
        <Typography>{door.buildingName}</Typography>
      </DetailPageItem>
      <DetailPageItem label="Connection type">
        <Typography>{door.connectionType}</Typography>
      </DetailPageItem>
      <DetailPageItem label="Connection status">
        <Typography
          color={
            door.connectionStatus === 'online' ? 'success.main' : 'error.main'
          }
        >
          {door.connectionStatus}
        </Typography>
      </DetailPageItem>
      <DetailPageItem label="Last Connection Status">
        <Typography>
          {getLocaleString(
            door.lastConnectionStatusUpdate,
            DateTime.DATETIME_FULL_WITH_SECONDS,
          )}
        </Typography>
      </DetailPageItem>
    </DetailPageContainer>
  );
}
