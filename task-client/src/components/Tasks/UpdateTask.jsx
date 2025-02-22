import { useNavigate, useParams } from "react-router";
import Nav from "../Nav";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Form from "../Form";

const UpdateTask = () => {
  const { id } = useParams();
  const [singleTask, setSingleTask] = useState({});
  // console.log(singleTask);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSingleTask = async () => {
      const { data } = await axios(
        `https://task-server-pi-nine.vercel.app/tasks/${id}`
      );
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
      if (data.modifiedCount > 0) {
        toast.success("Task Updated");
        // console.log(data);
        navigate("/tasks");
        e.target.reset();
      } else {
        toast.error("You Didn't Change Anything");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex justify-center items-center flex-col max-w-7xl mx-auto px-4 mb-4">
      <Nav />

      <div className="flex items-center justify-between w-full lg:w-6/12 mx-auto">
        <button
          className="text-blue-500 px-3 py-1 border border-blue-500 rounded-md"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        <h1 className="text-2xl font-bold text-center text-gray-200 my-4">
          Update Task Details
        </h1>
        <p></p>
      </div>
      {/* update form */}
      <Form
        handleUpdateTask={handleUpdateTask}
        singleTask={singleTask.task}
        taskDesc={singleTask.description}
      />
    </div>
  );
};

export default UpdateTask;
