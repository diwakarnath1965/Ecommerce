import React, { useState, useEffect } from "react";
import MetaData from "../Layout/MetaData";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { calculateOrderCost } from "../../helpers/helpers";
import CheckoutSteps from "./CheckoutSteps";

const ConfirmOrder = () => {
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const {itemsPrice,shippingPrice,taxPrice,totalPrice} =calculateOrderCost(cartItems);

  

  return (
    <>
      <MetaData title={"Confirm Order"} />

      <CheckoutSteps shipping confirmOrder />

      <div className="row d-flex justify-content-between">
        <div className="col-12 col-lg-8 mt-5 order-confirm">
          <h4 className="mb-3">Shipping Info</h4>
          <p>
            <b>Name:</b> {user?.name}
          </p>
          <p>
            <b>Phone:</b> {shippingInfo?.phoneNo}
          </p>
          <p className="mb-4">
            <b>Address:</b> {shippingInfo?.address}, {shippingInfo?.city},{" "}
            {shippingInfo?.zipCode}, {shippingInfo?.country}
          </p>
          <hr />
          <h4 className="mt-4">Your Cart Items:</h4>

          {cartItems?.map((item) => (
            <>
              
              <div className="cart-item my-1" style={{paddingTop:"10px",paddingBottom:"10px",borderRadius:"20px",paddingLeft:"24px", border: "1px solid #232f3e"}}>
                <div className="row">
                  <div className="col-4 col-lg-2">
                    <img
                      src={item?.image}
                      alt="Laptop"
                      height={45}
                      width={65}
                    />
                  </div>
                  <div className="col-5 col-lg-6">
                    <Link to={`/product/${item.product}`} style={{ textDecoration: 'none' }}>{item?.name.substring(0,80)}...</Link>
                  </div>
                  <div className="col-4 col-lg-4 mt-4 mt-lg-0">
                    <p>
                      {item?.quantity} x ${item?.price} = <b>${(item?.quantity * item?.price).toFixed(2)}</b>
                    </p>
                  </div>
                </div>
              </div>
              
            </>
          ))}
        </div>
        <div className="col-12 col-lg-3 my-4">
          <div id="order_summary">
            <h4>Order Summary</h4>
            <hr />
            <p>
              Subtotal: <span className="order-summary-values">${itemsPrice}</span>
            </p>
            <p>
              Shipping: <span className="order-summary-values">${shippingPrice}</span>
            </p>
            <p>
              Tax: <span className="order-summary-values">${taxPrice}</span>
            </p>
            <hr />
            <p>
              Total: <span className="order-summary-values">${totalPrice}</span>
            </p>
            <hr />
            <Link
              to="/payment_method"
              id="checkout_btn"
              className="btn btn-primary w-100"
              
            >
              Proceed to Payment
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
