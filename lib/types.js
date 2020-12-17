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
 * @property {String} body
 * @property {Author[]} authors
 */

import { extractImageURI } from './utils'

const articleFilter = (cmsArticle) => {
	return cmsArticle.dominantMedia.type !== 'youtube'
}

/**
 *
 * @param {*} cmsArticle
 * @returns {Article} converted article
 */
const articleConverter = (cmsArticle) => {
	const originalDate = cmsArticle.published_at
	const date = originalDate
		? new Date(
				parseInt(originalDate.substring(0, 4)),
				parseInt(originalDate.substring(5, 7)),
				parseInt(originalDate.substring(8, 10)),
				parseInt(originalDate.substring(11, 13)),
				parseInt(originalDate.substring(14, 16))
		  )
		: null
	return {
		slug: cmsArticle.slug,
		tags: cmsArticle.tags.map((cmsTag) => cmsTag?.name),
		date,
		category: cmsArticle.tags ? cmsArticle.tags[0]?.name : null,
		imageURI: extractImageURI(
			cmsArticle.dominantMedia.attachment_uuid,
			cmsArticle.dominantMedia.extension ||
				cmsArticle.dominantMedia.preview_extension
		),
		headline: cmsArticle.headline,
		abstract: cmsArticle.abstract,
		body: cmsArticle.content,
		authors: cmsArticle.authors.map(authorConverter),
		read: null,
		bookmarked: null,
	}
}

const authorConverter = (cmsAuthor) => {
	return {
		slug: cmsAuthor.slug,
		name: cmsAuthor.name,
		reads: null,
		followers: null,
		following: null,
	}
}

export { articleFilter, articleConverter, authorConverter }
