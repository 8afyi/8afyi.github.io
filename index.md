---
layout: page
title: 8A.FYI
description: For Your Information
---

{% assign static_pages = site.pages | where: "layout", "page" | sort: "title" %}

<section>
  <dl>
    {% for item in static_pages %}
      {% if item.url != page.url and item.title %}
          <dt>
            <a href="{{ item.url | relative_url }}" class="contrast">{{ item.title | escape }}</a>
          </dt>
          {% assign item_summary = item.description | default: item.excerpt %}
          {% if item_summary %}
            <dd>{{ item_summary | strip_html | strip_newlines }}</dd>
          {% endif %}
      {% endif %}
    {% endfor %}
  </dl>
</section>
