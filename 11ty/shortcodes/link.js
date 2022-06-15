/**
 * Shortcode config: link
 * Provides the {% link %} shortcode.
 *
 * Transforms links markup according to their destination.
 *
 * @param {string} url     - mandatory - URL to transform
 * @param {string} text    - mandatory - Link text
 * @param {string} classes - optional  - additional CSS classes
 *
 * Usage:
 * External link: {% link "http://example.com", "External link", "some css classes" %}
 * Output:
 * <a class="some css classes" href="http://example.com" target="_blank" rel="external noopener"
    aria-describedby="extdisclaimer">External link<span class="a11y">opens in a new window</span></a>
 *
 * Internal link: {% link "/test", "Relative Link" %} (will add trailing slash if missing, preventing double-slash)
 * Output:
 * <a href="/{baseurl}/test/">Relative Link</a>
 */

module.exports = async function (url, text, classes) {
  const urlFilter = this.ctx._filters.url;

  const isExternal = url.startsWith("http");
  let anchor;

  if (classes) {
    classes = `class="${classes}"`;
  }

  if (isExternal) {
    anchor = `<a
            ${classes}
            href="${url}"
            target="_blank"
            rel="external noopener"
            aria-describedby="extdisclaimer">${text}<span class="a11y">opens in a new window</span></a>`;
  } else {
    const href = urlFilter(url + "/", "");
    anchor = `<a ${classes} href="${href}">${text}</a>`;
  }

  return anchor;
};
