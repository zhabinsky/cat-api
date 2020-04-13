import React from 'react';
import { LazyGridFilter, LazyGridFilterType } from './LazyGrid';
import styled from 'styled-components';

const FiltersContainer = styled.div`
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    input {
        padding: 7px 15px;
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
                const { parameterName } = filter;
                switch (filter.type) {
                    case LazyGridFilterType.Input: {
                        return (
                            <input
                                key={parameterName}
                                title={filter.title}
                                type="text"
                                alt={filter.title}
                                placeholder={filter.title}
                                onChange={(event: React.ChangeEvent) => {
                                    const target = event.target as HTMLInputElement;
                                    const value: string = target.value;
                                    // onFiltersChange(value);
                                    setParameter(filter.parameterName, value);
                                }}
                            />
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
