"use server";
import fs from "fs-extra";

export default async function removeComponent(id: string) {
    try {
        const path = `./src/app/components/${id}`;
        const addedComponents = getAddedComponents();
        const removedComponents = getRemovedComponents();
        await fs.writeFile("./public/data.json", JSON.stringify(addedComponents.filter((e: any) => e.id !== id)));
        await fs.createFile("./public/removed.json");
        await fs.writeFile("./public/removed.json", JSON.stringify([id, ...removedComponents]));
        fs.remove(path);
        return { success: true, message: "Component removed successfully" };
    } catch (error: any) {
        return { success: false, message: error.message };
    }
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
