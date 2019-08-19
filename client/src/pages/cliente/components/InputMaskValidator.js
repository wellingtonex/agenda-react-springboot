import React from 'react';
import red from '@material-ui/core/colors/red';
import { ValidatorComponent } from 'react-material-ui-form-validator';
import InputMask from 'react-input-mask';

const red300 = red['500'];

const style = {
  fontSize: '12px',
  color: red300,
  position: 'absolute',
  marginTop: '8px'
};


class InputMaskValidator extends ValidatorComponent {

  render() {
    const { errorMessages, validators, requiredError, value, ...rest } = this.props;

    return (
      <div>
        <InputMask
          {...rest}
          ref={(r) => { this.input = r; }}
        />
        {'teste'}
        {this.errorText()}
      </div>
    );
  }

  errorText() {
    const { isValid } = this.state;

    if (isValid) {
      return null;
    }

    return (
      <div style={style}>
        {this.getErrorMessage()}
      </div>
    );
  }
}

export default InputMaskValidator;