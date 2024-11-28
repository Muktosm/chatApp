import React, { useState } from "react";
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaFacebook, FaGooglePlus } from "react-icons/fa";
import "./Signup.css";
import CommonButton from "../../common/commonButton/CommonButton";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import { Bounce, Flip, toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
const Signup = () => {
  // variable part
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [mailError, setMailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordRepeatError, setPasswordRepeatError] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  // firebase variable
  const auth = getAuth();
  // function part
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setMailError("Email can't be blank");
    }
    if (!password) {
      setPasswordError("Password is blank!");
    }
    if (!repeatPassword) {
      setPasswordRepeatError("Password is blank!");
    } else {
      setLoader(!loader);
      if (password === repeatPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            toast.success("Sign up successful", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Bounce,
            });
            const user = userCredential.user;
            // ... updating the username and profile picture after successful singup
            updateProfile(auth.currentUser, {
              displayName: user.email,
              photoURL:
                "https://www.outsystems.com/Forge_CW/_image.aspx/Q8LvY--6WakOw9afDCuuGdL9c3WA3ttAt5pfSBURmME=/user-photo-upload-example-2023-01-04%2000-00-00-2024-05-21%2003-00-3",
            })
              .then(() => {
                // Profile updated!
                // ...
              })
              .catch((error) => {
                // An error occurred
                // ...
              });
            console.log("🚀 ~ .then ~ user:", user);
            setLoader(false); // changing the state to false
            navigate("/login");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            toast.error(`${errorCode}`, {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
              transition: Flip,
              onClose: () => setLoader(false),
            });
          });
      } else {
        toast.error("Password must match", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Flip,
          onClose: () => setLoader(false),
        });
      }
    }
  };

  return (
    <>
      <section className="signup ">
        <div className="container">
          <div className="logo">
            <img src="/images/logo.png" alt="Email logo" />
          </div>
          <div className="formField">
            <form action="" onSubmit={handleSubmit}>
              <h1 className="formHeading">Create an Account</h1>
              <div className="terms">
                By signing up, you agree to the Terms of Service.
              </div>
              <div className="inputField">
                <div className="emailInput">
                  <label htmlFor="email">E-Mail</label>
                  <input
                    className={mailError && "error"}
                    type="email"
                    name=""
                    aria-label="Email address"
                    placeholder={mailError ? `${mailError}` : "Your email"}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="passwordInput">
                  <label htmlFor="password">Password</label>
                  <div>
                    <div className="input">
                      <input
                        type={showPassword ? "text" : "password"}
                        name=""
                        className={passwordError && "error"}
                        placeholder={
                          passwordError ? `${passwordError}` : "Password"
                        }
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {showPassword ? (
                        <FaRegEye
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      ) : (
                        <FaRegEyeSlash
                          onClick={() => setShowPassword(!showPassword)}
                        />
                      )}
                    </div>
                    <div className="input">
                      <input
                        type={showRepeatPassword ? "text" : "password"}
                        className={passwordRepeatError && "error"}
                        placeholder={
                          passwordRepeatError
                            ? `${passwordRepeatError}`
                            : "Repeat"
                        }
                        onChange={(e) => setRepeatPassword(e.target.value)}
                      />
                      {showRepeatPassword ? (
                        <FaRegEye
                          onClick={() =>
                            setShowRepeatPassword(!showRepeatPassword)
                          }
                        />
                      ) : (
                        <FaRegEyeSlash
                          onClick={() =>
                            setShowRepeatPassword(!showRepeatPassword)
                          }
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="links">
                <CommonButton
                  common_button_content={
                    loader ? (
                      <div className="w-7 h-7 border-4 text-center border-t-[#25DAC5] border-gray-300 rounded-full animate-spin"></div>
                    ) : (
                      "Sign Up"
                    )
                  }
                  common_button_type={"submit"}
                  common_button_bg={"bg-[#25DAC5] "}
                />
                <p>or</p>
                <FaFacebook />
                <AiFillTwitterCircle />
                <FaGooglePlus />
              </div>
            </form>
            <div className="alreadySignedIn">
              <p>
                Have an accoutn? <Link to={"/login"}>Log In</Link>{" "}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
