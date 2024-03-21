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
            <AddNewForm />
            <div className="flex flex-wrap px-5 gap-5">
                {data.map((data: any, i: any) => (
                    <Card key={i} data={data} />
                ))}
            </div>
        </div>
    );
}
