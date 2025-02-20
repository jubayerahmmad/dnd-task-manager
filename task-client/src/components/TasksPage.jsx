import { signOut } from "firebase/auth";
import { auth } from "../firebase.config";
// import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import AllTasks from "./AllTasks";

const TasksPage = () => {
  // const [task, setTask] = useState("");
  const addTask = async (e) => {
    e.preventDefault();
    const task = e.target.task.value;
    const { data } = await axios.post("http://localhost:5000/tasks", { task });
    toast.success("Task Added");
    console.log(data);
    e.target.reset();
  };

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
        <form onSubmit={addTask}>
          <input
            type="text"
            name="task"
            placeholder="Add Task"
            required
            className="border bg-transparent border-border py-3 pl-4 pr-[115px] outline-none w-full rounded-md"
          />

          <button className="bg-gray-950 text-white absolute top-0 right-0 h-full px-5 flex items-center justify-center rounded-r-md cursor-pointer hover:bg-gray-700 group">
            Add Task
          </button>
        </form>
      </div>
      {/* all tasks */}
      <AllTasks />
    </div>
  );
};

export default TasksPage;
