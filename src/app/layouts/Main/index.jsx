import React from 'react';
import './style';

export default ({ children }) => {
    console.log('Layout_Main updated');

    return (
        <div data-component="Layout_Main">
            {children}
        </div>
    );
};
