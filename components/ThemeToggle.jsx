'use client';

import { BsMoonFill, BsSunFill } from 'react-icons/bs';
import { useState } from 'react';

const themes = {
  winter: 'winter',
  synthwave: 'synthwave',
};

const ThemeToggle = () => {
  const [theme, setTheme] = useState(themes.winter);

  //toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === themes.winter ? themes.synthwave : themes.winter;
    document.documentElement.setAttribute('data-theme', newTheme);
    setTheme(newTheme);
  };

  return (
    <button onClick={toggleTheme} className='btn btn-outline btn-sm'>
      {theme === themes.winter ? <BsMoonFill /> : <BsSunFill />}
    </button>
  );
};
export default ThemeToggle;
