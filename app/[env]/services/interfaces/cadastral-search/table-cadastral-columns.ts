export interface TableCadastralColumns {
  label: string;
  property: keyof TableCadastralData | "";
}

export interface TableCadastralData {
  propertyRegistryOffice: null | string;
  propertyRegistryNumber: null | string;
  cadastralNumber: string;
  cadastralArea: number;
  cadastralAreaUnitbuilt: number;
  cadastralRegistryNumber: null;
  domBaunitCondition: string;
  domBaunitEconoDesti: string;
  updatedBy: string;
  updatedAt: string;
  baunitIdE: string;
  cadastralAreaE: string;
}
