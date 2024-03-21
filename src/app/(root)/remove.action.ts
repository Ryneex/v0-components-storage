"use server";
import fs from "fs-extra";

export default async function removeComponent(id: string) {
    const path = `./src/app/components/${id}`;
    const addedComponents = getAddedComponents();
    const removedComponents = getRemovedComponents();
    fs.writeFileSync("./public/data.json", JSON.stringify(addedComponents.filter((e: any) => e.id !== id)));
    fs.writeFileSync("./public/removed.json", JSON.stringify([id, ...removedComponents]));
    fs.remove(path);
}

function getAddedComponents() {
    try {
        const json = fs.readFileSync("./public/data.json", "utf8");
        const data = JSON.parse(json);
        return data;
    } catch (error) {
        return [];
    }
}

function getRemovedComponents() {
    try {
        const json = fs.readFileSync("./public/removed.json", "utf8");
        const data = JSON.parse(json);
        return data;
    } catch (error) {
        return [];
    }
}
