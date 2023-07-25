import React from "react";

const SearchBtn = () => {
  return (
    <div>
      <div style={{ border: "1ps solid black" }}>
        <input
          type="text"
          style={{
            height: "35px",
            width: "400px",
            borderRadius: "5px",
            margin: "5px",
            border: "1px solid rgb(204, 203, 203)",
            padding: "5px",
          }}
          placeholder="Search here"
        />
        <button
          type="submit"
          style={{
            border: "none",
            backgroundColor: "blue",
            color: "white",
            width: "70px",
            height: "30px",
            borderRadius: "5px",
            fontSize: "15px",
            cursor: "pointer",
          }}
        >
          search
        </button>
      </div>
    </div>
  );
};
export default SearchBtn;
