import { useTranslation } from 'react-i18next';
export default function PrayerCard({title, time, imgSrc, active, next, id}) {
    const { t, i18n} = useTranslation();


    const isArabic = i18n.language === 'ar';
  const flexDirection = isArabic ? 'flex-row-reverse pr-4 text-right' : 'flex-row pl-4';



return (
<div
  className={`group z-20 w-[208px] h-[144px] font-reem gap-2 overflow-hidden dark:bg-[#1C2128] bg-white rounded-xl flex flex-col justify-center items-end  relative
    ${
      next === id
        ? 'shadow-card-yellow-light dark:shadow-card-yellow-dark bottom-2 scale-110 ring-2 ring-yellow-400/90'
        : active === id
        ? ' ring-2 ring-red-500 dark:ring-red-900'
        : ''
    }`}
>               <h1 className={`text-2xl  z-20 flex w-full text-[#1C2526] dark:text-[#E6EDF7] group-hover:opacity-20 duration-700 ${flexDirection}`}> {title}</h1>
                {time != null ? 
                (<h1 className={`text-5xl z-20 pl-4 text-[#1C2526] flex w-full dark:text-[#E6EDF7] group-hover:opacity-20 duration-700 ${flexDirection}`}>{time}</h1>) : 
                (<h1 className={`text-xs z-20 pl-4 text-red-500 flex w-full dark:text-red-500 group-hover:opacity-20 duration-700 ${flexDirection} font-bold font-system `}>{t("noLocationError")}</h1>
                )}
                {next && <p className={`mb-3 font-system font-medium flex text-[#666D74] dark:text-[#E6EDF7] absolute  bottom-0 bg-yellow-500/10 px-2 rounded-lg text-xs  ${isArabic ? "left-4" : "right-4"}`}>{next === id ? t("nextPrayer") : ("") }</p>}
                <img className="absolute w-[100%] blur-[1px] opacity-20 z-10 bottom-0 dark:invert duration-700 dark:opacity-10 group-hover:opacity-100" src={imgSrc} alt="umayyad" />
            </div>
        );
}