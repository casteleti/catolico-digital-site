// Faz o Node resolver o alias "@/…" (src/…) do tsconfig, só para os testes unitários.
import { register } from "node:module";
register("./alias-hooks.mjs", import.meta.url);
