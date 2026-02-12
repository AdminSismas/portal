import Image from "next/image";

export function Footer() {
  return (
    <footer className="py-16 lg:py-20 xl:py-24 tracking-wide bg-amber-50">
      <div className="container mx-auto px-3 2xl:px-0">
        <div className="flex flex-wrap items-center md:items-end md:justify-between max-md:flex-col gap-6">
          <Image
            src="/images/logo_masora.png"
            alt="Logo"
            className="inline w-auto h-[3dvh] sm:h-[4dvh] md:h-[6dvh]"
            width={500}
            height={100}
          />
        </div>
        <div className="flex items-center justify-center md:justify-start flex-wrap gap-y-2 space-x-6">
          <a
            href="https://maps.app.goo.gl/66rNfENZRTEFya9c7"
            className="flex items-center space-x-2"
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              className="w-4 h-4 text-[#00d87b] hover:text-[#0b8b54]"
            >
              <path
                fill="currentColor"
                d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0M192 128a64 64 0 1 1 0 128a64 64 0 1 1 0-128"
              ></path>
            </svg>
            <p className="text-center text-sm lg:text-base">
              Vía Rionegro-Aeropuerto Sector Las Delicias
            </p>
          </a>
          <a
            target="_blank"
            className="flex items-center space-x-2"
            href="mailto:comunicaciones@masora.gov.co"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              className="w-4 h-4 text-[#00d87b] hover:text-[#0b8b54]"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="m7.172 11.334l2.83 1.935l2.728-1.882l6.115 6.033q-.242.079-.512.08H1.667c-.22 0-.43-.043-.623-.12zM20 6.376v9.457c0 .247-.054.481-.15.692l-5.994-5.914zM0 6.429l6.042 4.132l-5.936 5.858A1.7 1.7 0 0 1 0 15.833zM18.333 2.5c.92 0 1.667.746 1.667 1.667v.586L9.998 11.648L0 4.81v-.643C0 3.247.746 2.5 1.667 2.5z"
              ></path>
            </svg>
            <p className="text-center text-sm lg:text-base">
              comunicaciones@masora.gov.co
            </p>
          </a>
        </div>
        <hr className="my-6 rounded-xl border-y-2 border-black" />
        <div className="copyright-area flex flex-wrap items-center md:justify-between max-md:flex-col gap-6">
          <div className="flex space-x-6">
            <a
              href="https://www.instagram.com/masoraorientea"
              target="_blank"
              className="text-gray-900 hover:text-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 14 14"
                className="w-9 h-9 text-[#00d87b] hover:text-[#0b8b54]"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M3.39.787A2.604 2.604 0 0 0 .786 3.39v6.944a2.604 2.604 0 0 0 2.604 2.604h6.944a2.604 2.604 0 0 0 2.603-2.604V3.39A2.604 2.604 0 0 0 10.334.787zm7.693 2.607a.75.75 0 1 1-1.5 0a.75.75 0 0 1 1.5 0m-4.22 1.388a2.08 2.08 0 1 0 0 4.16a2.08 2.08 0 0 0 0-4.16m-3.081 2.08a3.08 3.08 0 1 1 6.16 0a3.08 3.08 0 0 1-6.16 0"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
            <a
              href="https://www.facebook.com/masoraorientea"
              target="_blank"
              className="text-gray-900 hover:text-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="w-9 h-9 text-[#00d87b] hover:text-[#0b8b54]"
              >
                <path
                  fill="currentColor"
                  d="M20.9 2H3.1A1.1 1.1 0 0 0 2 3.1v17.8A1.1 1.1 0 0 0 3.1 22h9.58v-7.75h-2.6v-3h2.6V9a3.64 3.64 0 0 1 3.88-4a20 20 0 0 1 2.33.12v2.7H17.3c-1.26 0-1.5.6-1.5 1.47v1.93h3l-.39 3H15.8V22h5.1a1.1 1.1 0 0 0 1.1-1.1V3.1A1.1 1.1 0 0 0 20.9 2"
                ></path>
              </svg>
            </a>
            <a
              href="https://x.com/masora_orientea"
              target="_blank"
              className="text-gray-900 hover:text-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="w-9 h-9 text-[#00d87b] hover:text-[#0b8b54]"
              >
                <path
                  fill="currentColor"
                  d="M64 32C28.7 32 0 60.7 0 96v320c0 35.3 28.7 64 64 64h320c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64zm297.1 84L257.3 234.6L379.4 396h-95.6L209 298.1L123.3 396H75.8l111-126.9L69.7 116h98l67.7 89.5l78.2-89.5zm-37.8 251.6L153.4 142.9h-28.3l171.8 224.7h26.3z"
                ></path>
              </svg>
            </a>
          </div>
          <p className="text-xs lg:text-sm text-center text-gray-900 font-medium">
            <strong>Copyright ©2026 - Sismas</strong>
          </p>
        </div>
      </div>
    </footer>
  );
}
