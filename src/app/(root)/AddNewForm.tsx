"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import addNewComponent from "./add.action";
import toast from "react-hot-toast";

export default function AddNewForm() {
    function handleSubmit(e) {
        e.preventDefault();
        const value: string = e.target[0].value.trim();
        const id = value.includes(" ") ? value?.slice(value.lastIndexOf(" ")).trim() : value;
        const promise = new Promise(async (resolve, reject) => {
            const data: any = await addNewComponent(id);
            if (data.success) {
                resolve(data);
            } else {
                reject(data);
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
    return (
        <div className="m-5">
            <span className="font-medium text-black/80 mb-2 block">Add a new Component</span>
            <form onSubmit={handleSubmit} className="flex gap-5">
                <Input name="id" placeholder="ID of component" className="max-w-md" />
                <Button type="submit">Add</Button>
            </form>
        </div>
    );
}
