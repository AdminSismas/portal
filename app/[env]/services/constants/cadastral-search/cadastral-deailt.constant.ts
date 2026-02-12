import {
  DetailGroup,
  DetailsCadastral,
} from "../../interfaces/cadastral-search/details-cadastral";

interface CadastralDetailFormat {
  title: string;
  propertyDetails: PropertyDetail[];
}

interface PropertyDetail {
  label: string;
  property: (keyof DetailsCadastral | keyof DetailGroup)[];
}

export const CADASTRAL_DETAIL_FORMAT: CadastralDetailFormat[] = [
  {
    title: "Identificación del predio",
    propertyDetails: [
      {
        label: "Número predial (Formato)",
        property: ["cadastralNumberFormat"],
      },
      {
        label: "Número predial",
        property: ["cadastralNumber"],
      },
      {
        label: "Número predial anterior",
        property: ["cadastralLastNumber"],
      },
      {
        label: "Matrícula inmobiliaria",
        property: ["formatPropertyRegistryNumber"],
      },
      {
        label: "Nupre",
        property: ["baunitIdOrigin"],
      },
      {
        label: "Número de ficha",
        property: ["baunitIdE"],
      },
      {
        label: "Número de ficha Matriz",
        property: ["detailGroup", "masterGroupE"],
      },
    ],
  },
  {
    title: "Propiedad y uso",
    propertyDetails: [
      { label: "Destino económico", property: ["domBaunitEconoDesti"] },
      { label: "Tipo", property: ["domBaunitType"] },
      { label: "Condición propiedad", property: ["domBaunitCondition"] },
      { label: "Inscripción catastral", property: ["cadastralCreatedAt"] },
      { label: "Código homologado", property: ["cadastralRegistryNumberTemp"] },
    ],
  },
  {
    title: "Tamaños y áreas",
    propertyDetails: [
      { label: "Área registral", property: ["propertyRegistryAreaE"] },
      { label: "Área catastral", property: ["cadastralAreaE"] },
      { label: "Área catastral geográfica", property: ["cadastralAreaGeoE"] },
      { label: "Área catastral común", property: ["cadAreaCommonE"] },
      { label: "Área catastral privada", property: ["cadAreaPrivateE"] },
      {
        label: "Área catastral construida",
        property: ["cadastralAreaUnitbuilt"],
      },
      {
        label: "Área catastral construida común",
        property: ["cadAreaUnitbuiltCommon"],
      },
    ],
  },
  {
    title: "Seguimiento y actualizaciones",
    propertyDetails: [
      { label: "Último evento el", property: ["cadastralLastEventAt"] },
      { label: "Número último evento", property: ["cadastralLastEventCode"] },
      { label: "Actualizado por", property: ["updatedBy"] },
      { label: "Actualizado el", property: ["updatedAt"] },
    ],
  },
  {
    title: "Información Unidad Predial",
    propertyDetails: [
      {
        label: "Número del edificio",
        property: ["detailGroup", "buildNumber"],
      },
      { label: "Número del piso", property: ["detailGroup", "floorNumber"] },
      {
        label: "Número de la unidad",
        property: ["detailGroup", "unitNumber"],
      },
      {
        label: "Coeficiente de propiedad",
        property: ["detailGroup", "percentage_group"],
      },
    ],
  },
];
