
"use client"
import { useSession } from "next-auth/react";
import { useState } from "react";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Loader from "@/components/Loader";

function Layout({ children }) {
  const { data: session, status } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (status === "loading") {
    return (
      <div className="dark:bg-boxdark-2 dark:text-bodydark  h-[100%] w-full">
        {/* <h1>loading...</h1> */}
        <Loader />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="dark:bg-boxdark-2 dark:text-bodydark">
        <h1>no session</h1>
      </div>
    );
  }

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Layout;
