import React, { useState } from "react";
import "./Login.css";
import CommonButton from "../../common/commonButton/CommonButton";
import { FaFacebook, FaGooglePlus } from "react-icons/fa6";
import { AiFillTwitterCircle } from "react-icons/ai";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Bounce, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { currentUser } from "../../features/counter/counterSlice";
import { getDatabase, ref, set } from "firebase/database";
import { Link, useNavigate } from "react-router-dom";
const Login = () => {
  // general variable
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mailError, setMailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loader, setLoader] = useState(false);
  const currentUserSlice = useSelector((state) => state.counter.value);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // firebase variable
  const auth = getAuth();
  const db = getDatabase();
  // function part
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setMailError("Email can't be blank");
    }
    if (!password) {
      setPasswordError("Password can't be blank");
    } else {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          console.log("🚀 ~ .then ~ user:", user);
          toast.success("Login successful", {
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
          localStorage.setItem("currentUser", JSON.stringify(user));

          dispatch(
            currentUser(JSON.parse(localStorage.getItem("currentUser")))
          );
          set(ref(db, "users/" + user.uid), {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
          });
          navigate("/");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(
            "🚀 ~ handleSubmit ~ errorCode:",
            errorCode,
            errorMessage
          );
          toast.error("Something went wrong", {
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
        });
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
              <h1 className="formHeading mb-[69px]">Create an Account</h1>

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
                        type="password"
                        name=""
                        className={passwordError && "error"}
                        placeholder={
                          passwordError ? `${passwordError}` : "Password"
                        }
                        onChange={(e) => setPassword(e.target.value)}
                      />
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
                      "Log In"
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
            <div className="needToSignIn">
              <p>
                Have an accoutn? <Link to={"/signup"}>Sign Up</Link>{" "}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
