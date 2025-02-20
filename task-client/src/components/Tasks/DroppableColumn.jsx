import { useDroppable } from "@dnd-kit/core";

// eslint-disable-next-line react/prop-types
const DroppableColumn = ({ id, title, children }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className="border bg-gray-900 rounded-xl p-4">
      <h1 className="font-bold rounded-t-xl text-2xl text-white p-2">
        {title}
      </h1>
      {/* task card as children */}
      <div className="p-2 rounded-b-xl">{children}</div>
    </div>
  );
};

export default DroppableColumn;
