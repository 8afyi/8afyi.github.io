---
layout: page
title: Quick Reaction
permalink: /quickreaction/
description: Need a quick reaction image?  Check out this page immediately.
---

{% assign reaction_files = site.static_files | where_exp: "file", "file.path contains '/reactions/'" | sort: "name" %}
{% assign first_reaction = reaction_files | first %}

<div>
  <img id="reaction-image" alt="Random reaction image" hidden>
  <p id="reaction-message"{% if reaction_files != empty %} hidden{% endif %}>No reaction images found.</p>
  {% if first_reaction %}
  <noscript>
    <img src="{{ first_reaction.path | relative_url }}" alt="Reaction image">
  </noscript>
  {% endif %}
</div>

<script>
  const reactions = [
    {% for file in reaction_files %}
    {{ file.path | relative_url | jsonify }}{% unless forloop.last %},{% endunless %}
    {% endfor %}
  ];

  const image = document.getElementById("reaction-image");
  const message = document.getElementById("reaction-message");

  if (image && message && reactions.length > 0) {
    image.src = reactions[Math.floor(Math.random() * reactions.length)];
    image.hidden = false;
    message.hidden = true;
  }
</script>
