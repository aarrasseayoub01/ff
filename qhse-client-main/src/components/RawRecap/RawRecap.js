import React from "react";
import "./RawRecap.css";
import { useNavigate } from "react-router-dom";

export default function Organism(props) {
  const navigate = useNavigate();

  const handleRaw = async (e) => {
    navigate("/raw/" + e.target.id);
  };
  const handleProd = async () => {
    navigate("/product/" + props.prod._id);
  };
  const raws = props.prod.raw.map((x) => {
    return (
      <td onClick={handleRaw} id={x} key={x}>
        {x}
      </td>
    );
  });

  return (
    <tr className="sortable">
      <td onClick={handleProd} key={props.prod._id}>
        {props.prod.name}
      </td>
      {raws}
    </tr>
  );
}
