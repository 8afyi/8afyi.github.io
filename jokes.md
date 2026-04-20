---
layout: page
title: Hmm. Funny.
permalink: /jokes/
description: That is not funny.
---

{% assign funnythings = site.data.funnythings %}

{% if funnythings and funnythings.size > 0 %}
  <section>
  <ol>
    {% for line in funnythings %}
        <li>{{ line | escape }}</li>
    {% endfor %}
    </ol>
  </section>
{% else %}
  <p>Nah.</p>
{% endif %}
