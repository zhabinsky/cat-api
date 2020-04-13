import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
	body {
		padding: 0;
		margin: 0;
		background: #f5f5f5;
		font-family: 'Roboto', sans-serif;
		touch-action: manipulation;
	}

	button, input {
		transition: transform 0.1s ease-in;
		:focus {
			outline: none;
			box-shadow: 0px 0px 10px 0px rgba(102,10,102,0.2);
		}
	}

	a {
		text-decoration: unset;
		color: unset;
	}

    @keyframes animation-rotate {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

`;
