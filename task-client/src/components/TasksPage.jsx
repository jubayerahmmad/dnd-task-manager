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
    <div className="flex justify-center items-center flex-col max-w-7xl mx-auto">
      <div className="flex justify-between gap-4 items-center w-full py-2">
        <h1 className="text-4xl font-black my-2">Task Manager</h1>
        <button
          onClick={handleLogOut}
          className="px-4 py-2 border border-[#3B9DF8] text-[#3B9DF8] transition duration-300 rounded "
        >
          Log Out
        </button>
      </div>
      {/* input  */}
      <div className="w-6/12 relative">
        <input
          type="text"
          placeholder="Add Task"
          className="border bg-transparent border-border py-3 pl-4 pr-[115px] outline-none w-full rounded-md"
        />

        <button className="bg-gray-950 text-white absolute top-0 right-0 h-full px-5 flex items-center justify-center rounded-r-md cursor-pointer hover:bg-gray-700 group">
          Add Task
        </button>
      </div>
      {/* all tasks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 w-full mt-4">
        {/* todo */}
        <div className="border">
          <h1 className="text-center font-bold text-2xl">To-Do</h1>
        </div>

        {/* In Progress */}
        <div className="border">
          <h1 className="text-center font-bold text-2xl">In Progress</h1>
        </div>

        {/* Done */}
        <div className="border">
          <h1 className="text-center font-bold text-2xl">Done</h1>
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
