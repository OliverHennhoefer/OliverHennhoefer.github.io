---
layout: page
title: Writing
permalink: /writing/
---

Short notes and occasional longer posts. This section is intentionally secondary to the research and project pages.

{%- assign posts = site.posts | where_exp: "post", "post.draft != true" -%}
{%- if posts.size > 0 -%}
<ul class="post-list page-post-list">
  {%- assign date_format = site.minima.date_format | default: "%b %-d, %Y" -%}
  {%- for post in posts -%}
  <li class="post-item">
    <span class="post-date">{{ post.date | date: date_format }}</span>
    <a class="post-link" href="{{ post.url | relative_url }}">{{ post.title | escape }}</a>
  </li>
  {%- endfor -%}
</ul>
{%- else -%}
No posts yet.
{%- endif -%}
