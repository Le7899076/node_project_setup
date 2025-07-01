import fs from 'fs';
import path from 'path';
import { parse as parseJSONC } from 'jsonc-parser';

interface TsConfig {
  compilerOptions: {
    baseUrl?: string;
    paths?: Record<string, string[]>;
  };
}

const isProd = process.argv.includes('--prod');
const baseDir = isProd ? 'dist' : 'src';

const tsconfigPath = path.resolve('tsconfig.json');
const pkgPath = path.resolve('package.json');
const aliasTsPath = path.resolve('src/alias.ts');
const aliasJsonPath = path.resolve('alias.json');

// Parse tsconfig.json using jsonc-parser
const tsconfigRaw = fs.readFileSync(tsconfigPath, 'utf-8');
const tsconfig: TsConfig = parseJSONC(tsconfigRaw);
const paths = tsconfig?.compilerOptions?.paths ?? {};
const baseUrl = tsconfig?.compilerOptions?.baseUrl ?? 'src';

// Load package.json
const packageJson = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));

// Output maps
const aliasMap: Record<string, string> = {};
const aliasTsLines: string[] = [
  `import { addAlias } from 'module-alias';`,
  `import path from 'path';`,
  `const basePath = path.resolve(__dirname);`
];

// Loop through tsconfig paths
for (const [key, value] of Object.entries(paths)) {
  if (!value.length) continue;

  const alias = key.replace(/\/\*$/, '');
  const targetPath = value[0]
    .replace(/\/\*$/, '')
    .replace(/^\.?\/*(src|dist)\//, ''); // ✨ removes leading src/ or dist/

  const finalPath = `${baseDir}/${targetPath}`.replace(/\\/g, '/').replace(/\/+$/, '');
  aliasMap[alias] = finalPath;
  aliasTsLines.push(`addAlias('${alias}', path.join(basePath, '${targetPath}'));`);
}

// Write alias.ts
fs.writeFileSync(aliasTsPath, aliasTsLines.join('\n') + '\n', 'utf-8');

// Inject _moduleAliases into package.json
packageJson._moduleAliases = aliasMap;
fs.writeFileSync(pkgPath, JSON.stringify(packageJson, null, 2), 'utf-8');

// Write alias.json
fs.writeFileSync(aliasJsonPath, JSON.stringify(aliasMap, null, 2), 'utf-8');

console.log(`✅ Generated:
- ${aliasTsPath}
- _moduleAliases in package.json
- ${aliasJsonPath}`);
