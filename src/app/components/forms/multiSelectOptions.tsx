
import React, { Component } from "react";
import MultiSelect, { components, DropdownIndicatorProps,} from "react-select";
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';

const Option = (props: any) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
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
                    border: 'none'
                }}>
                <MdOutlineKeyboardArrowDown size={'0.9rem'} color="#6A5DDF" />
            </div>
        </components.DropdownIndicator>
    );
};

export default class Example extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      optionSelected: null
    };
  }

  handleChange = (selected: any) => {
    this.setState({
      optionSelected: selected
    });
  };

 colourOptions = [
    { value: "ocean1", label: "Ocean" },
    { value: "blue", label: "Blue" },
    { value: "purple", label: "Purple" },
    { value: "red", label: "Red" },
    { value: "orange", label: "Orange" },
    { value: "yellow", label: "Yellow" },
    { value: "green", label: "Green" },
    { value: "forest", label: "Forest" },
    { value: "slate", label: "Slate" },
    { value: "silver", label: "Silver" }
  ];

  render() {
    return (
        <MultiSelect
        options={this.colourOptions}
        isMulti
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        isClearable={false}
        components={{
          Option,
          DropdownIndicator,
        }}
        onChange={this.handleChange}
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
                display: 'none'
              };
            },
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
      }}
      />
    );
  }
}
