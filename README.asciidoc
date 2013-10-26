== slacker.js

== About slacker.js

Prollyfill for the HTML Resource Priorities (Draft) Specification

== Purpose & Goals

The purpose of this project is to serve as a complete prolyfill for the draft https://dvcs.w3.org/hg/webperf/raw-file/tip/specs/ResourcePriorities/Overview.html#attr-postpone[Resource Priorities spec], including support for new HTML attributes (+lazyload+ and +postpone+), a new CSS property (+resource-priorities+) and a DOM event (+lazyloaded+). This project includes built-in feature detection and, by-default, will only polyfill those forms features not present in the user's browser. 

As a prollyfill, this library's primary purpose is to serve as a proof-of-concept and testbed for conversations around the Resource Priorities specification, and *not* to serve as a cross-browser polyfill ready for production use.

This library will function as both a drop-in and opt-in prollyfill, depending on the features being used. For the +lazyload+ and +postpone+ properties, this library will automatically detect and manage these resources when included in a document. When using the +resource-priorities+ CSS property, +link+ and +style+ elements should be decorated with an attribute (+data-slacker-interpret+) that will indicate use of this property to the prollyfill.

*Goals*

- **Provide a complete Resource Priorities solution that allows developers to experiment with new attributes, CSS properties and DOM events, as defined in the spec**.
- **Provide a test bed for specified and experimental features**. As a prollyfill, the API surface of this library is not limited to those features already contained in the spec. Where it makes sense to propose new or changed features, this library can be used as a POC for those proposed changes.
- **Adapt quickly to specification changes, including those to the spec's API**. We expect this spec to change, and this library should be built in such a way that API changes are easy to absorb.

*Non-Goals*

- This library is intended to serve as a proof-of-contept for a cutting-edge web platform feature and, as such is not meant for production use. 
- As a proof-of-concept, this library will not be performance-tuned
- This library may diverge from the https://dvcs.w3.org/hg/webperf/raw-file/tip/specs/ResourcePriorities/Overview.html#attr-postpone[Resource Priorities spec] in order to add convenience features, non-standard behaviors, or to add experimental APIs for consideration by spec authors.
