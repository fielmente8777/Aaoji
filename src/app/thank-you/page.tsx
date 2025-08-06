import { SectionWithContainer } from "@/components";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <main className="flex justify-center items-center h-dvh">
      <SectionWithContainer>
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div className="relative max-w-96 w-full aspect-square  rounded-full">
            <Image
              src="/logo.png"
              alt="Logo"
              fill
              className="object-contain px-4"
            />
          </div>

          <div className="max-w-xl mx-auto">
            <div className="flex flex-col items-center gap-4">
              <h2 className="text-primary md:text-lg font-semibold abhayaLibre">
                THANK YOU FOR SUBMITTING
              </h2>
              <h3 className="md:text-4xl text-2xl font-bold text-center abhayaLibre">
                We will get back to you shortly!
              </h3>

              <div>
                <Link
                  href="/"
                  className="px-4 py-3 bg-secondary text-white rounded-sm flex items-center justify-center gap-2 border transition-all duration-300 ease-in-out hover:scale-x-105 active:scale-95 hover:shadow-lg capitalize"
                >
                  Go to Home Page
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SectionWithContainer>
    </main>
  );
};

export default page;
