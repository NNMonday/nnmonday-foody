import React from "react";
import { useParams } from "react-router-dom";

export default function DishDetail() {
  const { id } = useParams();
  return <div>DishDetail {id}</div>;
}
