// (C) Copyright 2014-2016 Hewlett Packard Enterprise Development LP

import React, { Component, PropTypes } from 'react';
import Button from 'grommet/components/Button';
import Box from 'grommet/components/Box';
import Select from 'grommet/components/Select';
import AscIcon from 'grommet/components/icons/base/LinkDown';
import DescIcon from 'grommet/components/icons/base/LinkUp';

export default class Sort extends Component {

  constructor (props) {
    super(props);
    this._onChange = this._onChange.bind(this);
    this._onChangeDirection = this._onChangeDirection.bind(this);
  }

  _onChange (event) {
    const { direction, onChange } = this.props;
    const value = event.option.value;
    const nextDirection = event.option.direction || direction || 'desc';
    onChange({ value: value, direction: nextDirection });
  }

  _onChangeDirection (direction) {
    const { onChange, value } = this.props;
    onChange({ value: value, direction: direction });
  }

  render () {
    const { options, value, direction, ...props } = this.props;
    let label;
    if (value) {
      label = options.filter(option => option.value === value)[0].label;
    }

    return (
      <Box {...props} direction='row' justify='start' align='center'
        responsive={false}>
        <Select value={label} options={options} onChange={this._onChange} />
        <Box direction='row' flex={false} responsive={false} align='center'>
          <Button
            icon={<AscIcon
                colorIndex={direction === 'asc' ? 'brand' : undefined} />}
            onClick={this._onChangeDirection.bind(this, 'asc')} />
          <Button
            icon={<DescIcon
                colorIndex={direction === 'desc' ? 'brand' : undefined} />}
            onClick={this._onChangeDirection.bind(this, 'desc')} />
        </Box>
      </Box>
    );
  }
}

Sort.propTypes = {
  direction: PropTypes.oneOf(['asc', 'desc']),
  onChange: PropTypes.func, // { value: , direction: }
  options: PropTypes.arrayOf(PropTypes.shape({
    direction: PropTypes.oneOf(['asc', 'desc']),
    label: PropTypes.string,
    value: PropTypes.string.isRequired
  })).isRequired,
  value: PropTypes.string
};
