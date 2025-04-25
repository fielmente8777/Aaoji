import Link from "next/link";
import React from "react";
import { IoCall } from "react-icons/io5";

function Call({ callNumber }: { callNumber: string }) {
  return (
    <div className="fixed bottom-10 lg:left-3  left-4 z-20 cursor-pointer">
      <Link
        href={`tel:+ ${callNumber ? callNumber : "919599799429"} `}
        target="_blank"
        rel="noreferrer"
        className="w-12 h-12 rounded-full flex items-center justify-center bg-primary hover:bg-primary/95 hover:shadow-2xl transition-all"
      >
        <IoCall size={29} color="white" />
        <span className="sr-only">call</span>
      </Link>
    </div>
  );
}

export default Call;
