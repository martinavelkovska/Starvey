import Welcome from "@/components/Welcome/Welcome";

const  WelcomeLayout = () => {
  return (
     <>
    <div className="bg-boxdark-2 text-bodydark overflow-hidden scrollbar-hide">
      <div className="flex overflow-hidden scrollbar-hide">
        <div className="relative flex flex-1 flex-col overflow-x-hidden ">
          <Welcome />
          <main>
           
          </main>
        </div>
        </div>
    </div>
    </>
  );
}

export default WelcomeLayout;