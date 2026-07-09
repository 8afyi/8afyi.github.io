---
layout: page
title: Important Note
description: You really should read this
comment_id: 48826218
---

{% assign comments = site.data.hackernews_comments.comments | default: empty %}
{% assign selected_comment = nil %}
{% for item in comments %}
  {% if item.id == page.comment_id %}
    {% assign selected_comment = item %}
    {% break %}
  {% endif %}
{% endfor %}

{% if selected_comment == nil and comments.size > 0 %}
  {% assign selected_comment = comments | first %}
{% endif %}

{% if selected_comment %}
<article>
<p>    {{ selected_comment.text | markdownify }} </p>
</article>
{% else %}
<p>Poop.</p>
{% endif %}
