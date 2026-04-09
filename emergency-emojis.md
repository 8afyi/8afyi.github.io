---
layout: page
title: Emergency Emojis
---

{% assign emoji_files = site.static_files | where_exp: "file", "file.path contains '/emojis/'" | sort: "name" %}

{{ emoji_files | size }} emergency emojis.

{% include emergency-emojis-table.html emoji_files=emoji_files %}
