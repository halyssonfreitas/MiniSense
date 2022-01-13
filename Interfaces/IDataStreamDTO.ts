export interface IDataStreamDTO {
    id?: string;
    key?: string;
    label: string;
    enabled?: boolean,
    SensorDevice?: string,
    unitId: [string],
    SensorDatas?: [string]
}