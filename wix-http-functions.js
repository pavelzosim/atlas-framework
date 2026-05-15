/**
 * ATLAS BACKEND - Wix HTTP Function
 * Install: Dev Mode → Backend → http-functions.js → Publish
 * Endpoint: https://www.pavelzosim.com/_functions/getPostData?slug=SLUG
 */

import { ok, badRequest, notFound, serverError } from 'wix-http-functions';
import wixData from 'wix-data';

export function get_getPostData(request) {
  var slug = request.query && request.query.slug;
  var headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  };

  if (!slug) {
    return badRequest({ headers: headers, body: JSON.stringify({ error: 'Missing slug' }) });
  }

  return wixData.query('Blog/Posts')
    .eq('slug', slug)
    .find()
    .then(function (results) {
      if (!results.items.length) {
        return notFound({ headers: headers, body: JSON.stringify({ error: 'Post not found', slug: slug }) });
      }

      var post = results.items[0];
      var tagIds = Array.isArray(post.tags) ? post.tags : [];
      var looksLikeGuid = tagIds.length > 0 && typeof tagIds[0] === 'string' && tagIds[0].length > 20;

      var tagsPromise = looksLikeGuid
        ? wixData.query('Blog/Tags').hasSome('_id', tagIds).find()
            .then(function (r) { return r.items.map(function (t) { return t.label || t.name || t.slug || ''; }).filter(Boolean); })
            .catch(function () { return []; })
        : Promise.resolve(tagIds);

      return tagsPromise.then(function (tags) {
          return ok({ headers: headers, body: JSON.stringify(buildPayload(post, tags)) });
        });
    })
    .catch(function (err) {
      return serverError({ headers: headers, body: JSON.stringify({ error: String(err) }) });
    });
}

function fmtDate(d) {
  if (!d) return null;
  var s = typeof d === 'string' ? d.replace(/^"|"$/g, '') : null;
  var dt = s ? new Date(s) : (d instanceof Date ? d : new Date(d));
  if (isNaN(dt)) return null;
  var y  = dt.getFullYear();
  var mo = String(dt.getMonth() + 1).padStart(2, '0');
  var dd = String(dt.getDate()).padStart(2, '0');
  return y + '.' + mo + '.' + dd;
}

function buildPayload(post, tags) {
  var created  = fmtDate(post.publishedDate);
  var modified = fmtDate(post.lastPublishedDate);
  if (created === modified) modified = null;
  return {
    source:   'atlas-backend',
    author:   'Pavel Zosim',
    title:    post.title || null,
    created:  created,
    modified: modified,
    tags:     tags
  };
}
