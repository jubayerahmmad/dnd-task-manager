import axios from "axios";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";

const TaskCard = ({ task, tasks, setTasks }) => {
  const handleDelete = async (id) => {
    const { data } = await axios.delete(`http://localhost:5000/tasks/${id}`);
    if (data.deletedCount) {
      toast.success("Task Deleted");
      const remaining = tasks.filter((singleTask) => singleTask._id !== id);
      setTasks(remaining);
    }
    console.log(data);
  };
  return (
    <div className="flex items-center justify-between p-2 bg-gray-100 font-semibold text-xl hover:bg-gray-700 hover:text-white duration-300">
      <p>{task.task}</p>
      <button
        onClick={() => handleDelete(task._id)}
        className="px-2 py-1 border rounded-md"
      >
        <MdDelete />
      </button>
    </div>
  );
};

TaskCard.propTypes = {
  task: PropTypes.shape({
    task: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
  }).isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      task: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
    })
  ).isRequired,
  setTasks: PropTypes.func.isRequired,
};

export default TaskCard;
