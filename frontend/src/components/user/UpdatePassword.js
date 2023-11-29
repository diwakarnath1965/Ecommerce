import React, { useState,useEffect } from "react";
import { useUpdatePasswordMutation } from "../../redux/api/userApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import UserLayout from "../Layout/UserLayout";
import MetaData from "../Layout/MetaData";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [updatePassword, { isLoading, error, isSuccess }] =
    useUpdatePasswordMutation();

 

  useEffect(() => {
    
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("Password updated");
      navigate("/me/profile");
    }
  }, [error, isSuccess]);

  const submitHandler = (e) => {
    e.preventDefault();

    const userData = {
      oldPassword,
      password,
    };

    updatePassword(userData);
  };

  return (
    <UserLayout>
        <MetaData title={"Update Password"} />
    <div className="row wrapper">
      <div className="col-10 col-lg-6">
        <form className="shadow rounded-5 bg-body" onSubmit={submitHandler}>
          <h2 className="mb-4">Update Password</h2>
          <div className="mb-3">
            <label htmlFor="old_password_field" className="form-label">
              Old Password
            </label>
            <input
              type="password"
              id="old_password_field"
              className="form-control rounded-5"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="new_password_field" className="form-label">
              New Password
            </label>
            <input
              type="password"
              id="new_password_field"
              className="form-control rounded-5"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn update-btn w-100" disabled={isLoading} style={{backgroundColor:"#232f3e",borderRadius:"20px",color:"#f6ae84"}}>
            {isLoading ? "Updating..." : "Update Password"}
          </button>
        </form>
      </div>
    </div>
    </UserLayout>
  );
};

export default UpdatePassword;
