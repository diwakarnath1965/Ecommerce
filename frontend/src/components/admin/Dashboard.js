import React, { useEffect, useState } from "react";
import AdminLayout from "../Layout/AdminLayout";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SalesChart from "../charts/SalesChart";
import { useLazyGetDashboardSalesQuery } from "../../redux/api/orderApi";
import toast from "react-hot-toast";
import Loader from "../Layout/Loader";
import MetaData from "../Layout/MetaData";

const Dashboard = () => {
  const [startDate, setStartDate] = useState(new Date().setDate(1));
  const [endDate, setEndDate] = useState(new Date());

  const [getDashboardSales, {data, error, isLoading }] =
    useLazyGetDashboardSalesQuery({ startDate, endDate });

    useEffect(() => {
        if(error){
            toast.error(error?.data?.message)
        }

        if(startDate && endDate && !data){
            getDashboardSales({
                startDate: new Date(startDate).toISOString(),
                endDate: endDate.toISOString(),
            })
        }
    }, [error]);

  const submitHandler = (e) => {
    getDashboardSales({
      startDate: new Date(startDate).toISOString(),
      endDate: endDate.toISOString(),
    });
  };

  if(isLoading) return <Loader/>
  return (
    <AdminLayout>
        <MetaData title={"Admin Dashboard"} />
      <div>
        <div className="d-flex justify-content-start align-items-center">
          <div className="mb-3 me-4">
            <label className="form-label d-block">Start Date</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              className="form-control"
              
            />
          </div>
          <div className="mb-3">
            <label className="form-label d-block">End Date</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              className="form-control"
            />
          </div>
          <button
            className="btn fetch-btn ms-4 mt-3 px-5"
            onClick={submitHandler}
            style={{backgroundColor:"#232f3e",borderRadius:"20px",color:"#f6ae84"}}
          >
            Fetch
          </button>
        </div>
        <div className="row pr-4 my-5">
          <div className="col-xl-6 col-sm-12 mb-3">
            <div className="card text-white o-hidden h-100" style={{backgroundColor:"#f6ae84",borderRadius:"60px"}}>
              <div className="card-body">
                <div className="text-center card-font-size" style={{color:"#232f3e"}}>
                  Sales
                  <br />
                  <b>${data?.totalSales?.toFixed(2)}</b>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-6 col-sm-12 mb-3">
            <div className="card text-white o-hidden h-100" style={{backgroundColor:"#232f3e",borderRadius:"60px"}}>
              <div className="card-body">
                <div className="text-center card-font-size" style={{color:"#f6ae84"}}>
                  Orders
                  <br />
                  <b>{data?.totalNumOrders}</b>
                </div>
              </div>
            </div>
          </div>
        </div>

        <SalesChart salesData={data?.sales} />
        <div className="mb-5" />
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
