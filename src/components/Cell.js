import React from "react";
import "./cell.css";

function Cell({ updateCells, ind, clsName, setVisible }) {
  const handleCellClick = () => {
    setVisible(true);
    updateCells(ind);
  };

  return (
    <div className="cell" onClick={handleCellClick}>
      {clsName && <span className={clsName}></span>}
    </div>
  );
}

export default Cell;
