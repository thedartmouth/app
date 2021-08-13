export const extractImageURI = (imageUUID, extension) =>
	`https://snworksceo.imgix.net/drt/${imageUUID}.sized-1000x1000.${extension}?w=800`

export const convertTag = (input, mode) => {
	switch (mode) {
		case 'api':
			return input.replace(' ', '-').toLowerCase()
		case 'view':
			if (input.toLowerCase() === 'covid-19') return 'COVID-19'
			else
				return input
					.split('-')
					.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
					.join(' ')
		default:
			return input
	}
}

export const feedSorter = (mode) => (cmsArticle1, cmsArticle2) => {
	switch (mode) {
		case 'DATE':
			return cmsArticle2.date - cmsArticle1.date
		default:
			return 0
	}
}
