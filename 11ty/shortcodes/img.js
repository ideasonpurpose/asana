/**
 * Plugin config: eleventy-img
 * Provides the {% img %} shortcode.
 * 
 * Assumes base img directory is ./src/assets/img/
 * 
 * @param {string} src   - mandatory - image path and filename
 * @param {string} alt   - mandatory - alt text
 * @param {string} eager - optional  - disables lazy-loading
 * 
 * Usage: {% img "folder/filename.jpg", "alt text", true %}
 * Output:
  <picture>
    <source type="image/webp" srcset="/assets/img/min/filename-1024.webp 1024w, /assets/img/min/filename-1208.webp 1208w" sizes="100vw">
    <source type="image/png" srcset="/assets/img/min/filename-1024.png 1024w, /assets/img/min/filename-1208.png 1208w" sizes="100vw">
    <img alt="Alt Text" loading="eager" decoding="async" src="/assets/img/min/filename-1024.png" width="1208" height="627">
  </picture>
 */

const Image = require("@11ty/eleventy-img");
const Config = require("../config.js");

module.exports = async function (src, alt, eager) {
  let metadata = await Image('./src/assets/img/' + src, {
    widths: [null, 1024, 2048],
    formats: [null, "webp"],
    urlPath: Config.BASEURL + "/assets/img/min",
    outputDir: "dist/assets/img/min"
  });

  let imageAttributes = {
    alt,
    sizes: "100vw",
    loading: eager ? "eager" : "lazy",
    decoding: "async",
  };

  return Image.generateHTML(metadata, imageAttributes);
}
