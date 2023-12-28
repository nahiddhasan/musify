"use client";
import { useOptimistic } from "react";
const Test = () => {
  const data = "logg";
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    data,
    (state, messege) => [
      ...state,
      {
        messege,
      },
    ]
  );

  return <div>Test</div>;
};

export default Test;
