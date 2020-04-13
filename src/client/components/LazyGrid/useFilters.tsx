import React from 'react';
import { LazyGridFilter, LazyGridFilterType } from './LazyGrid';
import styled from 'styled-components';

const FiltersContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    select,
    input {
        display: block;
        appearance: none;
        margin-bottom: 30px;
        padding: 7px 15px;
        border: none;
        box-shadow: 0px 1px 1px -1px rgba(0, 0, 0, 0.1),
            0px 1px 1px 0px rgba(0, 0, 0, 0.14),
            0px 1px 1px 0px rgba(0, 0, 0, 0.12);
        background: white;
        border-radius: 20px;
        font-size: 16px;
        font-weight: 200;
        margin-right: 10px;
        width: 280px;
        max-width: 45vw;
    }

    @media (max-width: 700px) {
        flex-direction: column;
        select,
        input {
            margin-right: unset;
        }
    }
`;

const prepareFilters = (filterConfigs, appliedFilters) => {
    const preparedFilters = {};

    filterConfigs.forEach(filterConfig => {
        const { parameterName, defaultValue } = filterConfig as LazyGridFilter;

        let appliedValue = appliedFilters[parameterName];

        if (typeof appliedValue !== 'string') {
            appliedValue = defaultValue;
        }

        if (typeof appliedValue === 'string') {
            // we want to communicate string values only
            preparedFilters[parameterName] = appliedValue;
        }
    });

    return preparedFilters;
};

const useFilters = filterConfigs => {
    const [filterData, setFilterData] = React.useState({
        filterId: 0,
        filters: {},
    });

    const currentFilters = prepareFilters(filterConfigs, filterData.filters);

    const setParameter = (parameterName, value) => {
        setFilterData({
            filterId: filterData.filterId + 1,
            filters: {
                ...filterData.filters,
                [parameterName]: value,
            },
        });
    };

    const filterElements = (
        <FiltersContainer>
            {filterConfigs.map(filter => {
                const { parameterName, title } = filter;
                switch (filter.type) {
                    case LazyGridFilterType.Input: {
                        return (
                            <input
                                key={parameterName}
                                title={title}
                                type="text"
                                alt={title}
                                placeholder={title}
                                onChange={(event: React.ChangeEvent) => {
                                    const target = event.target as HTMLInputElement;
                                    const value: string = target.value;
                                    setParameter(parameterName, value);
                                }}
                            />
                        );
                    }
                    case LazyGridFilterType.Select: {
                        return (
                            <select
                                name={title}
                                onChange={(
                                    event: React.FormEvent<HTMLSelectElement>,
                                ) => {
                                    var value: string =
                                        event.currentTarget.value;
                                    setParameter(parameterName, value);
                                }}
                            >
                                {filter.options.map(option => (
                                    <option value={option.value}>
                                        {capitalizeFirstLetter(
                                            option.key.toLowerCase(),
                                        )}
                                    </option>
                                ))}
                            </select>
                        );
                    }
                    default: {
                        return null;
                    }
                }
            })}
        </FiltersContainer>
    );

    return {
        currentFilters,
        filterElements,
        filterId: filterData.filterId,
    };
};

export default useFilters;

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
