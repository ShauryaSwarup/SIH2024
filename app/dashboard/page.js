import Dashboard from "./dashboard";
import React from "react";

export default async function dashboard_page() {
    // const session = await auth();
  
    return (
      <div>
        Welcome, Admin!
        {/* <DashboardEmbed session={session} /> */}
        <Dashboard/>

      </div>
    );
  }