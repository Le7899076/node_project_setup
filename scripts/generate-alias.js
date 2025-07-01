"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const jsonc_parser_1 = require("jsonc-parser");
const isProd = process.argv.includes('--prod');
const baseDir = isProd ? 'dist' : 'src';
const tsconfigPath = path_1.default.resolve('tsconfig.json');
const pkgPath = path_1.default.resolve('package.json');
const aliasTsPath = path_1.default.resolve('src/alias.ts');
const aliasJsonPath = path_1.default.resolve('alias.json');
// Parse tsconfig.json using jsonc-parser
const tsconfigRaw = fs_1.default.readFileSync(tsconfigPath, 'utf-8');
const tsconfig = (0, jsonc_parser_1.parse)(tsconfigRaw);
const paths = tsconfig?.compilerOptions?.paths ?? {};
const baseUrl = tsconfig?.compilerOptions?.baseUrl ?? 'src';
// Load package.json
const packageJson = JSON.parse(fs_1.default.readFileSync(pkgPath, 'utf-8'));
// Output maps
const aliasMap = {};
const aliasTsLines = [
    `import { addAlias } from 'module-alias';`,
    `import path from 'path';`,
    `const basePath = path.resolve(__dirname);`
];
// Loop through tsconfig paths
for (const [key, value] of Object.entries(paths)) {
    if (!value.length)
        continue;
    const alias = key.replace(/\/\*$/, '');
    const targetPath = value[0]
        .replace(/\/\*$/, '')
        .replace(/^\.?\/*(src|dist)\//, ''); // ✨ removes leading src/ or dist/
    const finalPath = `${baseDir}/${targetPath}`.replace(/\\/g, '/').replace(/\/+$/, '');
    aliasMap[alias] = finalPath;
    aliasTsLines.push(`addAlias('${alias}', path.join(basePath, '${targetPath}'));`);
}
// Write alias.ts
fs_1.default.writeFileSync(aliasTsPath, aliasTsLines.join('\n') + '\n', 'utf-8');
// Inject _moduleAliases into package.json
packageJson._moduleAliases = aliasMap;
fs_1.default.writeFileSync(pkgPath, JSON.stringify(packageJson, null, 2), 'utf-8');
// Write alias.json
fs_1.default.writeFileSync(aliasJsonPath, JSON.stringify(aliasMap, null, 2), 'utf-8');
console.log(`✅ Generated:
- ${aliasTsPath}
- _moduleAliases in package.json
- ${aliasJsonPath}`);
