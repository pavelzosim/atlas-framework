/**
 * ATLAS VELO BRIDGE - Blog Post Page Script
 * Paste into Wix Dev Mode > Page Code on the Blog Post page.
 * No element IDs needed — broadcasts to ALL HTML embeds on the page.
 */

import wixLocation from 'wix-location';
import wixData from 'wix-data';

function fmtDate(d) {
  if (!d) return null;
  var dt = (d instanceof Date) ? d : new Date(d);
  if (isNaN(dt)) return null;
  var y  = dt.getFullYear();
  var mo = String(dt.getMonth() + 1).padStart(2, '0');
  var dd = String(dt.getDate()).padStart(2, '0');
  return y + '.' + mo + '.' + dd;
}

// Broadcast payload to ALL HtmlComponent elements on the page
function broadcastToEmbeds(payload) {
  var components = $w('HtmlComponent');
  if (!components || !components.length) {
    console.warn('[ATLAS VELO] No HtmlComponent elements found on page.');
    return;
  }
  components.forEach(function (el) {
    if (typeof el.postMessage === 'function') {
      el.postMessage(payload);
    }
  });
}

function dispatch(author, created, modified, tags) {
  var payload = {
    source:    'atlas-velo',
    author:    author,
    created:   created,
    modified:  modified,
    wordCount: null,
    tags:      tags
  };
  console.log('[ATLAS VELO] Sending payload:', JSON.stringify(payload));
  // Send immediately, retry at 1s and 3s to cover slow iframe load
  broadcastToEmbeds(payload);
  setTimeout(function () { broadcastToEmbeds(payload); }, 1000);
  setTimeout(function () { broadcastToEmbeds(payload); }, 3000);
}

$w.onReady(function () {

  var path = wixLocation.path;
  var slug = path[path.length - 1];

  if (!slug) {
    console.warn('[ATLAS VELO] Could not read post slug from URL.');
    return;
  }

  wixData.query('Blog/Posts')
    .eq('slug', slug)
    .include('owner')
    .find()
    .then(function (results) {

      if (!results.items.length) {
        console.warn('[ATLAS VELO] No post found for slug:', slug);
        return;
      }

      var post = results.items[0];

      var created  = fmtDate(post.publishedDate || post._createdDate);
      var modified = fmtDate(post.lastModifiedDate || post._updatedDate);
      if (created === modified) modified = null;

      var author = null;
      if (post.owner) author = post.owner.nickname || post.owner.name || null;
      if (!author)    author = post.authorName || null;

      var tagIds = Array.isArray(post.tags) ? post.tags : [];

      if (tagIds.length === 0) {
        dispatch(author, created, modified, []);
        return;
      }

      var looksLikeGuid = typeof tagIds[0] === 'string' && tagIds[0].length > 20;

      if (!looksLikeGuid) {
        dispatch(author, created, modified, tagIds);
        return;
      }

      wixData.query('Blog/Tags')
        .hasSome('_id', tagIds)
        .find()
        .then(function (tagResults) {
          var labels = tagResults.items
            .map(function (t) { return t.label || t.name || t.slug || ''; })
            .filter(Boolean);
          dispatch(author, created, modified, labels);
        })
        .catch(function (err) {
          console.warn('[ATLAS VELO] Blog/Tags query failed, using empty tags.', err);
          dispatch(author, created, modified, []);
        });

    })
    .catch(function (err) {
      console.error('[ATLAS VELO] Blog/Posts query failed:', err);
    });

});
