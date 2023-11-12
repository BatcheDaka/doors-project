import { Door } from '@/models/Door';
import { injectable } from 'tsyringe';
import { EntityMapper } from '@/server/lib/EntityMapper';
import { DoorDto } from '@/__mocks__/dtos/DoorDto';
import { BuildingDto } from '@/__mocks__/dtos/BuidlingDto';

type BuildingDtosById = Record<string, BuildingDto>;

@injectable()
export class DoorMapper implements EntityMapper<Door, DoorDto> {
  public toDomain(doorDto: DoorDto, buildingDtosById: BuildingDtosById): Door {
    const buildingName = this.getBuildingName(
      buildingDtosById,
      doorDto.building_id,
    );
    const apartmentName = this.getApartmentName(doorDto.apartment_name);

    return {
      id: doorDto.id,
      name: doorDto.name,
      buildingName,
      apartmentName,
      connectionType: doorDto.connection_type,
      connectionStatus: doorDto.connection_status,
      lastConnectionStatusUpdate: doorDto.last_connection_status_update,
    };
  }

  private getBuildingName(buildingDtos: BuildingDtosById, id: string) {
    const building = buildingDtos[id];

    return building ? `${building.street} ${building.street_no}` : 'n/a';
  }

  private getApartmentName(apartmentName: string | undefined) {
    return apartmentName ? apartmentName : 'n/a';
  }
}
