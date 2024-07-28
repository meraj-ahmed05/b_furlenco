"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Spinner = ({ title }) => {
  const [count, setCount] = useState(3);
  const router = useRouter();

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (!count) {
        router.push("/");
      } else {
        setCount(count - 1);
      }
    }, 1000);

    return () => clearTimeout(timeOut);
  }, [count]);

  return (
    <div className="flex flex-col items-center gap-2 py-6 text-center text-3xl font-semibold">
      <h3>{title || "Error 404. Page Not Found"}</h3>
      <div className="h-[40px] w-[40px] animate-spin rounded-full border-2 border-l-0 border-t-0 border-black p-4" />
      <h2>Redirecting...</h2>
    </div>
  );
};

export default Spinner;
