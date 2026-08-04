---
layout: page
title: Unethical Life Pro Tips
permalink: /ulpt/
description: Tips your HR department definitely didn't approve.
---

{% assign tips = site.data.unethical_life_pro_tips %}

{% if tips and tips.size > 0 %}
  <p><a href="https://github.com/8afyi/8afyi.github.io/issues/new?template=new-tip.yml" role="button">Submit a tip</a></p>
  {% include ulpt-table.html tips=tips %}
{% else %}
  <p>Nah.</p>
{% endif %}


<script src="{{ '/assets/js/sortable-table.js' | relative_url }}"></script>
