---
layout: page
title: Hmm. Funny.
permalink: /jokes/
description: That is not funny.
---

{% assign funnythings = site.data.funnythings %}

{% if funnythings and funnythings.size > 0 %}
  <section>
    {% for line in funnythings %}
      <article>
        <p>{{ line | escape }}</p>
      </article>
    {% endfor %}
  </section>
{% else %}
  <p>Nah.</p>
{% endif %}
