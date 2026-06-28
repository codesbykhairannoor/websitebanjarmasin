const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      if (file.endsWith('.jsx')) results.push(file);
    }
  });
  return results;
}

const files = walk('D:/banjarmasinkota/src');
let changed = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  // Add loading="lazy" if not present
  let newContent = content.replace(/<img(?![^>]*loading=)([^>]*)/g, '<img loading="lazy"$1');
  if (newContent !== content) {
    fs.writeFileSync(file, newContent, 'utf8');
    changed++;
  }
});

console.log('Added loading=lazy to ' + changed + ' files.');
