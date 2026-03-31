import { dom } from "./ui/dom.js";
import { BlockchainApp } from "./BlockchainApp.js";

// Create and start the application.
const app = new BlockchainApp(dom);
app.initialize();
