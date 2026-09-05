import fs from 'fs';
import path from 'path';

function parseCSVLine(line) {
  const result = [];
  let cur = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      if (inQuotes && line[i+1] === '"') {
        cur += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (c === ',' && !inQuotes) {
      result.push(cur);
      cur = '';
    } else {
      cur += c;
    }
  }
  result.push(cur);
  return result;
}

function parseCSV(content) {
  const lines = content.trim().split('\n');
  if (!lines.length) return { header: [], rows: [] };
  const header = parseCSVLine(lines[0].replace(/\r$/, ''));
  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const rawLine = lines[i].replace(/\r$/, '').trim();
    if (!rawLine) continue;
    const values = parseCSVLine(rawLine);
    const obj = {};
    header.forEach((h, idx) => {
      obj[h] = values[idx] || '';
    });
    rows.push(obj);
  }
  return { header, rows };
}

const dir = path.join(process.cwd(), 'CSVBARU');
const files = fs.readdirSync(dir);

console.log('=== CSVBARU DEEP DIVE AUDIT ANALYSIS ===\n');

for (const file of files) {
  console.log('================================================================');
  console.log(`FILE: ${file}`);
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  const { header, rows } = parseCSV(content);
  console.log(`Headers: [ ${header.join(' || ')} ]`);
  console.log(`Total Records: ${rows.length}`);

  if (file.includes('canonical-points')) {
    console.log('\n--- CANONICAL POINTS AUDIT ---');
    const statusCodes = {};
    const canonicalCodes = {};
    const domainComparison = {
      sourceIsWww_targetIsApex: 0,
      sourceIsApex_targetIsWww: 0,
      bothWww: 0,
      bothApex: 0,
      other: 0
    };
    const sampleRows = [];
    let selfReferencing = 0;
    let pointingElsewhere = 0;

    rows.forEach(r => {
      statusCodes[r['HTTP status code']] = (statusCodes[r['HTTP status code']] || 0) + 1;
      canonicalCodes[r['Canonical URL code']] = (canonicalCodes[r['Canonical URL code']] || 0) + 1;

      const u = r['URL'] || '';
      const c = r['Canonical URL'] || '';
      const uHasWww = u.includes('www.');
      const cHasWww = c.includes('www.');

      if (u === c) selfReferencing++;
      else pointingElsewhere++;

      if (uHasWww && !cHasWww) domainComparison.sourceIsWww_targetIsApex++;
      else if (!uHasWww && cHasWww) domainComparison.sourceIsApex_targetIsWww++;
      else if (uHasWww && cHasWww) domainComparison.bothWww++;
      else if (!uHasWww && !cHasWww) domainComparison.bothApex++;
      else domainComparison.other++;

      if (sampleRows.length < 8) {
        sampleRows.push({
          url: u,
          canonical: c,
          urlCode: r['HTTP status code'],
          canonicalCode: r['Canonical URL code'],
          indexable: r['Is indexable page'],
          inlinks: r['No. of all inlinks']
        });
      }
    });

    console.log('Page HTTP status codes:', statusCodes);
    console.log('Target Canonical URL HTTP status codes:', canonicalCodes);
    console.log('Self-referencing count:', selfReferencing, 'vs Pointing elsewhere:', pointingElsewhere);
    console.log('Domain mismatch breakdown:', domainComparison);
    console.log('Sample Rows:\n', JSON.stringify(sampleRows, null, 2));
  }

  if (file.includes('3xx-redirect') && !file.includes('3xx-page-receive')) {
    console.log('\n--- 3XX REDIRECT AUDIT ---');
    const redirectCodes = {};
    const targetCodes = {};
    const redirectPatterns = {
      apexToWww: 0,
      idPrefixRemoval: 0,
      other: 0
    };
    const samples = [];

    rows.forEach(r => {
      redirectCodes[r['HTTP status code']] = (redirectCodes[r['HTTP status code']] || 0) + 1;
      targetCodes[r['Redirect URL code']] = (targetCodes[r['Redirect URL code']] || 0) + 1;

      const u = r['URL'] || '';
      const red = r['Redirect URL'] || '';
      if (!u.includes('www.') && red.includes('www.')) redirectPatterns.apexToWww++;
      else if (u.includes('/id/') || u.endsWith('/id')) redirectPatterns.idPrefixRemoval++;
      else redirectPatterns.other++;

      if (samples.length < 8) {
        samples.push({
          url: u,
          redirect: red,
          statusCode: r['HTTP status code'],
          targetCode: r['Redirect URL code'],
          chain: r['Redirect chain URLs'],
          chainCodes: r['Redirect chain URLs codes'],
          isLoop: r['Is redirect loop'],
          firstFoundAt: r['First found at']
        });
      }
    });

    console.log('Redirect HTTP status codes:', redirectCodes);
    console.log('Destination HTTP status codes:', targetCodes);
    console.log('Redirect Patterns:', redirectPatterns);
    console.log('Sample Rows:\n', JSON.stringify(samples, null, 2));
  }

  if (file.includes('pages')) {
    console.log('\n--- PAGES AUDIT ---');
    const statusCodes = {};
    const inSitemap = {};
    const samples = [];
    rows.forEach(r => {
      statusCodes[r['HTTP status code']] = (statusCodes[r['HTTP status code']] || 0) + 1;
      inSitemap[r['Is in sitemap']] = (inSitemap[r['Is in sitemap']] || 0) + 1;
      if (samples.length < 8) {
        samples.push({
          url: r['URL'],
          statusCode: r['HTTP status code'],
          inSitemap: r['Is in sitemap'],
          redirectUrl: r['Redirect URL'],
          sitemapRef: r['Referenced in sitemaps']
        });
      }
    });
    console.log('Status Codes:', statusCodes);
    console.log('In Sitemap breakdown:', inSitemap);
    console.log('Sample Rows:\n', JSON.stringify(samples, null, 2));
  }

  if (file.includes('3xx-page-receive')) {
    console.log('\n--- 3XX PAGE RECEIVE AUDIT ---');
    console.log('Rows:\n', JSON.stringify(rows, null, 2));
  }

  if (file.includes('slow-page')) {
    console.log('\n--- SLOW PAGE AUDIT ---');
    console.log('Rows:\n', JSON.stringify(rows, null, 2));
  }
}
