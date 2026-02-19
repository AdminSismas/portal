import { CADASTRAL_DETAIL_FORMAT } from "../../constants/cadastral-search/cadastral-deailt.constant";
import {
  DetailGroup,
  DetailsCadastral,
} from "../../interfaces/cadastral-search/details-cadastral";

interface CadastralDetailProps {
  getDetailInformation: (
    property: (keyof DetailsCadastral | keyof DetailGroup)[],
  ) => string;
  haveDetailGroup: () => boolean;
}

export function CadastralDetail({
  getDetailInformation,
  haveDetailGroup,
}: CadastralDetailProps) {
  const isMatrix = (title: string) => {
    if (title === "Información Unidad Predial") {
      return haveDetailGroup();
    }
    return true;
  };

  return (
    <>
      {CADASTRAL_DETAIL_FORMAT.map(
        (section) =>
          isMatrix(section.title) && (
            <article key={section.title} className="mb-2 lg:mb-4">
              <header className="bg-linear-to-r from-green-100 to-white mb-1">
                <h2 className="text-base border-b border-slate-200 p-1 font-semibold">
                  {section.title}
                </h2>
              </header>
              <section className="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-4 text-sm lg:text-xs">
                {section.propertyDetails.map((propertyDetail) => (
                  <div
                    key={propertyDetail.label}
                    className="flex gap-2 lg:gap-4"
                  >
                    <span className="font-semibold">
                      {propertyDetail.label}:
                    </span>
                    <span>{getDetailInformation(propertyDetail.property)}</span>
                  </div>
                ))}
              </section>
            </article>
          ),
      )}
    </>
  );
}
