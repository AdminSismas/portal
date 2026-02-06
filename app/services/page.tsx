import { CadastralSearch } from "./_components/cadastral-search/cadastral-search";
import { ServicesChat } from "./_components/chat/services-chat";

export default function ServicesPage() {
  return (
    <>
      <div className="w-full h-full flex flex-col justify-center py-8 lg:py-16 px-4 lg:px-8 bg-linear-to-t from-[#00d87b]/30 from-10%">
        <CadastralSearch />
      </div>
      <div className="w-full h-full flex flex-col justify-center py-8 lg:py-16 px-4 lg:px-8 bg-linear-to-b from-[#00d87b]/30 from-10%">
        <ServicesChat />
      </div>
    </>
  );
}
