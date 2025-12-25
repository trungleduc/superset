const fs = require("fs");
const path = require("path");

const manifestPath = path.join(__dirname, "../static/assets/manifest.json");
const templatePath = path.join(__dirname, "../index.template.html");
const outputPath = path.join(__dirname, "../index.html");
const bootstrapPath = path.join(__dirname, "./bootstrap.json");
// Read files
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
const htmlTemplate = fs.readFileSync(templatePath, "utf-8");
const bootstrapData  = JSON.parse(fs.readFileSync(bootstrapPath, "utf-8"));
const bootstrapString = JSON.stringify(bootstrapData)
  .replace(/&/g, "&amp;")
  .replace(/"/g, "&quot;")
  .replace(/</g, "&lt;")
  .replace(/>/g, "&gt;");
// Collect JS assets (deduplicated)
const jsAssets = new Set();

for (const entrypoint of Object.values(manifest.entrypoints)) {
  for (const js of entrypoint.js || []) {
    jsAssets.add(js);
  }
}

// Generate <script> tags
const scriptTags = Array.from(jsAssets)
  .map((src) => `       <script src=".${src}"></script>`)
  .join("\n");

// Replace placeholder
const finalHtml = htmlTemplate
  .replace("{{JS_ASSETS}}", scriptTags)
  .replace("{{BOOTSTRAP}}", bootstrapString );

// Write output
fs.writeFileSync(outputPath, finalHtml);

console.log("index.html generated successfully");
