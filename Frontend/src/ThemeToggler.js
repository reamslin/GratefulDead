import React from 'react';
import Switch from '@material-ui/core/Switch';

export default function ThemeToggler({ isLight, toggleTheme }) {
    const handleChange = (event) => {
        toggleTheme(isLight)
    };

    return (
        <div>
            <Switch
                checked={!isLight}
                onChange={handleChange}
            />
        </div>
    );
}