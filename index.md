---
layout: page
title: 8A.FYI
description: HOME PAGE
---

{% assign static_pages = site.pages
  | where: "layout", "page"
  | where_exp: "item", "item.url != page.url and item.title"
  | sort: "title" %}

<p>Static pages on this site:</p>

<ul>
  {% for item in static_pages %}
  <li>
    <a href="{{ item.url | relative_url }}">{{ item.title | escape }}</a>
    {% assign item_summary = item.description | default: item.excerpt %}
    {% if item_summary %}
    <p>{{ item_summary | strip_html | strip_newlines }}</p>
    {% endif %}
  </li>
  {% endfor %}
</ul>
