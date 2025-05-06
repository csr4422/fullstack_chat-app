import { useThemeStore } from "../store/useThemeStore";
import { Moon, Sun } from "lucide-react";

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme); // Optional: persist between reloads
  };

  return (
    <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl">
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold">Theme</h2>
          <p className="text-sm text-base-content/70">
            Toggle between light and dark mode for your chat interface
          </p>
        </div>

        <div className="flex">
          <button
            onClick={toggleTheme}
            className="group flex flex-col items-center gap-1.5 p-3 rounded-lg transition-colors hover:bg-base-200/50 bg-base-200"
          >
           
            <span className="flex items-center gap-1 text-sm font-medium">
              {theme === "light" ? (
                <>
                  <Moon className="w-4 h-4" />
                </>
              ) : (
                <>
                  <Sun className="w-4 h-4" />
                </>
              )}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
