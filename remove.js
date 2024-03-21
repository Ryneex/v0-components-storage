const fs = require("fs-extra");
fs.remove("./src/app/components");
const data = fs.readFileSync("./public/data.json", "utf8");
fs.createFileSync("./public/backup.json");
fs.writeFile("./public/backup.json", data);
fs.writeFile("./public/data.json", "");
