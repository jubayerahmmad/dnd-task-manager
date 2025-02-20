import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router";
import { auth } from "../firebase.config";
import axios from "axios";

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
      };
      const { data } = await axios.post("http://localhost:5000/user", userData);
      console.log("from login", data);
      navigate("/tasks");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex justify-center items-center flex-col min-h-screen">
      <h1 className="text-4xl font-black my-2">Task Manager</h1>

      <button
        onClick={handleLogin}
        className="border border-[#e5eaf2] rounded-md py-2 px-4 flex items-center gap-[10px] text-[1rem] text-[#424242] hover:bg-gray-50 transition-all duration-200"
      >
        <img
          src="https://i.ibb.co/dQMmB8h/download-4-removebg-preview-1.png"
          alt="google logo"
          className="w-[23px]"
        />
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
