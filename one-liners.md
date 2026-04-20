---
layout: page
title: One-Liners
permalink: /one-liners/
description: Funny things, one card at a time.
---

{% assign funnythings = site.data.funnythings %}

{% if funnythings and funnythings.size > 0 %}
  <section class="grid">
    {% for line in funnythings %}
      <article>
        <p>{{ line | escape }}</p>
      </article>
    {% endfor %}
  </section>
{% else %}
  <p>Could not load one-liners.</p>
{% endif %}
