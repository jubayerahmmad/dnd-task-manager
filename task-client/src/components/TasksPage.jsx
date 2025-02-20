import { signOut } from "firebase/auth";
import { auth } from "../firebase.config";
const TasksPage = () => {
  const handleLogOut = async () => {
    try {
      await signOut(auth);
      console.log("sign out Successfull");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center flex-col min-h-screen">
      <button className="p-2 border m-6" onClick={handleLogOut}>
        Log Out
      </button>
    </div>
  );
};

export default TasksPage;
