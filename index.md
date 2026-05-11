---
layout: page
title: 8A.FYI
description: For Your Information
---

{% assign static_pages = site.pages | where: "layout", "page" | sort: "title" %}

<section>
  <div class="grid">
    {% for item in static_pages %}
      {% if item.url != page.url and item.title %}
          <div>    
          <h2>
            <a href="{{ item.url | relative_url }}" class="contrast">{{ item.title | escape }}</a>
          </h2>
          {% assign item_summary = item.description | default: item.excerpt %}
          {% if item_summary %}
            <p>{{ item_summary | strip_html | strip_newlines }}</p>
          {% endif %}
          </div>
      {% endif %}
    {% endfor %}
  </div>
</section>


<section aria-labelledby="whoa-video-title">
 <center>  <video id="whoa-video" controls playsinline preload="metadata" style="width: 100%; max-width: 640px;"></video>
  <p id="whoa-video-meta" aria-live="polite">Loading...</p>
  </center>
</section>
