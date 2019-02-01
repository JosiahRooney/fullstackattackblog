---
path: '/query-string-parameters-and-cache-busting'
title: Query String Parameters and Cache Busting
date: '2019-01-31T20:34:55.583Z'
tags: ['css', 'cache', 'query string']
published: true
---

[Skip to the TL;DR](#tldr)

In my previous post, I used a screenshot from a Facebook group I'm in where someone was asking why some urls will contain a question mark (?) at the end with some characters. I thought this would be a great opportunity to explain what query parameters are and how they are sometimes used to force a website to ignore cache.

### Cache

I won't go into great detail on how caching works, instead I will give a high level overview of query parameters and busting cache. We've all been there while making changes to a website and we notice they aren't showing up, even when we mash ![alt text](refresh.png "Ctrl + R keys - author http://www.iconarchive.com/artist/chromatix.html")

That is because cache is making our lives easier... sort of. Cache is great. It speeds up subsequent loads of a web page so we don't need to download all the giant images every single time. However, when developing code, cache can be a big pain. In a development environment, cache should not be getting in our way. Thankfully there are [ways](https://www.technipages.com/google-chrome-how-to-completely-disable-cache) [to](https://dzone.com/articles/how-turn-firefox-browser-cache) [avoid](https://stackoverflow.com/a/46326832) it.

What about the end user, the person you are developing your fancy new website for? It's not feasible to get every person on earth to disable their cache (nor would it even be advisable!). We want our users to enjoy the benefits of caching, right? So what do we do when user A sees a different version of your code than user B does? That's not a good experience for them. Thankfully, query string parameters are to the rescue!

### Query String Parameters

Let's quickly review what query string parameters are and what purpose they serve. A quest string is part of a URL that contains key/value pairs. For example:

```
http://example.com/page/?name=joe&age=5&refer=true
```

would result in key value pairs like so:

| key | value |
|---|---|
| name | joe |
| age | 5 |
| refer | true |

Query strings are used to send data from one page to another in a public, insecure way. It's fine to send data this way as long as it isn't sensitive data (financial, health, personal data). When you perform searches on Google.com, you can see your query in the query string. For instance, if you search for "cats", your URL will look like `https://www.google.com/search?q=cats`. Of course it might have many more query parameters, but it will always have `q=cats` for that search.

#### get to the point

Okay okay! So we know what cache is, and we know what query string parameters are. So what do they have to do with each other? Well, when a resource (CSS file, for instance) is requested from a server, your browser will try to cache it. Even if the file changes, your browser will often ignore that fact and keep the outdated version. Here's where query parameters come in. Every request to `/styles/theme.css` will be cached, no matter what changes happen to the file. However, if you add query string parameters to the URL and change them every time you make a change, it will force your browser to fetch the new file. So instead of `/styles/theme.css` we would have `/styles/theme.css?version=1.3` (as an example). The next time you update your stylesheet, simply increment the version. A request to `/styles/theme.css?version=1.4` would force your browser to download that resource, effectively "busting" the cache.

This is a common approach taken by major libraries like Bootstrap. We also do this at my work. It ensures all of our users are seeing exactly the same design and layout.

### TL;DR <a name="tldr"></a>

You can use query string parameters in CSS file urls to force your user's browser to ignore cache and ensure all users see the same design.

I hope this helped! And as always, feel free to leave me a note below with your thoughts. Cheers