import React from 'react';
import styled from 'styled-components';
import { ConstrainWidth, PrettyError } from '../ui';
import { PageDecorator } from '../decorators';

const Page = styled((props) => (
    <PageDecorator {...props}>
        <ConstrainWidth>
            <div className="content">
                <PrettyError>
                    <h3>Oops...</h3>
                    This resource could not be found
                </PrettyError>
            </div>
        </ConstrainWidth>
    </PageDecorator>
))`
    div.bg {
        background: none;
    }

    footer {
        background: none;
    }

    main {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
    }

    h3 {
        margin: 0 0 5px 0;
    }
`;

export default Page;
