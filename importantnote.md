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
      container.innerHTML = '<p>No comments available.</p>';
      return;
    }

    const comment = comments[Math.floor(Math.random() * comments.length)];
    const article = document.createElement('article');

    if (comment.author) {
      const author = document.createElement('p');
      author.innerHTML = '<strong>Author:</strong> ' + escapeHtml(comment.author);
      article.appendChild(author);
    }

    if (comment.story_title) {
      const story = document.createElement('p');
      const storyText = comment.story_url
        ? '<a href="' + escapeHtml(comment.story_url) + '">' + escapeHtml(comment.story_title) + '</a>'
        : escapeHtml(comment.story_title);
      story.innerHTML = '<strong>Story:</strong> ' + storyText;
      article.appendChild(story);
    }

    if (comment.created_at) {
      const posted = document.createElement('p');
      posted.innerHTML = '<strong>Posted:</strong> ' + escapeHtml(comment.created_at);
      article.appendChild(posted);
    }

    const body = document.createElement('div');
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
