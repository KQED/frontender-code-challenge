/*
 * The reason for this custom loader is so we can use global variables in our
 * SCSS partials. Files such as `src/styles/_fonts.scss` are preprocessed by
 * scss-loader to resolve the url imports. However, we don't have access to
 * that sass partial in the sass-loader itself (using the 'additionalData' option).
 * This loader takes the fully parsed css, and then does a string replacement
 * with the correct value.
 * This takes the output of the sass-loader and returns the modifed css
 */

module.exports = function (content) {
  const vars = this.getOptions().vars
  const newContent = Object.keys(vars).reduce((accum, key) => {
    return accum.replaceAll(key, vars[key])
  }, content)
  return newContent
}
