---
layout: page
title: Emergency Emojis
description: Lists every emergency emoji in the world.  Upload them to your slack.
---

{% assign emoji_files = site.static_files | where_exp: "file", "file.path contains '/emojis/'" | sort: "name" %}

{{ emoji_files | size }} emergency emojis.

{% include emergency-emojis-table.html emoji_files=emoji_files %}
