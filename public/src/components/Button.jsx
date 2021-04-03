import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Button = ({ onClick, className, outline, children }) => {
  // console.log(props)
  return (
    <button
      onClick={onClick}
      className={classNames('button', className, {
        'button--outline': outline,
      })}>
      {children}
    </button>
  );
}

Button.propTypes = {//onClick может быть только функция
  onClick: PropTypes.func,
};


export default Button;
