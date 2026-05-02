---
layout: page
title: Templates
permalink: /templates/
description: Download document templates.
---

{% assign template_files = site.static_files | where_exp: "file", "file.path contains '/templates/' and site.data.template_formats contains file.extname" | sort: "name" %}

<p><strong>{{ template_files | size }}</strong> document templates.</p>

{% if template_files.size > 0 %}
<div class="overflow-auto">
  <table class="striped">
    <thead>
      <tr>
        <th>Template</th>
        <th>Format</th>
      </tr>
    </thead>
    <tbody>
      {% for file in template_files %}
      <tr>
        <td><a href="{{ file.path | relative_url }}">{{ file.name }}</a></td>
        <td><code>{{ file.extname | remove_first: "." | upcase }}</code></td>
      </tr>
      {% endfor %}
    </tbody>
  </table>
</div>
{% else %}
<p>Add Office or LibreOffice documents to the <code>templates/</code> directory and they will appear here.</p>
{% endif %}
