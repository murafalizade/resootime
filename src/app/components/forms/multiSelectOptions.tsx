import React from 'react';
import MultiSelect, { components, DropdownIndicatorProps } from 'react-select';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

const MultiSelectOptions = ({ options, placeholder }: any) => {
    const [optionSelected, setOptionSelected] = React.useState<any>(null);
    const handleChange = (selected: any) => {
        setOptionSelected(selected);
    };

    const Option = (props: any) => {
        return (
            <div>
                <components.Option {...props}>
                    <div className="checkbox-container">
                        <input
                            type="checkbox"
                            checked={props.isSelected}
                            onChange={() => null}
                            className="checkbox-input"
                        />{' '}
                        <span className="checkmark"></span>
                        <label className="checkbox-label">{props.label}</label>
                    </div>
                </components.Option>
            </div>
        );
    };

    const DropdownIndicator = (props: DropdownIndicatorProps<any, true>) => {
        return (
            <components.DropdownIndicator {...props}>
                <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                        backgroundColor: '#CDC9ED',
                        borderRadius: '50%',
                        width: '1rem',
                        height: '1rem',
                    }}>
                    <MdOutlineKeyboardArrowDown
                        size={'0.9rem'}
                        color="#6A5DDF"
                    />
                </div>
            </components.DropdownIndicator>
        );
    };

    const MoreSelectedBadge = ({ items }: any) => {
        const style = {
            fontSize: '0.625rem',
            fontWeight: '400',
            lineHeight: '0.75rem',
        };

        const title = items.join(', ');
        const length = items.length;
        const label = `${length} seçildi`;

        return (
            <div style={style} title={title}>
                {label}
            </div>
        );
    };

    const MultiValue = ({ index, getValue, ...props }: any) => {
        const maxToShow = 0;
        const overflow = getValue()
            .slice(maxToShow)
            .map((x: any) => x.label);

        return index < maxToShow ? (
            <components.MultiValue {...props} />
        ) : index === maxToShow ? (
            <MoreSelectedBadge items={overflow} />
        ) : null;
    };

    return (
        <MultiSelect
            options={options}
            placeholder={placeholder}
            isMulti
            closeMenuOnSelect={false}
            hideSelectedOptions={false}
            isClearable={false}
            components={{
                Option,
                DropdownIndicator,
                MultiValue,
            }}
            onChange={handleChange}
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
                multiValue: () => {
                    return {
                        // display: 'none'
                    };
                },
                valueContainer: (base) => ({
                    ...base,
                    height: '36px',
                    padding: '12.25px 16px',
                }),
                menuList: (base) => ({
                    ...base,
                    width: '12rem',
                    border: 'none',
                    padding: '14px 14px',
                    borderRadius: '3.41px',
                    fontSize: '0.8rem',
                    lineHeight: '1rem',
                }),
                option: (base, { isDisabled, isFocused, isSelected }) => {
                    return {
                        ...base,
                        backgroundColor: isDisabled
                            ? undefined
                            : isSelected
                            ? 'transparent'
                            : isFocused
                            ? 'transparent'
                            : undefined,
                        color: isDisabled
                            ? '#ccc'
                            : isSelected
                            ? 'transparent'
                                ? 'black'
                                : 'black'
                            : '#000',
                        cursor: isDisabled ? 'not-allowed' : 'default',
                        borderRadius: '3.41px',
                        ':active': {
                            ...base[':active'],
                            backgroundColor: !isDisabled
                                ? isSelected
                                    ? 'transparent'
                                    : 'transparent'
                                : undefined,
                        },
                    };
                },
                placeholder: (base) => ({
                    color: '#D3D3D3',
                    border: 'none',
                }),
                input: (base) => ({
                    ...base,
                    height: '36px',
                    width: '1px',
                    marginTop: '-4.4rem',
                    zIndex: '-3',
                    border: 'none',
                }),
                //   dropdownIndicator: (base, state: DropdownIndicatorProps<any, true>) => ({
                //     transform: state.selectProps.menuIsOpen && 'rotate(180deg)',
                //     marginRight: '18px',
                // }),
                indicatorSeparator: () => ({
                    display: 'none',
                }),
            }}
        />
    );
};

export default MultiSelectOptions;
