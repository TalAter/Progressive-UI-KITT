# UI Patterns for Progressive Web Apps

- [Stale Content Notification](#stale-content--offline-notification)
- [Content is Cached](#content-is-cached)

## Stale Content / Offline Notification

When users visit a website, they expect the content that loads on their screen to be up to date. With service workers, it is possible that content shown from the cache is stale. This can happen either when the user is offline, or when the site uses a caching strategy that favors showing cached content over content from the network.

When this happens, communicating the state of the content to the user is important.

This can be done using an icon which denotes an "offline" state, or a message explaining the situation.

## Content is Cached

Users do not expect websites to work when they are offline. In this way, progressive web apps overdeliver on the user's expectations.

By communicating a progressive web app's offline availability, we can make sure the user knows they can visit even when they are offline.

This is best done with a message to the user.
