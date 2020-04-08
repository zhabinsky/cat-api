import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
	body {
		padding: 0 0 90px 0;
		margin: 0;
	}

	#__next {
		max-width: 1000px;
		margin: 0 auto;
	}

	h1, h2, h3, h4 {
		font-family: 'Comic Neue', cursive;
		font-weight: 700;
	}
`;