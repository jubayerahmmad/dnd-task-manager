import { signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router";
import { auth } from "../firebase.config";

const provider = new GoogleAuthProvider();
const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate("/tasks");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  return (
    <div className="flex justify-center items-center flex-col min-h-screen">
      <h1 className="text-4xl font-black my-2">Task Manager</h1>
      <button
        onClick={handleLogin}
        className="px-3 py-1 rounded-md border font-semibold"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
