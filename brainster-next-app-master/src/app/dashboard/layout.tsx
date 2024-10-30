import Header from "@/components/Header/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
     <Header />
    <div className="bg-black text-bodydark ">
      <div className="flex  h-full ">
        <div className="relative flex flex-1 flex-col ">
         
          <main>
            <div className="mx-auto min-h-full p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
    </>
  );
}