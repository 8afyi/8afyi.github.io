---
layout: page
title: 8A.FYI
description: For Your Information
---

{% assign static_pages = site.pages | where: "layout", "page" | sort: "title" %}

<section>
  {% for item in static_pages %}
    {% if item.url != page.url and item.title %}
      
        <h2>
          <a href="{{ item.url | relative_url }}">{{ item.title | escape }}</a>
        </h2>
        {% assign item_summary = item.description | default: item.excerpt %}
        {% if item_summary %}
          <p>{{ item_summary | strip_html | strip_newlines }}</p>
        {% endif %}
      
    {% endif %}
  {% endfor %}
</section>
