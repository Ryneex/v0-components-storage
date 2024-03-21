"use server";

import { execSync } from "child_process";
import fs from "fs-extra";

export default async function addNewComponent(id: string) {
    const AddedComponents = getAddedComponents();
    const componentPath = "./src/components/component/component.tsx";
    const componentPagePath = `./src/app/components/${id}/page.tsx`;
    if (AddedComponents.some((e: any) => e.id === id)) return { success: false, message: "This component already exists" };
    try {
        execSync(`echo Component | npx v0 add ${id}`, { stdio: "inherit" });
        const fileCode = await fs.readFile(componentPath, "utf8");
        const code = contentCleanUp(fileCode);
        await fs.createFile(componentPagePath);
        await fs.writeFile(componentPagePath, code);
        await fs.remove(componentPath);
        addNewComponentToData({ id, code }, AddedComponents);
        return { success: true, message: "Component added successfully" };
    } catch (error) {
        return { success: false, message: "Something went wrong, could be invalid id" };
    }
}

function addNewComponentToData(data, AddedComponents) {
    fs.writeFile("./public/data.json", JSON.stringify([data, ...AddedComponents]));
}

function getAddedComponents(): object[] {
    try {
        const json = fs.readFileSync("./public/data.json", "utf8");
        const data = JSON.parse(json);
        return data;
    } catch (error) {
        return [];
    }
}

const replaces = [
    { from: "export function Component()", to: "export default function page()" },
    { from: 'variant="primary"', to: 'variant="default"' },
    { from: "value=", to: "defaultValue=" },
];

function contentCleanUp(code) {
    let newCode = code;
    replaces.forEach((e) => {
        newCode = newCode.replaceAll(e.from, e.to);
    });
    return newCode;
}
