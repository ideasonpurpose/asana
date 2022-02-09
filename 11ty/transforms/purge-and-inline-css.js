/**
 * Transform: purge-and-inline-css
 * 
 * Remove any unused CSS on the page and inline the remaining CSS in the <head>.
 * @see {@link https://github.com/FullHuman/purgecss}
 */

const { PurgeCSS } = require('purgecss');

module.exports = async function (content, outputPath) {
  if (process.env.ELEVENTY_ENV !== 'production' || !outputPath.endsWith('.html')) {
    return content;
  }

  const purgeCSSResults = await new PurgeCSS().purge({
    content: [{ raw: content }],
    css: ['src/includes/min/main.css'],
    defaultExtractor: content => content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [],
    keyframes: true,
    safelist: {
      greedy: [
        /^menu/,
        /^search/,
        /^js/,
        /^is/,
        /^has/,
        /a11y/,
        /iop/,
        /slick/,
        /class/,
        /target/,
        /path/,
        /circle/,
        /stroke/,
        /fill/,
        /rowspan/,
        /colspan/
      ]
    }
  });

  return content.replace('<!-- INLINE CSS-->', '<style>' + purgeCSSResults[0].css + '</style>');
}
