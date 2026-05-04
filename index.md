---
layout: page
title: 8A.FYI
description: For Your Information
---

{% assign static_pages = site.pages | where: "layout", "page" | sort: "title" %}

<section aria-labelledby="whoa-video-title">
 <center>  <video id="whoa-video" controls playsinline preload="metadata" style="width: 100%; max-width: 640px;"></video>
  <p id="whoa-video-meta" aria-live="polite">Loading...</p>
  </center>
</section>

<script>
  (() => {
    const video = document.getElementById("whoa-video");
    const meta = document.getElementById("whoa-video-meta");

    fetch("https://whoa.onrender.com/whoas/random")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        return response.json();
      })
      .then((whoas) => {
        const whoa = Array.isArray(whoas) ? whoas[0] : whoas;
        const videoUrl = whoa && whoa.video && whoa.video["360p"];

        if (!videoUrl) {
          throw new Error("The API response did not include a 360p video.");
        }

        video.src = videoUrl;
        video.poster = whoa.poster || "";
        meta.textContent = [whoa.movie, whoa.year, whoa.timestamp].filter(Boolean).join(" - ");
      })
      .catch(() => {
        meta.textContent = "The video is unavailable right now.";
      });
  })();
</script>

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
