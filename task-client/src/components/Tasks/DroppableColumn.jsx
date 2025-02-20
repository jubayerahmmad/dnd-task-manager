import { useDroppable } from "@dnd-kit/core";
import { FcTodoList } from "react-icons/fc";
import { GiCheckMark } from "react-icons/gi";
import { GrInProgress } from "react-icons/gr";

// eslint-disable-next-line react/prop-types
const DroppableColumn = ({ id, title, children }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className="border bg-gray-900 rounded-xl p-4">
      <h1 className="font-bold rounded-t-xl text-2xl text-white p-2 flex items-center gap-1">
        {title}
        {title === "Done" && <GiCheckMark color="green" />}
        {title === "In Progress" && <GrInProgress color="orange" />}
        {title === "To-Do" && <FcTodoList />}
      </h1>
      {/* task card as children */}
      <div className="p-2 rounded-b-xl">{children}</div>
    </div>
  );
};

export default DroppableColumn;
