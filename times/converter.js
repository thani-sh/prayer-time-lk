import { writeFileSync } from "node:fs";
import colomboTimes from "./colombo.js";

const data = JSON.stringify(colomboTimes, null, 2);
writeFileSync("colombo.json", data);
