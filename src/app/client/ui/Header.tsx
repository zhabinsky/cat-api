import { ConstrainWidth, AppLogo } from '../ui';
import styled from 'styled-components';
import Link from 'next/link';
import React from 'react';

const Header = (props) => {
    return (
        <ConstrainWidth>
            <header className={props.className}>
                <AppLogo />
                <div>
                    {[
                        {
                            title: 'Documentation',
                            href: '/docs',
                        },
                        {
                            title: 'Code',
                            href: 'https://github.com/zhabinsky/cat-api',
                        },
                    ].map(({ title, ...rest }) => (
                        <Link {...rest} key={title}>
                            <a>{title}</a>
                        </Link>
                    ))}
                </div>
            </header>
        </ConstrainWidth>
    );
};

export default styled(Header)`
    padding-top: 20px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    a:not(:first-child) {
        margin-left: 10px;
    }
`;
