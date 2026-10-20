// Enforces the one-way dependency rule: web → engine → data.
import { Glob } from 'bun';

const rules: Record<string, { imports: RegExp[]; globals?: RegExp }> = {
  data: { imports: [/^@lml\/engine/, /^@lml\/web/, /^preact/, /^@preact\//] },
  engine: { imports: [/^@lml\/web/, /^preact/, /^@preact\//], globals: /\b(document|window)\b/ },
};

const importRe = /(?:import|export)\s[^'"]*?from\s*['"]([^'"]+)['"]|import\s*\(?\s*['"]([^'"]+)['"]/g;
const errors: string[] = [];

for (const [pkg, rule] of Object.entries(rules)) {
  for await (const file of new Glob(`packages/${pkg}/src/**/*.{ts,tsx}`).scan('.')) {
    const src = await Bun.file(file).text();
    for (const m of src.matchAll(importRe)) {
      const spec = m[1] ?? m[2] ?? '';
      if (rule.imports.some((r) => r.test(spec))) errors.push(`${file}: forbidden import ${spec}`);
    }
    if (rule.globals) {
      const code = src.replace(/\/\/.*$|\/\*[\s\S]*?\*\//gm, '');
      const hit = code.match(rule.globals);
      if (hit) errors.push(`${file}: forbidden global ${hit[0]}`);
    }
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('check-deps: ok');
