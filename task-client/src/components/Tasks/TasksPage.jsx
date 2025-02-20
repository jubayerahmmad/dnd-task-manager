import axios from "axios";
import toast from "react-hot-toast";
import AllTasks from "./AllTasks";
import { useEffect, useState } from "react";
import Nav from "../Nav";

const TasksPage = () => {
  const [tasks, setTasks] = useState([]);

  // fetch tasks
  const getData = async () => {
    const { data } = await axios(
      "https://task-server-pi-nine.vercel.app/tasks"
    );
    setTasks(data);
  };

  useEffect(() => {
    getData();
  }, [setTasks]);

  const addTask = async (e) => {
    e.preventDefault();
    const taskName = e.target.task.value;
    const taskDesc = e.target.description.value;
    try {
      const { data } = await axios.post(
        "https://task-server-pi-nine.vercel.app/tasks",
        {
          task: taskName,
          description: taskDesc,
        }
      );
      toast.success("Task Added");
      console.log(data);
      getData();
      e.target.reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col max-w-7xl mx-auto px-4 mb-4">
      <Nav />
      {/* input  */}
      <div className="lg:w-6/12 p-4 border border-gray-500 rounded-md">
        <form onSubmit={addTask} className="space-y-2 ">
          <input
            type="text"
            name="task"
            placeholder="Add New Task"
            required
            className="border border-gray-500 bg-transparent py-2 px-4 text-white outline-none w-full rounded-md"
          />
          <textarea
            name="description"
            placeholder="Add Task Description"
            rows={3}
            required
            className="border border-gray-500 bg-transparent py-2 px-4 text-white outline-none w-full rounded-md"
          />

          <button className="bg-gray-50 text-black px-4 py-1 flex items-center justify-center rounded-md cursor-pointer hover:bg-gray-200 group">
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
