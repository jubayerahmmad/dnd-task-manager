/* eslint-disable react/prop-types */
import { useDraggable } from "@dnd-kit/core";
import axios from "axios";
import toast from "react-hot-toast";
import { MdDelete, MdEdit } from "react-icons/md";
import { Link } from "react-router";

const TaskCard = ({ task, tasks, setTasks }) => {
  // const { attributes, listeners, setNodeRef, transform, transition } =
  //   useSortable({
  //     id: task._id,
  //     data: { ...task },
  //   }); // not working
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: task._id,
    data: { ...task },
  });

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://task-server-pi-nine.vercel.app/tasks/${id}`
      );
      if (data.deletedCount) {
        toast.success("Task Deleted");
        const remaining = tasks.filter((singleTask) => singleTask._id !== id);
        setTasks(remaining);
      }
      // console.log(data);
    } catch (error) {
      toast.error("Failed to delete task");
      console.error(error);
    }
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`my-2 p-4 border  shadow-2xs  text-xl  text-white duration-300 touch-none cursor-grabbing rounded-xl space-y-4 ${
        task.category === "Done"
          ? "bg-green-950 border-green-500 shadow-green-500"
          : "bg-gray-900 border-gray-500 shadow-white"
      }`}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{task.task}</h3>
        <div className="flex gap-3 items-center">
          <button onClick={() => handleDelete(task._id)}>
            <MdDelete color="red" />
          </button>

          <Link to={`/update-task/${task._id}`}>
            <button>
              <MdEdit color="white" />
            </button>
          </Link>
        </div>
      </div>
      <p className="font-light text-base text-gray-400">
        {task.description && task.description}
      </p>
      <p className="font-light text-xs text-gray-400 flex justify-end">
        <span className="font-bold text-gray-300">Created: </span>{" "}
        {task?.createdAt?.split("T")[0]}
      </p>
    </div>
  );
};

export default TaskCard;
