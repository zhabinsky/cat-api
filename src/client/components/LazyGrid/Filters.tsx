import React from 'react';
import styled from 'styled-components';

const Filters = styled((props: LazyGridFiltersProps) => {
    const { className, onSearchChange } = props;
    return (
        <div className={className}>
            <input
                type="text"
                alt="Search the search"
                placeholder="Search..."
                onChange={(event: React.ChangeEvent) => {
                    const target = event.target as HTMLInputElement;
                    const value: string = target.value;
                    onSearchChange(value);
                }}
            />
        </div>
    );
})`
    margin-bottom: 50px;
    margin-top: 50px;

    input {
        padding: 10px 20px;
        border: none;
        box-shadow: 0px 1px 1px -1px rgba(0, 0, 0, 0.1),
            0px 1px 1px 0px rgba(0, 0, 0, 0.14),
            0px 1px 1px 0px rgba(0, 0, 0, 0.12);
        background: white;
        border-radius: 20px;
        width: 250px;
        max-width: 50vw;
        font-size: 16px;
        font-weight: 200;
    }
`;

export default Filters;

export interface LazyGridFiltersProps {
    onSearchChange: (search: string) => void;
    className?: string;
}
