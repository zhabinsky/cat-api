import Link from 'next/link';
import React from 'react';

export default (props) => {
    const { href, as, children, ...rest } = props;

    if (href.startsWith('http')) {
        // foreign link, won't wrap with next/link
        return (
            <a href={href} {...rest}>
                {children}
            </a>
        );
    }

    return (
        <Link href={href} as={as}>
            <a {...rest}>{children}</a>
        </Link>
    );
};
