import React, { useState,useEffect } from "react";
import { useRegisterMutation } from "../../redux/api/authApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MetaData from "../Layout/MetaData";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate()

  const { name, email, password } = user;

  const [register, { isLoading, error, data }] = useRegisterMutation();

  const {isAuthenticated} = useSelector((state) => state.auth);

  useEffect(() => {

    if(isAuthenticated) {
      navigate("/")
    }
    if(error) {
        toast.error(error?.data?.message)
    }
  }, [error, isAuthenticated]);

  const submitHandler = (e) => {
    e.preventDefault();

    const signUpData = {
      name,
      email,
      password,
    };

    register(signUpData);
  };

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <>
    <MetaData title={"Register"} />
    <div className="row wrapper">
      <div className="col-10 col-lg-4">
        <form
          className="shadow rounded-5 bg-body"
          action="your_submit_url_here"
          onSubmit={submitHandler}
        >
          <h2 className="mb-4" style={{textAlign:"center"}}>Register</h2>
          <div className="mb-3">
            <label htmlFor="name_field" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name_field"
              className="form-control rounded-5"
              name="name"
              value={name}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email_field" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email_field"
              className="form-control rounded-5"
              name="email"
              value={email}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password_field" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password_field"
              className="form-control rounded-5"
              name="password"
              value={password}
              onChange={onChange}
            />
          </div>
          <button id="register_button" type="submit" className="btn w-100 py-2" disabled={isLoading} style={{backgroundColor:"#232f3e",borderRadius:"20px",color:"#f6ae84"}}>
            {isLoading ? "registering..." : "REGISTER"}
          </button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Register;
