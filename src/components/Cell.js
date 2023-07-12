import React from "react";

function Cell({ handleUpdate, index, clsName }) {
  const handleCellClick = () => {
    handleUpdate(index);
  };

  return (
    <div className="cell">{clsName && <span className={clsName}></span>}</div>
  );
}

export default Cell;
