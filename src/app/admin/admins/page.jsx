import React, { Suspense } from "react";

import CreateAdmin from "./components/CreateAdmin";
import ShowAdmin from "./components/ShowAdmin";

const AdminsPage = () => {
  return (
    <div className="flex flex-wrap justify-evenly">
      <Suspense fallback={<div>Loading...</div>}>
        <CreateAdmin />
      </Suspense>
      <ShowAdmin />
    </div>
  );
};

export default AdminsPage;
