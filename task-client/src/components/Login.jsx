import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router";
import { auth } from "../firebase.config";
import axios from "axios";
import toast from "react-hot-toast";

const provider = new GoogleAuthProvider();
const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { user } = await signInWithPopup(auth, provider);
      const userData = {
        name: user?.displayName,
        email: user?.email,
        createdAt: user?.metadata.creationTime,
        userId: user?.uid,
      };
      await axios.post("https://task-server-pi-nine.vercel.app/user", userData);
      // console.log("from login", data);
      toast.success("Login Successful");
      navigate("/tasks");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex justify-center items-center flex-col min-h-screen">
      <h1 className="text-4xl font-bold my-2 text-white text-center">
        Welcome to{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-blue-300">
          Task Manager
        </span>
      </h1>

      <button
        onClick={handleLogin}
        className="border border-blue-500 hover:border-gray-50 rounded-md py-2 px-4 my-2 flex items-center gap-[10px] text-[1rem] text-blue-500 duration-800 hover:text-white hover:bg-gray-950"
      >
        <img
          src="https://i.ibb.co/dQMmB8h/download-4-removebg-preview-1.png"
          alt="google logo"
          className="w-[23px]"
        />
        Sign in to Continue
      </button>
    </div>
  );
};

export default Login;
