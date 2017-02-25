/**
 * @namespace allure
 * @global
 */

/**
 * @function allure.createStep
 *
 * @param {string} name Step name
 * @param {function} step Step represented as function
 *
 * @return {*} Whatever step has returned
 */

/**
 * @function allure.createAttachment
 *
 * @param {string} name
 * @param {string|buffer|function} content Attachment content. If you pass Buffer or String, it will be saved to file
 *   immediately. If you are passing Function, you will get decorated function and you can call it several times to
 *   trigger attachment. General purpose of the second case is an ability to create utility function to take screenshot.
 *   You can define function for you test framework only once and then call it each time you need a screenshot.
 * @param {string} [type] Attachment MIME-type. If you omit this argument we'll try to detect type automatically via
 *   {@link https://github.com/sindresorhus/file-type file-type} library
 *
 * @return {allure.createAttachment~callback|undefined}
 */

/**
 * @callback allure.createAttachment~callback
 *
 * @param {string} name Attachment name with `{index}`-format substitution points, e.g. "Screenshot of {1} taken at {0}"
 * @param {...string} parameters Substitution parameters
 */

/**
 * Sets test description.
 *
 * @function allure.description
 *
 * @param {string} description
 */

/**
 * Sets test severity, one of: blocker, critical, normal, minor, trivial. You can also use constants like
 * allure.SEVERITY.BLOCKER.
 *
 * @function allure.severity
 *
 * @param {allure.SEVERITY|string} severity
 */

/**
 * @name allure.SEVERITY
 * @enum
 * @readonly
 *
 * @property {allure.SEVERITY} BLOCKER
 * @property {allure.SEVERITY} CRITICAL
 * @property {allure.SEVERITY} NORMAL
 * @property {allure.SEVERITY} MINOR
 * @property {allure.SEVERITY} TRIVIAL
 */

/**
 * Assigns feature to test.
 *
 * @function allure.feature
 *
 * @param {string} feature
 */

/**
 * Assigns story to test.
 *
 * @function allure.story
 *
 * @param {string} story
 */

/**
 * Provides custom argument which had been used in test. Unlike other languages, javascript test methods usually doesn't
 * have special arguments (only callbacks), so developers use other way to populate parameters to test. This method is
 * to provide them to Allure.
 *
 * @function allure.addArgument
 *
 * @param {string} name
 * @param {*} value
 */

/**
 * Saves environment value. It is similar to `addArgument` method, but it is designed to store more verbose data,
 * like HTTP-links to test page or used package version.
 *
 * @function allure.addEnvironment
 *
 * @param {string} name
 * @param {string} value
 */
