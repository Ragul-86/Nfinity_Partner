// One-off migration: replace every em dash "—" (U+2014) with a regular
// hyphen "-" across ALL user-visible text fields in MongoDB.
//
// This script does NOT use or touch seed files. It connects directly to the
// live database, reads every document, patches the text, and saves.
//
// Run from the server/ directory:
//   node src/scripts/fix-em-dashes.js

import dotenv from 'dotenv';
dotenv.config();                         // reads server/.env → MONGO_URI

import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import Service     from '../models/Service.js';
import CaseStudy   from '../models/CaseStudy.js';
import BlogPost    from '../models/BlogPost.js';
import Testimonial from '../models/Testimonial.js';

const EM  = '—';   // U+2014 em dash
const HYP = '-';   // U+002D hyphen

// ─── Recursive string replacer ─────────────────────────────────────────────
// Walks a plain-JS value (string | array | plain object | other) and replaces
// every em dash in every string it finds. Dates, ObjectIds, numbers, booleans
// and null are passed through untouched.
function fix(val) {
  if (typeof val === 'string')      return val.replaceAll(EM, HYP);
  if (Array.isArray(val))           return val.map(fix);
  if (val !== null && typeof val === 'object' && !(val instanceof Date)) {
    const out = {};
    for (const [k, v] of Object.entries(val)) out[k] = fix(v);
    return out;
  }
  return val;
}

// ─── Patch one collection ──────────────────────────────────────────────────
async function patchCollection(Model, label, nameField = 'slug') {
  const docs = await Model.find({}).lean();
  let patched = 0;

  for (const doc of docs) {
    // Serialise to JSON, replace, deserialise — safe because lean() gives
    // plain JS (ObjectId → toJSON string, Date → ISO string).  We never
    // write _id / __v / timestamps back so their string representation is fine.
    const before = JSON.stringify(doc);
    const after  = before.replaceAll(EM, HYP);

    if (before === after) continue;           // nothing to change

    const { _id, __v, createdAt, updatedAt, ...fields } = JSON.parse(after);
    await Model.findByIdAndUpdate(doc._id, { $set: fields });

    const label2 = doc[nameField] || doc.title || doc.brandName || String(doc._id);
    console.log(`  ✓ patched ${label}: ${label2}`);
    patched++;
  }

  console.log(`${label}: ${patched}/${docs.length} document(s) patched.\n`);
}

// ─── Main ──────────────────────────────────────────────────────────────────
async function main() {
  await connectDB();
  console.log('Connected to MongoDB.\n');

  await patchCollection(Service,     'Service',     'slug');
  await patchCollection(CaseStudy,   'CaseStudy',   'slug');
  await patchCollection(BlogPost,    'BlogPost',    'slug');
  await patchCollection(Testimonial, 'Testimonial', 'brandName');

  console.log('Em-dash migration complete. All user-visible content now uses "-".');
  await mongoose.connection.close();
  process.exit(0);
}

main().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
