"use client";

import Link from "next/link";
import React from "react";
import { LuTrash } from "react-icons/lu";
import removeComponent from "./remove.action";
import { TiArrowRight } from "react-icons/ti";
import { FaRegCopy } from "react-icons/fa";
import toast from "react-hot-toast";

export default function Card({ data }) {
    function handleRemove() {
        removeComponent(data.id);
    }
    function handleCopy() {
        navigator.clipboard.writeText(data.code);
        toast.success("Code copied to clipboard", {
            className: "!bg-slate-800 !text-white"
        })
    }
    return (
        <div className="p-5 border relative rounded-md border-slate-300">
            <div onClick={handleCopy} className="absolute top-2 left-2 z-10 rounded-full h-7 aspect-square select-none flex items-center justify-center cursor-pointer bg-slate-800 text-white">
                <FaRegCopy />
            </div>
            <div onClick={handleRemove} className="absolute top-2 right-2 z-10 rounded-full h-7 aspect-square select-none flex items-center justify-center cursor-pointer bg-red-400 text-white">
                <LuTrash />
            </div>
            <div className="w-[410px] h-[230px] relative overflow-hidden">
                <iframe className="absolute pointer-events-none origin-top-left scale-[0.4] aspect-video" src={`/components/${data.id}`} title="Generated UI from the prompt" style={{ width: 1024 }}></iframe>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-black/70 text-sm">ID : {data.id}</span>
                <Link className="text-sm text-blue-600 flex items-center gap-1" href={`/components/${data.id}`}>
                    Visit <TiArrowRight className="text-2xl" />
                </Link>
            </div>
        </div>
    );
}
