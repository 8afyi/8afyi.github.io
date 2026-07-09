---
layout: page
title: Important Note
description: You really should read this
---

{% assign comments = site.data.hackernews_comments.comments | default: empty %}

<script>
  window.hnComments = {{ comments | jsonify }};
</script>

<div id="hn-comment-container">Loading…</div>

<script>
  (function () {
    const comments = window.hnComments || [];
    const container = document.getElementById('hn-comment-container');

    if (!container) {
      return;
    }

    if (!comments.length) {
      return;
    }

    const comment = comments[Math.floor(Math.random() * comments.length)];
    const article = document.createElement('blockquote');

    const body = document.createElement('p');
    body.innerHTML = (comment.text || comment.comment_text || '').replace(/\n/g, '<br>');
    article.appendChild(body);

    container.replaceChildren(article);
  })();

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
</script>
