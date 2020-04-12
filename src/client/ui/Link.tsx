import Link from 'next/link';
import React from 'react';

export default (props) => {
    const { href, as, children, ...rest } = props;

    if (typeof window !== 'undefined') {
        if (window.location.pathname === href) {
            /**
             * The link points to this page
             * We will suppress route change to get rid of wobbly appearance
             */
            return (
                <a href={href} onClick={(e) => e.preventDefault()}>
                    {children}
                </a>
            );
        }
    }

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
