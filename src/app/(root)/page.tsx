import React from "react";
import fs from "fs";
import Card from "./Card";
import { Toaster } from "react-hot-toast";
import AddNewForm from "./AddNewForm";

function parseJson(json: string) {
    try {
        const obj = JSON.parse(json);
        return obj;
    } catch (error) {
        return [];
    }
}

export default function page() {
    const json = fs.readFileSync("./public/data.json", "utf8");
    const data = parseJson(json);
    return (
        <div>
            <Toaster />
            {process.env.NODE_ENV === "development" && <AddNewForm />}
            <h1 className="p-5 text-xl font-bold text-black/70">Available Components</h1>
            {data.length === 0 && <div className="px-5 text-black/50 font-medium">You haven't added any components</div>}
            <div className="flex flex-wrap px-5 gap-5">
                {data.map((data: any, i: any) => (
                    <Card key={i} data={data} />
                ))}
            </div>
        </div>
    );
}
