import logo from '../imgs/logo ai.jpeg';
import us from '../imgs/us.png';
import ar from '../imgs/sy.png';
import tr from '../imgs/tr.png';
import { useState, useEffect } from 'react';
import "../App.css";
import { useTranslation } from 'react-i18next';
import { IoCloudyNightSharp } from "react-icons/io5";
import { FaCloudSun } from "react-icons/fa";




export default function Header(){
    const LANGUAGES = [
                        { id: "ar", label: "العربية", flag: "🇦🇷" },
                        { id: "us", label: "English", flag: "🇺🇸" },
                        { id: "tr", label: "Türkçe", flag: "🇹🇷" },
                        ];

    const [language, setLanguage] = useState(LANGUAGES[2]);
    const [open, setOpen] = useState(false);
    const [darkMood, setdarkMood] = useState(false);
    const { t, i18n } = useTranslation();
    useEffect(() => {
    i18n.changeLanguage(language.id);
  }, [language.id, i18n]);

    const hanldeOpen = () => {
        setOpen(!open);
    }
    const handleMood = () => {
        setdarkMood(!darkMood);
        document.documentElement.classList.toggle('dark', !darkMood);
    }
    
    return (<header className="dark:bg-[#1E2A38] bg-[#2E6DB4] w-full pt-4  dark:border-[#2A313C] backdrop-blur-lg shadow-lg shadow-gray-900/20 fixed z-50 ">
                <div className='flex row justify-between items-center lg:px-40 px-10 md:px-30 mx-auto'>
                <div className='flex row gap-2 items-center hover:cursor-pointer'>
                    <img src={logo} alt="Logo" className="lg:h-12 h-10"/>
                    <h1 className="font-reem md:text-3xl text-2xl font-medium text-white">Falah | فـلاح</h1>
                </div>
                <div className='flex row items-center'>
                    <div className='text-white items-center relative mr-4'>

                        <button onClick={hanldeOpen} className='flex row gap-2 items-center px-3 py-1 group'>
                            <span className='text-slate-100  group-hover:text-white group-hover:font-bold'>{language.flag}</span>
                            <img src={language.id === "ar" && (ar) || language.id === "us" && (us) || language.id === "tr" && (tr)} alt={language.label} className="w-4 h-4 rounded-sm" />
                        </button>


                        {open && (
                            <ul className='absolute right-0 mt-2 bg-[#020c1b]  rounded-md shadow-lg z-20'>
                                {LANGUAGES.filter(lang => lang.id !== language.id).map(lang => (
                                <li
                                    key={lang.id}
                                    onClick={() => { setLanguage(lang); setOpen(false); }}
                                    className="flex row px-3 py-2 cursor-pointer hover:bg-gray-800 rounded-md flex items-center gap-2 "
                                >
                                    <span>{lang.flag}</span> <img src={lang.id === "ar" && (ar) || lang.id === "us" && (us) || lang.id === "tr" && (tr)} alt={lang.label} className="w-4 h-4 rounded-sm" />
                                </li>
                            ))}
                            </ul>
                        )}
                    </div>

                    <div className={`duration-300 items-center px-2 py-1 rounded-full circle dark:after:bg-indigo-950 relative cursor-pointer transition ${darkMood? "after:left-[calc(100%-32px)]  bg-indigo-950 " : "after:left-[4px] bg-white"}`} onClick={handleMood}>
                        <div className='flex justify-between gap-5 text-xl '>
                            <p><IoCloudyNightSharp className='text-yellow-300 size-6'/></p>
                            <p><FaCloudSun className='text-yellow-300 size-6'/></p>
                        </div>
                    </div>
                </div>
                </div>
                <div className='flex w-full text-center justify-center text-slate-100 dark:text-[#E6EDF7] text-xs py-[1px] bg-[rgb(121,70,121)] mt-4'>{t("hadith")}</div>
            </header>
            )
}