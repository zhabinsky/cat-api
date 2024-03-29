import { ConstrainWidth, AppLogo, Link } from '../ui';
import styled from 'styled-components';
import React from 'react';

const Header = props => {
    return (
        <ConstrainWidth>
            <header className={props.className}>
                <AppLogo />
                <nav>
                    {[
                        {
                            title: 'GQ',
                            href: '/api/graphql',
                        },
                        {
                            title: 'Code',
                            href: 'https://github.com/zhabinsky/cat-api',
                        },
                    ].map(({ title, ...rest }) => (
                        <Link {...rest} key={title}>
                            {title}
                        </Link>
                    ))}
                </nav>
            </header>
        </ConstrainWidth>
    );
};

export default styled(Header)`
    a:not(:first-child) {
        margin-left: 10px;
    }
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding-top: 20px;
    padding-bottom: 20px;
`;
