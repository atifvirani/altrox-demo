import fs from 'fs';
import path from 'path';

console.log('========================================================');
console.log('ALTROX STUDIO — PRODUCTION VERIFICATION TEST SUITE');
console.log('========================================================\n');

let passedTests = 0;
let totalTests = 0;

function assert(condition, testName) {
  totalTests++;
  if (condition) {
    console.log(`[PASS] ${testName}`);
    passedTests++;
  } else {
    console.error(`[FAIL] ${testName}`);
  }
}

// 1. Verify REA Presence & Integrity
const candidateReaPaths = [
  path.resolve(process.cwd(), 'rea-main/rea-main'),
  path.resolve(process.cwd(), '../rea-main/rea-main'),
];
const reaPath = candidateReaPaths.find(p => fs.existsSync(p)) || candidateReaPaths[0];
assert(fs.existsSync(reaPath), 'Existing REA repository is present and detected (rea-main/rea-main)');

const reaPkgPath = path.join(reaPath, 'package.json');
assert(fs.existsSync(reaPkgPath), 'REA package.json exists and is intact');
if (fs.existsSync(reaPkgPath)) {
  const pkg = JSON.parse(fs.readFileSync(reaPkgPath, 'utf8'));
  assert(pkg.name === 'rea-agents', 'REA package identifier verified as rea-agents');
  assert(pkg.version === '6.7.0', 'REA version verified as 6.7.0');
}

const reaScriptPath = path.join(reaPath, 'scripts', 'rea.mjs');
assert(fs.existsSync(reaScriptPath), 'REA CLI executable scripts/rea.mjs is present');

// 2. Verify Generated 3D Asset Files
const assetsDir = path.resolve(process.cwd(), 'public', 'assets');
assert(fs.existsSync(path.join(assetsDir, 'altrox-character.jpg')), 'Altrox 3D character asset exists');
assert(fs.existsSync(path.join(assetsDir, 'thamos-character.jpg')), 'Thamos 3D character asset exists');
assert(fs.existsSync(path.join(assetsDir, 'chutki-character.jpg')), 'Chutki 3D character asset exists');
assert(fs.existsSync(path.join(assetsDir, 'hero-3d-monolith.jpg')), 'Hero 3D monolith asset exists');

// 3. Verify Database Migration File
const migrationPath = path.resolve(process.cwd(), 'supabase', 'migrations', '20261020000000_init_altrox_schema.sql');
assert(fs.existsSync(migrationPath), 'Supabase versioned SQL migration file exists');
if (fs.existsSync(migrationPath)) {
  const sql = fs.readFileSync(migrationPath, 'utf8');
  assert(sql.includes('CREATE TABLE IF NOT EXISTS public.profiles'), 'Migration contains profiles table');
  assert(sql.includes('CREATE TABLE IF NOT EXISTS public.content'), 'Migration contains content table');
  assert(sql.includes('CREATE TABLE IF NOT EXISTS public.services'), 'Migration contains services table');
  assert(sql.includes('CREATE TABLE IF NOT EXISTS public.video_scripts'), 'Migration contains video_scripts table (Script Studio)');
  assert(sql.includes('CREATE TABLE IF NOT EXISTS public.contact_inquiries'), 'Migration contains contact_inquiries table');
}

// 4. Verify Next.js App Structure
assert(fs.existsSync(path.resolve(process.cwd(), 'src', 'app', 'page.tsx')), 'Homepage page.tsx exists');
assert(fs.existsSync(path.resolve(process.cwd(), 'src', 'app', 'services', 'page.tsx')), 'Services page exists');
assert(fs.existsSync(path.resolve(process.cwd(), 'src', 'app', 'services', '[slug]', 'page.tsx')), 'Service detail page exists');
assert(fs.existsSync(path.resolve(process.cwd(), 'src', 'app', 'portfolio', 'page.tsx')), 'Portfolio page exists');
assert(fs.existsSync(path.resolve(process.cwd(), 'src', 'app', 'portfolio', '[slug]', 'page.tsx')), 'Portfolio detail page exists');
assert(fs.existsSync(path.resolve(process.cwd(), 'src', 'app', 'content', 'page.tsx')), 'Content showcase page exists');
assert(fs.existsSync(path.resolve(process.cwd(), 'src', 'app', 'learning', 'page.tsx')), 'Learning catalogue page exists');
assert(fs.existsSync(path.resolve(process.cwd(), 'src', 'app', 'store', 'page.tsx')), 'Digital store page exists');
assert(fs.existsSync(path.resolve(process.cwd(), 'src', 'app', 'blog', 'page.tsx')), 'Blog insights page exists');
assert(fs.existsSync(path.resolve(process.cwd(), 'src', 'app', 'admin', 'page.tsx')), 'Control Room CMS page exists');
assert(fs.existsSync(path.resolve(process.cwd(), 'src', 'app', 'sitemap.ts')), 'Sitemap generator exists');
assert(fs.existsSync(path.resolve(process.cwd(), 'src', 'app', 'robots.ts')), 'Robots.txt generator exists');

console.log(`\n========================================================`);
console.log(`TEST SUMMARY: ${passedTests}/${totalTests} TESTS PASSED`);
console.log(`========================================================`);

if (passedTests === totalTests) {
  process.exit(0);
} else {
  process.exit(1);
}
