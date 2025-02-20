import { useNavigate, useParams } from "react-router";
import Nav from "../Nav";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateTask = () => {
  const { id } = useParams();
  const [singleTask, setSingleTask] = useState({});
  console.log(singleTask);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSingleTask = async () => {
      const { data } = await axios(`http://localhost:5000/tasks/${id}`);
      setSingleTask(data);
    };
    fetchSingleTask();
  }, [id]);

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    const taskName = e.target.task.value;
    const taskDesc = e.target.description.value;
    try {
      const { data } = await axios.put(
        `https://task-server-pi-nine.vercel.app/tasks/${id}`,
        {
          task: taskName,
          description: taskDesc,
          createdAt: singleTask.createdAt,
          category: setSingleTask.category,
        }
      );
      if (data.modifiedCount) {
        toast.success("Task Updated");
        console.log(data);
        navigate("/tasks");
        e.target.reset();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center flex-col max-w-7xl mx-auto px-4 mb-4">
      <Nav />

      <h1 className="text-2xl font-bold text-center text-gray-200 my-4">
        Update <span className="text-white">{singleTask.task}</span> Task
        Details
      </h1>
      {/* update form */}
      <div className="lg:w-6/12 p-4 border border-gray-500 rounded-md">
        <form onSubmit={handleUpdateTask} className="space-y-2">
          <input
            type="text"
            name="task"
            placeholder="Add New Task"
            defaultValue={singleTask.task}
            required
            className="border border-gray-500 bg-transparent py-2 px-4 text-white outline-none w-full rounded-md"
          />
          <textarea
            name="description"
            placeholder="Add Task Description"
            defaultValue={singleTask.description}
            rows={3}
            required
            className="border border-gray-500 bg-transparent py-2 px-4 text-white outline-none w-full rounded-md"
          />

          <button className="bg-gray-50 text-black px-4 py-1 flex items-center justify-center rounded-md cursor-pointer hover:bg-gray-200 group">
            Update Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateTask;
