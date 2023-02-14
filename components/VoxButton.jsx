import React from 'react'
import { Button } from 'react-native-elements'
import { Colors, Typography } from '../constants'

const VoxButton = (props) => {
	let primaryColor = Colors.green
	let secondaryColor = Colors.paper
	switch (props.hue) {
		case 'green':
			primaryColor = Colors.green
			secondaryColor = Colors.paper
			break
		case 'gray':
			primaryColor = Colors.shade
			secondaryColor = Colors.charcoal
			break
		default:
			primaryColor = Colors.green
			secondaryColor = Colors.paper
			break
	}
	const titleStyle = {
		...Typography.sansRegular,
		...Typography.h3,
		marginHorizontal: 18,
	}
	const buttonStyle = {}
	const containerStyle = {}
	switch (props.variant) {
		case 'filled':
			titleStyle.color = secondaryColor
			buttonStyle.color = secondaryColor
			buttonStyle.backgroundColor = primaryColor
			break
		case 'hollow':
			titleStyle.color = primaryColor
			buttonStyle.color = primaryColor
			buttonStyle.backgroundColor = secondaryColor
			buttonStyle.borderStyle = 'solid'
			buttonStyle.borderWidth = 0
			buttonStyle.borderColor = primaryColor
			break
		default:
			titleStyle.color = secondaryColor
			buttonStyle.color = secondaryColor
			buttonStyle.backgroundColor = primaryColor
			break
	}
	if (props.flex) {
		containerStyle.flex = props.flex
	}
	return (
		<Button
			{...props}
			buttonStyle={buttonStyle}
			titleStyle={titleStyle}
		></Button>
	)
}

export default VoxButton
