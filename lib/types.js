/**
 * @typedef {Object} Author
 * @property {String} slug
 * @property {String} name
 */

/**
 * @typedef {Object} Article
 * @property {String} slug
 * @property {String[]} tags
 * @property {String} category
 * @property {String} imageURI
 * @property {String} headline
 * @property {String} abstract
 * @property {body} abstract
 * @property {Author[]} authors
 */

import { extractImageURI } from './utils'

/**
 * 
 * @param {*} cmsArticle 
 * @returns {Article} converted article
 */
const articleConverter = (cmsArticle) => {
	return {
		slug: cmsArticle.slug,
		tags: cmsArticle.tags.map(cmsTag => cmsTag?.name),
		category: cmsArticle.tags ? cmsArticle.tags[0]?.name : null,
		imageURI: extractImageURI(cmsArticle.dominantMedia.attachment_uuid, cmsArticle.dominantMedia.extension || cmsArticle.dominantMedia.preview_extension),
		headline: cmsArticle.headline,
		abstract: cmsArticle.abstract,
		body: cmsArticle.content,
		authors: cmsArticle.authors.map(authorConverter)
	}
}

const authorConverter = (cmsAuthor) => {
	return {
		slug: cmsAuthor.slug,
		name: cmsAuthor.name
	}
}

export { articleConverter, authorConverter }