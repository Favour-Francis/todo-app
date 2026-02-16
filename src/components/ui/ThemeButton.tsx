import { useThemeStore } from "../../store/global";
import "../App.css";
import lightModeImg from "/images/icon-sun.svg";
import darkModeImg from "/images/icon-moon.svg";

export default function ThemeButton() {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  return (
    <div>
      <button
        onClick={() => toggleTheme()}
        className="cursor-pointer"
        type="button"
      >
        <img
          className={theme === "dark" ? "" : "hidden"}
          src={lightModeImg}
          alt="light mode"
        />
        <img
          className={theme === "light" ? "size-6" : "hidden"}
          src={darkModeImg}
          alt="dark mode"
        />
      </button>
    </div>
  );
}
