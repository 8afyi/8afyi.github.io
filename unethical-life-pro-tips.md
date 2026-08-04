---
layout: page
title: Unethical Life Pro Tips
permalink: /ulpt/
description: Tips your HR department definitely didn't approve.
---

{% assign tips = site.data.unethical_life_pro_tips %}

{% if tips and tips.size > 0 %}
  <p>Click a column header to sort. <strong>{{ tips.size }}</strong> tip{% unless tips.size == 1 %}s{% endunless %} filed under questionable ethics.</p>
  {% include ulpt-table.html tips=tips %}
{% else %}
  <p>No tips yet. Check back later.</p>
{% endif %}

<script src="{{ '/assets/js/sortable-table.js' | relative_url }}"></script>
