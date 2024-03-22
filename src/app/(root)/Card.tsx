"use client";

import Link from "next/link";
import React from "react";
import { LuTrash } from "react-icons/lu";
import removeComponent from "../actions/remove.action";
import { TiArrowRight } from "react-icons/ti";
import { FaRegCopy } from "react-icons/fa";
import toast from "react-hot-toast";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";

export default function Card({ data }) {
    const router = useRouter();
    async function handleRemove() {
        const promise = new Promise(async (resolve, reject) => {
            const res: any = await removeComponent(data.id);
            if (res.success) {
                resolve(res);
                router.refresh();
            } else {
                reject(res);
            }
        });
        toast.promise(
            promise,
            {
                loading: "Processing your request...",
                success: (data: any) => data.message,
                error: (data: any) => data.message,
            },
            {
                className: "!bg-slate-800 !text-white",
            }
        );
    }
    function handleCopy() {
        navigator.clipboard.writeText(data.code);
        toast.success("Code copied to clipboard", {
            className: "!bg-slate-800 !text-white",
        });
    }
    return (
        <div className="p-5 border relative rounded-md border-slate-300">
            <TooltipProvider delayDuration={0.2}>
                <Tooltip>
                    <TooltipTrigger onClick={handleCopy} className="absolute top-2 left-2 z-10 rounded-full h-7 aspect-square select-none flex items-center justify-center cursor-pointer bg-slate-800 text-white">
                        <FaRegCopy />
                    </TooltipTrigger>
                    <TooltipContent>Copy to Clipboard</TooltipContent>
                </Tooltip>
                {process.env.NODE_ENV === "development" && (
                    <Tooltip>
                        <TooltipTrigger onClick={handleRemove} className="absolute top-2 right-2 z-10 rounded-full h-7 aspect-square select-none flex items-center justify-center cursor-pointer bg-red-400 text-white">
                            <LuTrash />
                        </TooltipTrigger>
                        <TooltipContent>Delete</TooltipContent>
                    </Tooltip>
                )}
            </TooltipProvider>
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
