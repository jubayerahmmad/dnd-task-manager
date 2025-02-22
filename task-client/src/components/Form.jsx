import { useLocation } from "react-router";

/* eslint-disable react/prop-types */
const Form = ({ handleUpdateTask, addTask, singleTask, taskDesc }) => {
  const { pathname } = useLocation();
  return (
    <div className="lg:w-6/12 p-4 border border-gray-500 rounded-md">
      <form
        onSubmit={handleUpdateTask ? handleUpdateTask : addTask}
        className="space-y-2 "
      >
        <input
          type="text"
          name="task"
          placeholder="Add New Task"
          defaultValue={singleTask && singleTask}
          max={50}
          required
          className="border border-gray-500 bg-transparent py-2 px-4 text-white outline-none w-full rounded-md"
        />
        <textarea
          name="description"
          placeholder="Task Description"
          rows={3}
          defaultValue={taskDesc && taskDesc}
          max={200}
          required
          className="border border-gray-500 bg-transparent py-2 px-4 text-white outline-none w-full rounded-md"
        />

        <button className="bg-blue-500 text-white px-4 py-1 flex items-center justify-center rounded-md cursor-pointer hover:bg-blue-700 group">
          {pathname === "/tasks" ? "Add Task" : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default Form;
