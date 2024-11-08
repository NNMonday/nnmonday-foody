import React from "react";
import { useParams } from "react-router-dom";

export default function RestaurantDetail() {
  const { id } = useParams();
  return <div>RestaurantDetail {id}</div>;
}
