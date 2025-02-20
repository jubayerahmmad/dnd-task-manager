import { useEffect, useState } from "react";
import TaskCard from "./TaskCard";
import axios from "axios";

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios("http://localhost:5000/tasks");
      setTasks(data);
    };

    getData();
  }, []);

  const todoTasks = tasks.filter((task) => task.category === "todo");
  const inProgressTasks = tasks.filter(
    (task) => task.category === "In Progress"
  );
  const doneTasks = tasks.filter((task) => task.category === "Done");
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 w-full mt-4">
      {/* todo */}
      <div className="border">
        <h1 className="text-center font-bold text-2xl bg-black text-white py-2">
          To-Do
        </h1>
        <div className="space-y-2">
          {todoTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              setTasks={setTasks}
              tasks={tasks}
            />
          ))}
        </div>
      </div>

      {/* In Progress */}
      <div className="border">
        <h1 className="text-center font-bold text-2xl bg-black text-white py-2">
          In Progress
        </h1>
        <div className="space-y-2">
          {inProgressTasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      </div>

      {/* Done */}
      <div className="border">
        <h1 className="text-center font-bold text-2xl bg-black text-white py-2">
          Done
        </h1>
        <div className="space-y-2">
          {doneTasks.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllTasks;
