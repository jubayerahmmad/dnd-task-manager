import { signOut } from "firebase/auth";
import { auth } from "../firebase.config";

const Nav = () => {
  const handleLogOut = async () => {
    try {
      await signOut(auth);
      console.log("sign out Successfull");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-between gap-4 items-center w-full py-2">
      <h1 className="text-2xl lg:text-4xl font-bold text-white my-2">
        Task Manager
      </h1>
      <button
        onClick={handleLogOut}
        className="px-2 py-1 lg:px-4 lg:py-2 border border-white hover:border-gray-100 text-white hover:bg-gray-900 transition duration-300 rounded-md font-bold"
      >
        Log Out
      </button>
    </div>
  );
};

export default Nav;
