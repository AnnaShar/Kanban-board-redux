import React, {useState} from 'react';
import themes from '../constants/themes.js';
import languages from '../constants/languages.js';

export const UserSettingsContext = React.createContext(null);

export default ({children}) => {
    const getLanguage = () => {
        const language = localStorage.getItem('language');
        if (language){
            return JSON.parse(language);
        }
        return languages.eng;
    };

    const getTheme = () => {
        const theme = localStorage.getItem('theme');
        if (theme){
            return JSON.parse(theme);
        }
        return themes['#cea4a4'];
    };

    const [theme, setTheme] = useState(getTheme());
    const [language, setLanguage] = useState(getLanguage());
    const [isSettingsMenuOpen, setIsSettingsMenuOpen] = useState(false);

    const saveTheme = (theme) => {
        setTheme(theme)
        localStorage.setItem('theme', JSON.stringify(theme));
    };

    const saveLanguage = (language) => {
        setLanguage(language)
        localStorage.setItem('language', JSON.stringify(language));
    };

    const toggleSettings = () => {
        setIsSettingsMenuOpen(previous=> !previous);
    };

    const closeSettings = () => {
        setIsSettingsMenuOpen(false);
    };

    const settings = {
        theme,
        saveTheme,
        language,
        saveLanguage,
        isSettingsMenuOpen,
        closeSettings,
        toggleSettings
    };

    return <UserSettingsContext.Provider value={settings}>{children}</UserSettingsContext.Provider>;
}