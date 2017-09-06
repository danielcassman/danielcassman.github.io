---
title: Technology
---

<ul>
{% for post in site.categories.technology %}
    <li><a href="{{ post.url }}">{{ post.title }}</a></li>
{% endfor %}
</ul>
