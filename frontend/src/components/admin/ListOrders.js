import React, { useEffect } from "react";
import toast from "react-hot-toast";
import Loader from "../Layout/Loader";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import MetaData from "../Layout/MetaData";

import AdminLayout from "../Layout/AdminLayout";
import { useGetAdminOrdersQuery } from "../../redux/api/orderApi";

const ListOrders = () => {
  const { data, isLoading, error } = useGetAdminOrdersQuery();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    // if (deleteError) {
    //   toast.error(deleteError?.data?.message);
    // }

    // if(isSuccess){
    //   toast.success("Product Deleted Successfully");
    // }
  }, [error]);

  //   const deteleProductHandler = (id) => {

  //     deleteProduct(id);
  //   };

  const setOrders = () => {
    const orders = {
      columns: [
        {
          label: "Order ID",
          field: "id",
          sort: "asc",
        },

        {
          label: "Payment Status",
          field: "paymentStatus",
          sort: "asc",
        },

        {
          label: "Order Status",
          field: "orderStatus",
          sort: "asc",
        },

        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    data?.orders?.forEach((order) => {
      orders.rows.push({
        id: order._id,
        paymentStatus: order?.paymentInfo?.status?.toUpperCase(),
        orderStatus: order?.orderStatus,
        actions: (
          <>
            <Link
              to={`/admin/orders/${order?._id}`}
              className="btn btn-outline-primary "
            >
              <i className="fa fa-pencil"></i>
            </Link>

            <button
              className="btn btn-outline-danger ms-2"
              //   onClick={() => deteleProductHandler(product?._id)}
              //   disabled={isDeleteLoading}
            >
              <i className="fa fa-trash"></i>
            </button>
          </>
        ),
      });
    });

    return orders;
  };

  if (isLoading) return <Loader />;

  return (
    <AdminLayout>
      <MetaData title={"All Orders"} />
      <h1 className="my-5">{data?.orders?.length} Orders</h1>

      <MDBDataTable
        data={setOrders()}
        className="px-3"
        bordered
        striped
        hover
      />
    </AdminLayout>
  );
};

export default ListOrders;