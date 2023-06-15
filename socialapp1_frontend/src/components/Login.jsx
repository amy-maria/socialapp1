import React from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logowhite.png";
import shareVideo from "../assets/share.mp4";
import { client } from "../client";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const createOrGetUser = async (response) => {
    const decoded = jwt_decode(response.credential);
    localStorage.setItem("user", JSON.stringify(decoded));

    const { name, picture, sub } = decoded;
    const doc = {
      _id: sub,
      _type: "user",
      userName: name,
      image: picture,
    };

    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  return (
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}>
      <div className="flex justify-start item-center flex-col h-screen">
        <div className="relative w-full h-full">
          <video
            src={shareVideo}
            type="video/mp4"
            loop
            controls={false}
            muted
            autoPlay
            className="
      
        w-full
        h-full object-cover"
          />
          <div className="absolute flex flex-col justify-center items-center top-0 bottom-0 left-0 right-0 bg-blackOverlay">
            <div className="p-5">
              <img src={logo} width="130px" alt="logo" />
              <div className="shadow-2xl">
                <GoogleLogin
                  onSuccess={(response) => createOrGetUser(response)}
                  onError={() => console.log("Error")}
                  cookiePolicy="single_host_origin"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
