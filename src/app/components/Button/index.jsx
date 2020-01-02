import React from 'react';
import './style';

export default ({ label, children, ...props }) => (
    <button type="button" {...props} data-component="Button">{children || label}</button>
);
