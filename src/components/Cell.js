import React from "react";
import "./cell.css";

function Cell({ updateCells, ind, clsName }) {
  const handleCellClick = () => {
    updateCells(ind);
  };

  return (
    <div className="cell" onClick={handleCellClick}>
      {clsName && <span className={clsName}></span>}
    </div>
  );
}

export default Cell;
