import React from "react";
import { LoadingIndicator } from "../../components";

export default function SpinningPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <LoadingIndicator />
    </div>
  );
}
