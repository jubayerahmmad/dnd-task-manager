/* eslint-disable react/prop-types */
import { useState } from "react";
import TaskCard from "./TaskCard";
import axios from "axios";
import toast from "react-hot-toast";
import {
  closestCorners,
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import DroppableColumn from "./DroppableColumn";

const categories = [
  { categoryId: "todo", title: "To-Do" },
  { categoryId: "In Progress", title: "In Progress" },
  { categoryId: "Done", title: "Done" },
];

const AllTasks = ({ tasks, setTasks }) => {
  const [activeTask, setActiveTask] = useState(null);
  // console.log(activeTask);

  // sensorts
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 250, tolerance: 5 },
    })
  );

  // handle drag start
  const onDragStart = (event) => {
    // console.log(event);
    setActiveTask(event.active.data.current);
  };

  // handle drag end
  const onDragEnd = async (event) => {
    setActiveTask(null);
    const { active, over } = event;
    const draggedTaskId = active.id;
    const draggedCategory = over.id;

    if (draggedTaskId === draggedCategory) return;

    //updating the ui
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task._id === draggedTaskId
          ? { ...task, category: draggedCategory }
          : task
      )
    );

    // updating category on mongodb
    const { data } = await axios.patch(
      `https://task-server-pi-nine.vercel.app/update-category/${draggedTaskId}`,
      {
        category: draggedCategory,
      }
    );
    if (data.modifiedCount) {
      toast.success(`Task Moved to ${draggedCategory}`);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 w-full mt-4">
        {categories.map(({ categoryId, title }) => (
          <DroppableColumn key={categoryId} id={categoryId} title={title}>
            <SortableContext
              items={tasks.filter((task) => task.category === categoryId)}
            >
              {tasks
                .filter((task) => task.category === categoryId)
                .map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    tasks={tasks}
                    setTasks={setTasks}
                  />
                ))}
            </SortableContext>
          </DroppableColumn>
        ))}
      </div>
      <DragOverlay>{activeTask && <TaskCard task={activeTask} />}</DragOverlay>
    </DndContext>
  );
};

export default AllTasks;
