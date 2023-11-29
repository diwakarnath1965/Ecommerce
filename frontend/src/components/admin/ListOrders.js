import React, { useEffect } from "react";
import toast from "react-hot-toast";
import Loader from "../Layout/Loader";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import MetaData from "../Layout/MetaData";

import AdminLayout from "../Layout/AdminLayout";
import {
  useDeleteOrderMutation,
  useGetAdminOrdersQuery,
} from "../../redux/api/orderApi";

const ListOrders = () => {
  const { data, isLoading, error } = useGetAdminOrdersQuery();

  const [deleteOrder, { error: deleteError,isLoading:isDeleteLoading, isSuccess }] =
    useDeleteOrderMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }

    if (isSuccess) {
      toast.success("Order Deleted Successfully");
    }
  }, [error, deleteError, isSuccess]);

  const deteleOrderHandler = (id) => {
    deleteOrder(id);
  };

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
              className="btn "
            >
              <i className="fa fa-pencil" style={{color:"#232f3e"}}></i>
            </Link>

            <button
              className="btn ms-2"
                onClick={() => deteleOrderHandler(order?._id)}
                disabled={isDeleteLoading}
            >
              <i className="fa fa-trash" style={{color:"#f6ae84"}}></i>
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
