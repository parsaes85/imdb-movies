import React from "react";

export default function RefreshMessage() {
  return (
    <div className="flex flex-col items-center gap-2">
      <h1 className="text-xl">Can't get data. Please Refresh</h1>
      <button
        className="bg-movieBg py-2 px-8 rounded-lg"
        onClick={() => window.location.reload()}
      >
        Refresh
      </button>
    </div>
  );
}
