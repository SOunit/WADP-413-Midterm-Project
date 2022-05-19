import * as shell from "shelljs";

// Typescript With EJS
// https://www.youtube.com/watch?v=JtIEhYpl-WE

// copy all view templates
shell.cp("-R", "src/views", "dist/");
