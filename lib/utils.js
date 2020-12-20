export const extractImageURI = (imageUUID, extension) =>
	`https://snworksceo.imgix.net/drt/${imageUUID}.sized-1000x1000.${extension}`

export const convertTag = (input, mode) => {
	switch (mode) {
		case 'api':
			return input.replace(' ', '-').toLowerCase()
		case 'view':
			if (input.toLowerCase() === 'covid-19') return 'COVID-19'
			else return input.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
		default:
			return input
	}
}
