import { signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import axios from "axios";
import toast from "react-hot-toast";
import AllTasks from "./AllTasks";
import { useEffect, useState } from "react";

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);

  // fetch tasks
  const getData = async () => {
    const { data } = await axios("http://localhost:5000/tasks");
    setTasks(data);
  };

  useEffect(() => {
    getData();
  }, [setTasks]);

  const addTask = async (e) => {
    e.preventDefault();
    const taskData = e.target.task.value;
    try {
      const { data } = await axios.post("http://localhost:5000/tasks", {
        task: taskData,
      });
      toast.success("Task Added");
      console.log(data);
      getData();
      e.target.reset();
    } catch (error) {
      console.log(error);
    }
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
    <div className="flex justify-center items-center flex-col max-w-7xl mx-auto px-4 mb-4">
      <div className="flex justify-between gap-4 items-center w-full py-2">
        <h1 className="text-2xl lg:text-4xl font-black my-2">Task Manager</h1>
        <button
          onClick={handleLogOut}
          className="px-2 py-1 lg:px-4 lg:py-2 border hover:border-gray-800 hover:text-white hover:bg-gray-900 transition duration-300 rounded-md font-bold"
        >
          Log Out
        </button>
      </div>
      {/* input  */}
      <div className="lg:w-6/12 relative">
        <form onSubmit={addTask}>
          <input
            type="text"
            name="task"
            placeholder="Add New Task"
            required
            className="border bg-transparent border-border py-3 pl-4 pr-[115px] outline-none w-full rounded-md"
          />

          <button className="bg-gray-950 text-white absolute top-0 right-0 h-full px-5 flex items-center justify-center rounded-r-md cursor-pointer hover:bg-gray-700 group">
            Add Task
          </button>
        </form>
      </div>
      {/* all tasks */}
      <AllTasks tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default TasksPage;
