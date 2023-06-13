import React from 'react';
import Select, {
    components,
    DropdownIndicatorProps,
    IndicatorsContainerProps,
    MenuListProps,
} from 'react-select';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

const SelectOptions = ({ options, placeholder, isHourSelector }: any) => {
    const DropdownIndicator = (props: DropdownIndicatorProps<any, true>) => {
        return (
            <components.DropdownIndicator {...props}>
                {isHourSelector ? (
                    <div
                        className="d-flex align-items-center justify-content-center"
                        style={{
                            width: '1rem',
                            height: '1rem',
                            border: 'none',
                        }}>
                        <MdOutlineKeyboardArrowDown
                            size={'1rem'}
                            color="#707070"
                        />
                    </div>
                ) : (
                    <div
                        className="d-flex align-items-center justify-content-center"
                        style={{
                            backgroundColor: '#CDC9ED',
                            borderRadius: '50%',
                            width: '1rem',
                            height: '1rem',
                            border: 'none',
                        }}>
                        <MdOutlineKeyboardArrowDown
                            size={'0.9rem'}
                            color="#6A5DDF"
                        />
                    </div>
                )}
            </components.DropdownIndicator>
        );
    };

    const IndicatorsContainer = (
        props: IndicatorsContainerProps<any, true>,
    ) => {
        return (
            <div className="">
                <components.IndicatorsContainer {...props} />
            </div>
        );
    };

    const MenuList = (props: MenuListProps<any | any, true, any>) => {
        return (
            <components.MenuList {...props}>
                {props.children}
            </components.MenuList>
        );
    };

    return (
        <>
            {isHourSelector ? (
                <Select
                    options={options}
                    placeholder={placeholder}
                    components={{
                        DropdownIndicator,
                        IndicatorsContainer,
                        MenuList,
                    }}
                    styles={{
                        control: (base, state) => ({
                            ...base,
                            height: '36px',
                            width: '8.75rem',
                            borderRadius: '3.41px',
                            paddingTop: '0',
                            fontWeight: '400',
                            fontSize: '0.625rem',
                            lineHeight: '0.75rem',
                            border: state.isFocused
                                ? '0.7px solid #6A5DDF'
                                : '0.7px solid #D3D3D3',
                            boxShadow: 'none',
                            '&:hover': {},
                        }),
                        singleValue: (base) => ({
                            ...base,
                            fontWeight: '400',
                            fontSize: '0.625rem',
                            lineHeight: '0.75rem',
                            marginLeft: '-0.01rem',
                            border: 'none',
                        }),
                        valueContainer: (base) => ({
                            ...base,
                            height: '36px',
                            border: 'none',
                            padding: '12.25px 16px',
                        }),
                        menuList: (base) => ({
                            ...base,
                            width: '8.75rem',
                            border: 'none',
                            padding: '16px 22px',
                            borderRadius: '3.41px',
                            fontSize: '0.8rem',
                            lineHeight: '1rem',
                        }),
                        option: (
                            base,
                            { isDisabled, isFocused, isSelected },
                        ) => {
                            return {
                                ...base,
                                backgroundColor: isDisabled
                                    ? undefined
                                    : isSelected
                                    ? '#9B93E8'
                                    : isFocused
                                    ? '#dedde5'
                                    : undefined,
                                color: isDisabled
                                    ? '#ccc'
                                    : isSelected
                                    ? '#9B93E8'
                                        ? 'white'
                                        : 'black'
                                    : '#000',
                                cursor: isDisabled ? 'not-allowed' : 'default',
                                borderRadius: '3.41px',
                                ':active': {
                                    ...base[':active'],
                                    backgroundColor: !isDisabled
                                        ? isSelected
                                            ? '#9B93E8'
                                            : '#9B93E8'
                                        : undefined,
                                },
                            };
                        },
                        placeholder: (base) => ({
                            color: '#D3D3D3',
                            border: 'none',
                        }),
                        input: (base, state) => ({
                            ...base,
                            height: '36px',
                            width: '1px',
                            marginTop: '-4.4rem',
                            zIndex: '-3',
                            border: 'none',
                        }),
                    }}
                />
            ) : (
                <Select
                    options={options}
                    placeholder={placeholder}
                    components={{
                        DropdownIndicator,
                        IndicatorsContainer,
                        MenuList,
                    }}
                    styles={{
                        control: (base, state) => ({
                            ...base,
                            height: '36px',
                            width: '12rem',
                            borderRadius: '3.41px',
                            paddingTop: '0',
                            fontWeight: '400',
                            fontSize: '0.625rem',
                            lineHeight: '0.75rem',
                            border: state.isFocused
                                ? '0.7px solid #6A5DDF'
                                : '0.7px solid #D3D3D3',
                            boxShadow: 'none',
                            '&:hover': {},
                        }),
                        singleValue: (base) => ({
                            ...base,
                            fontWeight: '400',
                            fontSize: '0.625rem',
                            lineHeight: '0.75rem',
                            marginLeft: '-0.01rem',
                            border: 'none',
                        }),
                        valueContainer: (base) => ({
                            ...base,
                            height: '36px',
                            border: 'none',
                            padding: '12.25px 16px',
                        }),
                        menuList: (base) => ({
                            ...base,
                            width: '12rem',
                            border: 'none',
                            padding: '16px 22px',
                            borderRadius: '3.41px',
                            fontSize: '0.8rem',
                            lineHeight: '1rem',
                        }),
                        option: (
                            base,
                            { isDisabled, isFocused, isSelected },
                        ) => {
                            return {
                                ...base,
                                backgroundColor: isDisabled
                                    ? undefined
                                    : isSelected
                                    ? '#9B93E8'
                                    : isFocused
                                    ? '#dedde5'
                                    : undefined,
                                color: isDisabled
                                    ? '#ccc'
                                    : isSelected
                                    ? '#9B93E8'
                                        ? 'white'
                                        : 'black'
                                    : '#000',
                                cursor: isDisabled ? 'not-allowed' : 'default',
                                borderRadius: '3.41px',
                                ':active': {
                                    ...base[':active'],
                                    backgroundColor: !isDisabled
                                        ? isSelected
                                            ? '#9B93E8'
                                            : '#9B93E8'
                                        : undefined,
                                },
                            };
                        },
                        placeholder: (base) => ({
                            color: '#D3D3D3',
                            border: 'none',
                        }),
                        input: (base, state) => ({
                            ...base,
                            height: '36px',
                            width: '1px',
                            marginTop: '-4.4rem',
                            zIndex: '-3',
                            border: 'none',
                        }),
                    }}
                />
            )}
        </>
    );
};

export default SelectOptions;
