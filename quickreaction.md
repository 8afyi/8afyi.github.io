---
layout: page
title: Quick Reaction
permalink: /quickreaction/
---

{% assign reaction_files = site.static_files | where_exp: "file", "file.path contains '/reactions/'" | sort: "name" %}
{% assign first_reaction = reaction_files | first %}

<style>
  #quickreaction img {
    display: block;
    max-width: 100%;
    max-height: 70vh;
    margin: 0 auto;
  }

  #quickreaction p {
    margin: 0;
    text-align: center;
  }
</style>

<div id="quickreaction">
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

  if (reactions.length > 0) {
    image.src = reactions[Math.floor(Math.random() * reactions.length)];
    image.hidden = false;
    message.hidden = true;
  }
</script>
