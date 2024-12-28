import React, { Suspense } from "react";
import UpdateProduct from "../../components/UpdateProduct";

const EditProduct = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <UpdateProduct />
      </Suspense>
    </>
  );
};

export default EditProduct;
