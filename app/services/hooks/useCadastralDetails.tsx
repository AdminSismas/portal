import { useEffect, useState } from "react";
import {
  DetailGroup,
  DetailsCadastral,
} from "../interfaces/cadastral-search/details-cadastral";
import { useCadastralSearchContext } from "./cadastral-search-context";

interface UseCadastralDetailsProps {
  baunitIdE: string;
  open: boolean;
}

export function useCadastralDetails({
  baunitIdE,
  open,
}: UseCadastralDetailsProps) {
  const [details, setDetails] = useState<DetailsCadastral | null>(null);
  const { url } = useCadastralSearchContext();

  const getDetailInformation = (
    property: (keyof DetailsCadastral | keyof DetailGroup)[],
  ): string => {
    if (!details) return "Sin información";

    const noInfo = "Sin información";

    if (property.length > 1) {
      const detailGroup = details[
        property[0] as keyof DetailsCadastral
      ] as DetailGroup;

      if (!detailGroup) return noInfo;

      const detailGroupKey = property[1] as keyof DetailGroup;
      const detail = detailGroup[detailGroupKey] ?? noInfo;
      return String(detail);
    }

    const detail = details[property[0] as keyof DetailsCadastral];

    return String(detail ?? noInfo);
  };

  const haveDetailGroup = () => {
    if (!details) return false;
    return details.detailGroup !== null;
  };

  useEffect(() => {
    const fetchDetails = async () => {
      if (!baunitIdE || !open) return;
      try {
        const response = await fetch(`${url}/baunit/main/${baunitIdE}`);
        if (!response.ok) throw new Error("Error al obtener datos detallados");

        const data = (await response.json()) as DetailsCadastral;
        const formatPropertyRegistryNumber = `${data.propertyRegistryOffice}-${data.propertyRegistryNumber}`;
        console.log(formatPropertyRegistryNumber);
        setDetails({
          ...data,
          formatPropertyRegistryNumber,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchDetails();
  }, [baunitIdE, url, open]);

  return { details, getDetailInformation, haveDetailGroup };
}
