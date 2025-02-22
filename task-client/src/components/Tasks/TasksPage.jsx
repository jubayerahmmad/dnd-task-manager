/* eslint-disable react/prop-types */
import axios from "axios";
import toast from "react-hot-toast";
import AllTasks from "./AllTasks";
import { useEffect, useState } from "react";
import Nav from "../Nav";
import Form from "../Form";

const TasksPage = ({ user }) => {
  // console.log("from task page", user);
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
          userId: user?.uid,
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

      <Form addTask={addTask} />
      {/* all tasks */}
      {tasks?.length > 0 ? (
        <AllTasks tasks={tasks} setTasks={setTasks} />
      ) : (
        <p className="text-center font-bold text-white text-3xl mt-12">
          No Tasks Added
        </p>
      )}
    </div>
  );
};

export default TasksPage;
