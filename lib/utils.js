export const extractImageURI = (imageUUID, extension) =>
	`https://snworksceo.imgix.net/drt/${imageUUID}.sized-1000x1000.${extension}`

export const convertTag = (input) => {
	switch (input) {
		default:
			return input
	}
}
