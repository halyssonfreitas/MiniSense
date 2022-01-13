export interface ISensorDeviceDTO {
    id?: string;
    key?: string;
    label: string;
    description : string;
    User?: string;
    DataStreams?: [string]
  }