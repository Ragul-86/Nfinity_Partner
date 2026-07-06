// Populates MongoDB with sample content for local development and demos.
//   npm run seed          -> inserts CaseStudy/BlogPost/Testimonial sample data (skips those
//                            collections if they already have documents). The Service collection
//                            is the exception: it is read-only content with no admin/write API,
//                            so every `seed` run prunes any Service doc whose slug is no longer in
//                            data.js, then upserts every service in data.js by slug. This keeps the
//                            Services collection self-healing on every run instead of silently
//                            skipping once it's non-empty, which previously meant edits to the
//                            services list in data.js (renames, removals, additions) never reached
//                            an already-seeded database.
//   npm run seed:destroy  -> wipes CaseStudy/Service/BlogPost/Testimonial collections
//   npm run seed:sync     -> upserts CaseStudy/Service/BlogPost docs (by slug) and Testimonial
//                            docs (by brandName) to match data.js, WITHOUT touching collections
//                            that are already populated as a whole. Use this after editing
//                            data.js — `seed` alone is a no-op once a collection has any
//                            documents in it, so content edits never reach an already-seeded
//                            database any other way. Note: this only upserts entries that still
//                            exist in data.js — it does NOT delete a document whose slug/brandName
//                            was removed from data.js entirely; use `seed:fix` for that.
//   npm run seed:dedupe   -> removes duplicate documents that share a slug (or brandName for
//                            Testimonial), keeping the newest. Run this if the same card shows up
//                            twice on the site.
//   npm run seed:list     -> read-only: prints every CaseStudy and Testimonial doc's identifying
//                            fields so you can see what's actually stored.
//   npm run seed:fix      -> one-shot CaseStudy + Testimonial repair: deletes any document whose
//                            key (slug for CaseStudy, brandName for Testimonial) isn't one of the
//                            values currently in data.js (catches stray duplicates left over from
//                            old slugs/brandNames, e.g. a "Fashion" card created before a text
//                            edit renamed its slug — the kind of duplicate `seed:dedupe` cannot
//                            remove because it only collapses docs that share an identical key —
//                            and fully removes content that was deleted from data.js entirely,
//                            e.g. the Saree/Apparel case study or the old Fashion/Saree/CCTV
//                            testimonials), dedupes whatever's left, then re-syncs the remaining
//                            canonical entries so their fields exactly match data.js. Prints the
//                            final lists at the end so you can confirm exactly which documents
//                            now exist.
//
// Leads are intentionally never touched by this script — they are real user
// submissions, not sample content.

import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import { logger } from '../utils/logger.js';
import CaseStudy from '../models/CaseStudy.js';
import Service from '../models/Service.js';
import BlogPost from '../models/BlogPost.js';
import Testimonial from '../models/Testimonial.js';
import { caseStudies, services, testimonials, blogPosts } from './data.js';

async function seed() {
  await connectDB();

  const [csCount, blogCount, testCount] = await Promise.all([
    CaseStudy.countDocuments(),
    BlogPost.countDocuments(),
    Testimonial.countDocuments(),
  ]);

  if (csCount === 0) {
    await CaseStudy.insertMany(caseStudies);
    logger.info(`Seeded ${caseStudies.length} case studies.`);
  } else {
    logger.info(`Skipped case studies — ${csCount} already present.`);
  }

  // Service has no admin/write API — data.js is its only source of truth, so unlike the other
  // collections it is never just "skip if non-empty". Every seed run prunes stray docs (slugs no
  // longer in data.js, e.g. a removed service) and upserts the rest by slug, so the live
  // collection always ends up matching data.js exactly, whether it started empty or fully seeded.
  const canonicalServiceSlugs = services.map((doc) => doc.slug);
  const svcPruneResult = await Service.deleteMany({ slug: { $nin: canonicalServiceSlugs } });
  if (svcPruneResult.deletedCount > 0) {
    logger.info(`Pruned ${svcPruneResult.deletedCount} Service document(s) no longer in data.js.`);
  }
  let svcUpserts = 0;
  for (const doc of services) {
    await Service.findOneAndUpdate({ slug: doc.slug }, doc, { upsert: true, setDefaultsOnInsert: true });
    svcUpserts += 1;
  }
  logger.info(`Synced ${svcUpserts} services — Service collection now matches data.js exactly.`);

  if (blogCount === 0) {
    await BlogPost.insertMany(blogPosts);
    logger.info(`Seeded ${blogPosts.length} blog posts.`);
  } else {
    logger.info(`Skipped blog posts — ${blogCount} already present.`);
  }

  if (testCount === 0) {
    await Testimonial.insertMany(testimonials);
    logger.info(`Seeded ${testimonials.length} testimonials.`);
  } else {
    logger.info(`Skipped testimonials — ${testCount} already present.`);
  }

  logger.info('Seed complete.');
  await mongoose.connection.close();
  process.exit(0);
}

// Upserts every case study / service / blog post by its `slug`, and every
// testimonial by its `brandName` (testimonials have no slug field, but
// brandName is unique across the seed set and serves the same purpose), so
// edits made to data.js (new fields, changed isFeatured/order, replaced
// quotes, etc.) land in an already-seeded database without wiping unrelated
// collections.
async function sync() {
  await connectDB();

  let csUpserts = 0;
  for (const doc of caseStudies) {
    await CaseStudy.findOneAndUpdate({ slug: doc.slug }, doc, { upsert: true, setDefaultsOnInsert: true });
    csUpserts += 1;
  }
  logger.info(`Synced ${csUpserts} case studies.`);

  let svcUpserts = 0;
  for (const doc of services) {
    await Service.findOneAndUpdate({ slug: doc.slug }, doc, { upsert: true, setDefaultsOnInsert: true });
    svcUpserts += 1;
  }
  logger.info(`Synced ${svcUpserts} services.`);

  let blogUpserts = 0;
  for (const doc of blogPosts) {
    await BlogPost.findOneAndUpdate({ slug: doc.slug }, doc, { upsert: true, setDefaultsOnInsert: true });
    blogUpserts += 1;
  }
  logger.info(`Synced ${blogUpserts} blog posts.`);

  let testimonialUpserts = 0;
  for (const doc of testimonials) {
    await Testimonial.findOneAndUpdate({ brandName: doc.brandName }, doc, { upsert: true, setDefaultsOnInsert: true });
    testimonialUpserts += 1;
  }
  logger.info(`Synced ${testimonialUpserts} testimonials.`);

  logger.info('Sync complete.');
  await mongoose.connection.close();
  process.exit(0);
}

// Removes duplicate documents that share the same value in `keyField`
// (defaults to "slug"; Testimonial has no slug, so it's deduped by
// "brandName" instead), keeping only the most recently updated one per group
// (the one `sync` just wrote, if it ran). `sync` upserts with
// findOneAndUpdate, which only ever updates a SINGLE matching document — if
// a key value already had more than one document (e.g. from an earlier seed
// run before a unique index existed, or before it had finished building),
// sync silently updates just one of them and leaves the rest in place, which
// is what produces a duplicate card on the homepage. This walks the
// collection, groups by keyField, and deletes every doc in each group except
// the newest.
async function dedupeCollection(Model, label, keyField = 'slug') {
  const groups = await Model.aggregate([
    { $sort: { updatedAt: -1, _id: -1 } },
    { $group: { _id: `$${keyField}`, ids: { $push: '$_id' }, count: { $sum: 1 } } },
    { $match: { count: { $gt: 1 } } },
  ]);

  let removed = 0;
  for (const group of groups) {
    const [, ...staleIds] = group.ids; // keep the first (newest), drop the rest
    await Model.deleteMany({ _id: { $in: staleIds } });
    removed += staleIds.length;
    logger.info(`  ${label}: removed ${staleIds.length} duplicate(s) of ${keyField} "${group._id}".`);
  }
  return removed;
}

async function dedupe() {
  await connectDB();

  const csRemoved = await dedupeCollection(CaseStudy, 'CaseStudy');
  const svcRemoved = await dedupeCollection(Service, 'Service');
  const blogRemoved = await dedupeCollection(BlogPost, 'BlogPost');
  const testRemoved = await dedupeCollection(Testimonial, 'Testimonial', 'brandName');

  logger.info(
    `Dedupe complete. Removed ${csRemoved + svcRemoved + blogRemoved + testRemoved} duplicate document(s) total.`
  );
  await mongoose.connection.close();
  process.exit(0);
}

// Read-only diagnostic: prints every CaseStudy and Testimonial document
// exactly as it is stored right now. Use this to see ground truth in the
// database instead of guessing from what renders on the page — e.g. two
// cards that *look* identical on the homepage might actually have two
// different slugs/brandNames (so `dedupe`, which only removes docs that
// share the same key value, wouldn't touch them), or there could be more
// than 2 duplicates of the same key.
async function list() {
  await connectDB();

  const docs = await CaseStudy.find({}).sort({ order: 1, createdAt: -1 }).lean();
  logger.info(`${docs.length} case study document(s) in the database:`);
  for (const d of docs) {
    logger.info(
      `  _id=${d._id}  slug="${d.slug}"  clientName="${d.clientName}"  industry="${d.industry}"  isFeatured=${d.isFeatured}  isPublished=${d.isPublished}  order=${d.order}  updatedAt=${d.updatedAt?.toISOString()}`
    );
  }

  const testimonialDocs = await Testimonial.find({}).sort({ order: 1, createdAt: -1 }).lean();
  logger.info(`${testimonialDocs.length} testimonial document(s) in the database:`);
  for (const t of testimonialDocs) {
    logger.info(
      `  _id=${t._id}  clientName="${t.clientName}"  brandName="${t.brandName}"  isFeatured=${t.isFeatured}  isPublished=${t.isPublished}  order=${t.order}  updatedAt=${t.updatedAt?.toISOString()}`
    );
  }

  await mongoose.connection.close();
  process.exit(0);
}

// One-shot repair for the case studies AND testimonials collections. Goes
// further than `dedupe`: instead of only collapsing documents that share an
// identical key value, it first removes every document whose key (slug for
// CaseStudy, brandName for Testimonial) is NOT one of the values currently
// in data.js. That's the fix for a duplicate card that survives
// `seed:dedupe` — if `seed:dedupe` didn't remove it, the two
// visually-identical cards must have different key values (e.g. a leftover
// doc from before "Fashion Brand (Maternity Wear)" was edited down to
// "Fashion Brand", saved under an older slug). It's also how a case study or
// testimonial gets fully deleted from the database after being removed from
// data.js entirely (e.g. the Saree/Apparel case study, or the old
// Fashion/Saree/CCTV testimonials replaced with real client quotes) —
// data.js is the single source of truth for this site's content, so anything
// outside its key values is stray data, not content to preserve. After
// pruning, it dedupes same-key duplicates among what's left (defensive, in
// case more than one canonical doc also exists), then re-syncs so every
// field exactly matches data.js, and finally prints the resulting lists.
async function fix() {
  await connectDB();

  const canonicalSlugs = caseStudies.map((doc) => doc.slug);

  const pruneResult = await CaseStudy.deleteMany({ slug: { $nin: canonicalSlugs } });
  logger.info(
    `Pruned ${pruneResult.deletedCount} CaseStudy document(s) with a slug outside the canonical set (${canonicalSlugs.join(', ')}).`
  );

  const dupesRemoved = await dedupeCollection(CaseStudy, 'CaseStudy');
  logger.info(`Removed ${dupesRemoved} additional same-slug duplicate(s).`);

  let csUpserts = 0;
  for (const doc of caseStudies) {
    await CaseStudy.findOneAndUpdate({ slug: doc.slug }, doc, { upsert: true, setDefaultsOnInsert: true });
    csUpserts += 1;
  }
  logger.info(`Synced ${csUpserts} case studies to match data.js exactly.`);

  const canonicalBrandNames = testimonials.map((doc) => doc.brandName);

  const testimonialPrune = await Testimonial.deleteMany({ brandName: { $nin: canonicalBrandNames } });
  logger.info(
    `Pruned ${testimonialPrune.deletedCount} Testimonial document(s) with a brandName outside the canonical set (${canonicalBrandNames.join(', ')}).`
  );

  const testimonialDupesRemoved = await dedupeCollection(Testimonial, 'Testimonial', 'brandName');
  logger.info(`Removed ${testimonialDupesRemoved} additional same-brandName duplicate(s).`);

  let testimonialUpserts = 0;
  for (const doc of testimonials) {
    await Testimonial.findOneAndUpdate({ brandName: doc.brandName }, doc, { upsert: true, setDefaultsOnInsert: true });
    testimonialUpserts += 1;
  }
  logger.info(`Synced ${testimonialUpserts} testimonials to match data.js exactly.`);

  const docs = await CaseStudy.find({}).sort({ order: 1, createdAt: -1 }).lean();
  logger.info(`${docs.length} case study document(s) now in the database:`);
  for (const d of docs) {
    logger.info(
      `  _id=${d._id}  slug="${d.slug}"  clientName="${d.clientName}"  industry="${d.industry}"  isFeatured=${d.isFeatured}  isPublished=${d.isPublished}  order=${d.order}`
    );
  }

  const testimonialDocs = await Testimonial.find({}).sort({ order: 1, createdAt: -1 }).lean();
  logger.info(`Fix complete. ${testimonialDocs.length} testimonial document(s) now in the database:`);
  for (const t of testimonialDocs) {
    logger.info(
      `  _id=${t._id}  clientName="${t.clientName}"  brandName="${t.brandName}"  isFeatured=${t.isFeatured}  order=${t.order}`
    );
  }

  await mongoose.connection.close();
  process.exit(0);
}

async function destroy() {
  await connectDB();

  await Promise.all([
    CaseStudy.deleteMany({}),
    Service.deleteMany({}),
    BlogPost.deleteMany({}),
    Testimonial.deleteMany({}),
  ]);

  logger.info('Destroyed CaseStudy, Service, BlogPost, and Testimonial collections. Leads were left untouched.');
  await mongoose.connection.close();
  process.exit(0);
}

const mode = process.argv[2];

if (mode === '--destroy') {
  destroy().catch((err) => {
    logger.error(`Seed destroy failed: ${err.message}`);
    process.exit(1);
  });
} else if (mode === '--sync') {
  sync().catch((err) => {
    logger.error(`Seed sync failed: ${err.message}`);
    process.exit(1);
  });
} else if (mode === '--dedupe') {
  dedupe().catch((err) => {
    logger.error(`Seed dedupe failed: ${err.message}`);
    process.exit(1);
  });
} else if (mode === '--list') {
  list().catch((err) => {
    logger.error(`Seed list failed: ${err.message}`);
    process.exit(1);
  });
} else if (mode === '--fix') {
  fix().catch((err) => {
    logger.error(`Seed fix failed: ${err.message}`);
    process.exit(1);
  });
} else {
  seed().catch((err) => {
    logger.error(`Seed failed: ${err.message}`);
    process.exit(1);
  });
}
