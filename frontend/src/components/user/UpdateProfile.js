import React,{useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useUpdateProfileMutation } from "../../redux/api/userApi";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import UserLayout from "../Layout/UserLayout";
import MetaData from "../Layout/MetaData";

const UpdateProfile = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate()

  const [UpdateProfile,{isLoading,error,isSuccess}] = useUpdateProfileMutation()

  const {user} = useSelector(state => state.auth)

  useEffect(() => {
    if(user) {
      setName(user?.name)
      setEmail(user?.email)
    }

    if(error) {
      toast.error(error?.data?.message)
    }

    if(isSuccess) {
      toast.success("Profile Updated Successfully")
      navigate("/me/profile")
    }

  },[user,error,isSuccess])

  const submitHandler = (e) => {
    e.preventDefault()

    const userData = {
      name,
      email
    }

    UpdateProfile(userData)
  }

  return (
    <UserLayout>
    <MetaData title={"Update Profile"} />
    <div className="row wrapper">
      <div className="col-10 col-lg-7">
        <form
          className="shadow rounded-5 bg-body"
          onSubmit={submitHandler}
        >
          <h2 className="mb-4">Update Profile</h2>
          <div className="mb-3">
            <label htmlFor="name_field" className="form-label">
              {" "}
              Name{" "}
            </label>
            <input
              type="text"
              id="name_field"
              className="form-control rounded-5"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email_field" className="form-label">
              {" "}
              Email{" "}
            </label>
            <input
              type="email"
              id="email_field"
              className="form-control rounded-5"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button type="submit" className="btn update-btn w-100" style={{backgroundColor:"#232f3e",borderRadius:"20px",color:"#f6ae84"}}>
            {isLoading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
    </UserLayout>
  );
};

export default UpdateProfile;
