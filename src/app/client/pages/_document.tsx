import React from 'react'
import Document, {Head, Main, NextScript} from 'next/document'
import {ServerStyleSheet} from 'styled-components'

interface DocumentProps {
	styleTags: Array<Element>
}

export default class MyDocument extends Document {
	static getInitialProps({renderPage}) {
		const sheet = new ServerStyleSheet()

		const page = renderPage((App) => {
			return (props) => {
				return sheet.collectStyles(<App {...props}></App>)
			}
		})

		const styleTags = sheet.getStyleElement()
		return {...page, styleTags}
	}

	render() {
		const props = (this.props as unknown) as DocumentProps

		return (
			<html>
				<Head>
					{props.styleTags}
					<link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,300;1,500&display=swap" rel="stylesheet"></link>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</html>
		)
	}
}
