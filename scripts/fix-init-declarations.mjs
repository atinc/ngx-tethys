#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const SKIP_DIRS = new Set(['node_modules', 'dist', '.git', 'coverage', '.angular', '.tmp']);

async function main() {
  const targets = process.argv.slice(2);
  const roots = targets.length ? targets.map(p => path.resolve(ROOT, p)) : [ROOT];
  for (const root of roots) {
    await walkAndFix(root);
  }
}

async function walkAndFix(currentPath) {
  const stat = await fs.promises.lstat(currentPath);
  if (stat.isDirectory()) {
    const base = path.basename(currentPath);
    if (SKIP_DIRS.has(base)) return;
    const entries = await fs.promises.readdir(currentPath);
    await Promise.all(entries.map(entry => walkAndFix(path.join(currentPath, entry))));
    return;
  }
  if (!currentPath.endsWith('.ts') || currentPath.endsWith('.d.ts')) return;

  const original = await fs.promises.readFile(currentPath, 'utf8');
  const updated = transformContent(original);
  if (updated !== original) {
    await fs.promises.writeFile(currentPath, updated, 'utf8');
    console.log(`Fixed: ${path.relative(ROOT, currentPath)}`);
  }
}

function transformContent(source) {
  // Change standalone let declarations with a type annotation and no initializer.
  // Example: let x: Type; => let x: Type | undefined = undefined;
  return source.replace(
    /(^|\n)([\t ]*)let[\t ]+([A-Za-z_$][\w$]*)[\t ]*:[\t ]*([^=;\n]+?)[\t ]*;[\t ]*(?=\n|$)/g,
    (m, lb, indent, name, type) => {
      const hasUndefinedInType = /\bundefined\b/.test(type);
      const normalizedType = type.replace(/[\t ]+/g, ' ').trim();
      
      // Handle complex types more carefully
      if (hasUndefinedInType) {
        return `${lb}${indent}let ${name}: ${normalizedType} = undefined;`;
      }
      
      // For complex types like {isHorizontal: boolean}, ensure proper union syntax
      if (normalizedType.includes('{') || normalizedType.includes('<') || normalizedType.includes('|')) {
        return `${lb}${indent}let ${name}: ${normalizedType} | undefined = undefined;`;
      }
      
      return `${lb}${indent}let ${name}: ${normalizedType} | undefined = undefined;`;
    }
  );
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
