import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { signInUser, googleUserInfo } from "../api/userApi";
import Cookies from "js-cookie";
import { useNavigate, Link } from "react-router-dom";
import { Alerts } from "./Alerts";
import { useSetRecoilState } from "recoil";
import { signInErrorAlert } from "../store/atoms/userAtoms";
import { jwtVerify } from "jose";
import { showSpinner } from "../store/atoms/todoAtoms";
import { useGoogleLogin } from '@react-oauth/google';
export function Signin() {
  const navigate = useNavigate();
  const setSpinner = useSetRecoilState(showSpinner);
  const setAlert =  useSetRecoilState(signInErrorAlert)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function verifyJWT() {
    const secret = new TextEncoder().encode("VICKY");
    const token = Cookies.get("todoToken");
    try {
      const response = await jwtVerify(token, secret);
      if (response.payload.email) {
        navigate("/home");
      }
    } catch (err) {}
  }
  useEffect(() => {
    verifyJWT();
  }, []);
  function handleSubmit(e) {
    e.preventDefault();
    const user = {
      email: email,
      password: password,
    };
    signin(user);
  }

  async function signin(user) {
    try {
      setSpinner(true);
      console.log(user);
      Cookies.remove("todoToken");
      const token = await signInUser(user);
      if (token) {
        Cookies.set("todoToken", token.token);
        navigate("/home");
      } else {
      }
    } catch (e) {
      console.log("error: ", e);
      setAlert(true);
      if (e.response.status === 400 || e.response.status === 401) {
        //Logic to notify user that account already exists, to be written
        console.log("error from user api: ", e.response.status);
      }
    } finally{
      setSpinner(false);
    }
  }

  const getUserDetails = async(token)=>{
    const response = await googleUserInfo(token);
    if(response){
      console.log("Response fom : ", response)
      const user = {
        name: response.name,
        email: response.email,
        password: response.id,
      };
      signin(user);
    }
  }

  const loginGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => getUserDetails(codeResponse.access_token),
    onError: (error) => console.log('Login Failed:', error)
  });


  return (
    <section>
      <Alerts />
      <div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
        <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
          <div className="mb-2 flex justify-center">
          <a href="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="46"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-check-circle"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <path d="m9 11 3 3L22 4" />
          </svg>
        </a>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 ">
            Don&apos;t have an account?{" "}
            <Link
              to={"/"}
              className="font-semibold text-black transition-all duration-200 hover:underline"
            >
              Create a free account
            </Link>
          </p>
          <form onSubmit={handleSubmit} className="mt-8">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor=""
                  className="text-base font-medium text-gray-900"
                >
                  {" "}
                  Email address{" "}
                </label>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900"
                  >
                    {" "}
                    Password{" "}
                  </label>
                  <a
                    href="#"
                    title=""
                    className="text-sm font-semibold text-black hover:underline"
                  >
                    {" "}
                    Forgot password?{" "}
                  </a>
                </div>
                <div className="mt-2">
                  <input
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Get started <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
          <div className="mt-3 space-y-3">
            <button
              type="button"
              className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
              onClick={loginGoogle}
            >
              <span className="mr-2 inline-block">
                <svg
                  className="h-6 w-6 text-rose-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
                </svg>
              </span>
              Sign in with Google
            </button>
            {/* <button
              type="button"
              className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-400 bg-white px-3.5 py-2.5 font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none"
            >
              <span className="mr-2 inline-block">
                <svg
                  className="h-6 w-6 text-[#2563EB]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
                </svg>
              </span>
              Sign in with Facebook
            </button> */}
          </div>
        </div>
      </div>
    </section>
  );
}
