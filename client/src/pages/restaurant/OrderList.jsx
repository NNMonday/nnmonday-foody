import React, { useEffect } from "react";
import AxiosInstance from "../../configs/axios.config";

export default function OrderList() {
  useEffect(() => {
    (async () => {
      try {
        const res = await AxiosInstance.get("/api/orders");
        console.log(res);
      } catch (error) {}
    })();
  }, []);
  return <div>OrderList</div>;
}
