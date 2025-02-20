import { useDroppable } from "@dnd-kit/core";

// eslint-disable-next-line react/prop-types
const DroppableColumn = ({ id, title, children }) => {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div ref={setNodeRef} className="border">
      <h1 className="text-center font-bold text-2xl bg-black text-white py-2">
        {title}
      </h1>
      {/* task card as children */}
      <div className="p-2">{children}</div>
    </div>
  );
};

export default DroppableColumn;
