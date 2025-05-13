import { useTheme } from 'next-themes';
import { FaSun, FaMoon } from 'react-icons/fa';

const Header = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="header">
      <div className="logo-title">
        <img
          src="/src/assets/logo.png"
          alt="logo"
          className="logo"
        />
        <h3>Notes</h3>
      </div>

      <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Theme">
        {theme === 'dark' ? <FaSun /> : <FaMoon />}
      </button>
    </header>
  );
};

export default Header;
