import React, {useContext, useRef} from 'react';
import {CirclePicker} from 'react-color';
import Select from 'react-select';
import useOnClickOutside from 'use-onclickoutside';
import {UserSettingsContext} from '../context-store/user-settings-context.js';
import themes from '../constants/themes.js';
import languages from '../constants/languages.js';
import texts from '../constants/texts.js';
import './BoardSettings.css';


export const BoardSettings = () => {
    const {theme, saveTheme, language, saveLanguage, closeSettings} = useContext(UserSettingsContext);
    const closingRef = useRef();
    useOnClickOutside(closingRef, closeSettings);

    const handleColorChange = (color) => {
        saveTheme(themes[color.hex]);
    }
    const handleLanguageChange = (language) => {
        saveLanguage(languages[language.value]);
    }

    return (
        <div
            ref={closingRef}
            className='board__settings'>

            <h2>{texts.settings.header[language.value]}</h2>
            <div className='setting-item theme-settings'>
                <div className='setting-item__header'>
                    {texts.settings.chooseTheme[language.value]}
                </div>
                <div className='setting-item__body'>
                    <CirclePicker
                        color={theme.base}
                        colors={Object.keys(themes)}
                        onChange={handleColorChange}
                    />
                </div>
            </div>

            <div className='setting-item theme-settings'>
                <div className='setting-item__header'>
                    {texts.settings.chooseLanguage[language.value]}
                </div>
                <div className='setting-item__body'>
                    <Select
                        defaultValue={language}
                        options={Object.values(languages)}
                        onChange={handleLanguageChange}
                        theme={(themeSelect) => ({
                            ...themeSelect,
                            colors: {
                                ...themeSelect.colors,
                                primary50: theme.light,
                                primary25: theme.light,
                                primary: theme.base,
                            },
                        })}
                    />
                </div>
            </div>
        </div>
    )
}