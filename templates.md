---
layout: page
title: Templates
permalink: /templates/
description: Docs that help organize yr life
---

{% assign template_files = site.static_files | where_exp: "file", "file.path contains '/templates/'" | sort: "name" %}
{% assign template_count = 0 %}
{% for file in template_files %}
  {% assign file_extname = file.extname | downcase %}
  {% assign show_file = false %}
  {% for format in site.data.template_formats %}
    {% if file_extname == format %}
      {% assign show_file = true %}
    {% endif %}
  {% endfor %}
  {% if show_file %}
    {% assign template_count = template_count | plus: 1 %}
  {% endif %}
{% endfor %}


{% if template_count > 0 %}
{% for file in template_files %}
{% assign file_extname = file.extname | downcase %}
{% assign show_file = false %}
{% for format in site.data.template_formats %}
{% if file_extname == format %}
{% assign show_file = true %}
{% endif %}
{% endfor %}
{% if show_file %}
- [{{ file.name }}]({{ file.path | relative_url }}) `{{ file_extname | remove_first: "." | upcase }}`
{% endif %}
{% endfor %}
{% else %}
Add Office or LibreOffice documents to the `templates/` directory and they will appear here.
{% endif %}
