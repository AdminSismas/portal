export interface DetailsCadastral {
  propertyRegistryOffice: string;
  propertyRegistryNumber: string;
  propertyRegistryArea: number;
  cadastralArea: number;
  cadAreaCommon: number;
  cadAreaPrivate: number;
  cadastralAreaGeo: number;
  cadastralAreaUnitbuilt: number;
  cadAreaUnitbuiltCommon: number;
  cadAreaUnitbuiltPrivate: number;
  cadastralNumber: string;
  cadastralLastNumber: string | null;
  cadastralRegistryNumberTemp: string;
  cadastralRegistryNumber: string | null;
  cadastralCreatedAt: Date;
  domBaunitType: string;
  domBaunitCondition: string;
  domBaunitEconoDesti: string;
  domBaunitProcessType: string | null;
  cadastralLastMasiveEventAt: string | null;
  cadastralLastMasiveEventCode: string | null;
  cadastralLastEventAt: Date;
  cadastralLastEventCode: string;
  baunitIdOrigin: string | null;
  hash: string | null;
  createdBy: string;
  createdAt: Date;
  updatedBy: string;
  updatedAt: Date;
  masterGroup: string | null;
  detailGroup: DetailGroup | null;
  cadastralNumberFormat: string;
  npnlike: string;
  baunitIdE: string;
  cadastralAreaE: string;
  cadAreaCommonE: string;
  cadAreaPrivateE: string;
  propertyRegistryAreaE: string;
  cadastralAreaGeoE: string;
  cadNumDetail: string;
  formatPropertyRegistryNumber?: string;
}

export interface DetailGroup {
  percentage_group: number;
  buildNumber: number;
  floorNumber: number;
  unitNumber: number;
  masterGroupE: string | null;
  percentageGroupS: string | null;
}
