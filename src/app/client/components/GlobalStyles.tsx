import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
	body {
		padding: 0 0 90px 0;
		margin: 0;
		background: #f5f5f5;
	}

	* {
		font-family: 'Roboto', sans-serif;
	}

	#__next {
		max-width: 1000px;
		margin: 0 auto;

		@media (max-width: ${1000 + 15 * 2}px) {
			padding: 0 15px;
		}
	}

	h1, h2, h3, h4 {
		font-weight: 700;
	}
`;
