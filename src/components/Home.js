import { HiBadgeCheck } from "react-icons/hi";
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import PrayerCard from './PrayerCard';
import umayyad from '../imgs/umayyad_mosque.png';
import kaaba from '../imgs/kaaba.png';
import istanbulMosque from '../imgs/istanbul_mosque.png';
import jerusalem from '../imgs/jerusalem.png';
import nabawi from '../imgs/nabawi1.png';
import Location from './Location';
import CountDown from "./CountDown";

export default function Home() {
  const [prayers, setPrayers] = useState(null);
  const { t, i18n } = useTranslation();
  const [country, setCountry] = useState(null); // لتخزين اسم الدولة
  const [city, setCity] = useState(null); // لتخزين اسم المدينة
  const [loading, setLoading] = useState(false); // حالة التحميل
  const [date, setDate] = useState({hijri: "", gregorian: ""});
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timings, setTimings] = useState(0);
  const [next, setNext] = useState("");
  const [active, setActive] = useState("");
  const [countdown, setCountdown] = useState(null);

  
  const isArabic = i18n.language === 'ar';
  const flexDirection = isArabic ? 'flex-row-reverse' : 'flex-row';
  const flexDirection1 = isArabic ? 'rtl' : 'ltr';

  useEffect(() => {
    // تحديث الوقت كل ثانية
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // تنظيف الـ interval عند إلغاء التركيب
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const hour = currentTime.getHours();
    const minute = currentTime.getMinutes() / 100;
    const temp = hour + minute;
    const fajr = prayers?.Fajr.split(':');
    const dhuhr = prayers?.Dhuhr.split(':');
    const asr = prayers?.Asr.split(':');
    const maghrib = prayers?.Maghrib.split(':');
    const isha = prayers?.Isha.split(':');

    const fajrTime = parseInt(fajr?.[0]) + parseInt(fajr?.[1]) / 100;
    const dhuhrTime = parseInt(dhuhr?.[0]) + parseInt(dhuhr?.[1]) / 100;
    const asrTime = parseInt(asr?.[0]) + parseInt(asr?.[1]) / 100;
    const maghribTime = parseInt(maghrib?.[0]) + parseInt(maghrib?.[1]) / 100;
    const ishaTime = parseInt(isha?.[0]) + parseInt(isha?.[1]) / 100;


  if (temp > ishaTime){
    setActive('Isha');
    setNext('Fajr');
    setCountdown(fajr)
  }else if (temp > fajrTime && temp < dhuhrTime){
    setActive('Fajr');
    setNext('Dhuhr');
    setCountdown(dhuhr)
  }else if (temp > dhuhrTime && temp < asrTime){
    setNext('Asr');
    setActive('Dhuhr');
    setCountdown(asr)
  }else if (temp > asrTime && temp < maghribTime){
    setActive('Asr');
    setNext('Maghrib');
    setCountdown(maghrib)
  }else if (temp > maghribTime && temp < ishaTime){
    setActive('Maghrib');
    setNext('Isha');
    setCountdown(isha)
  }

  }, [currentTime, prayers]);
  useEffect(() => {
      if (city && country) {
        fetch(`http://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=2`) // method=2 لطريقة السعودية
          .then(res => res.json())
          .then(data => {
            setPrayers(data.data.timings);
            setLoading(false);
            setDate({hijri: data.data.date.hijri.date, gregorian: data.data.date.gregorian.date});
          })
          .catch(err => console.error('Error fetching prayer times:', err));
      }
    }, [city, country]);

  return (
    <div className="pt-40 pb-20 flex flex-col items-center gap-10 px-10 lg:px-40 md:px-30 px-auto   bg-[#F5F7FA] dark:bg-[#2E3A4A] relative home-bg">
      <div className="w-full flex flex-col lg:flex-row items-center justify-between relative home-bg-mobile"> 
        <div className="size-60 lg:size-80 bg-gray-400 rounded-full">
          <CountDown hour={countdown?.[0]} minute={countdown?.[1]}/>
        </div>
        <div className="flex flex-col lg:flex-row items-center gap-4">
          {city === null ? (
            <h1 dir={flexDirection1} className={` float-start dark:text-[#EF5350] text-[#D32F2F] text-wrap text-l font-semibold w-80 mt-6 md:mt-0`}>{t('noLocationError')}</h1>
          ) 
           : loading ? (
            <h1 className="text-[#1C1F26]/60 dark:text-[#E6EDF7]/60 px-4">{t("loading")}</h1>
            )
           : (
            <div className="">
              <h1 className='text-[#1C1F26]/60 dark:text-[#E6EDF7]/60 font-semibold px-4 flex flex-col'>{t("dateGregorian")}: {date.gregorian}<span>{t("dateHaijri")}: {date.hijri}</span></h1>
              <h1 className='text-[#1C1F26]/60 dark:text-[#E6EDF7]/60 px-4'>{t("timesIn")}</h1>
              <h1 className={`text-3xl flex items-center dark:bg-[#161B22] bg-[#E6EEF7] rounded-full py-2 px-4 text-[#1C1F26] dark:text-[#E6EDF7]`}>{country}, {city}<HiBadgeCheck className="text-green-600 mx-2"/></h1>
            </div>
          )}
          <Location country={country} setCountry={setCountry} city={city} setCity={setCity} loading={loading} setLoading={setLoading}/>
        </div>
      </div>
      <div className={`w-full flex ${flexDirection} lg:justify-between float-start flex-col lg:flex-row items-center gap-8 justify-center`}>
        <PrayerCard title={t('prayer0')} time={prayers?.Fajr} imgSrc={nabawi} active={active} next={next} id="Fajr" />
        <PrayerCard title={t('prayer1')} time={prayers?.Dhuhr} imgSrc={jerusalem} active={active} next={next} id="Dhuhr" />
        <PrayerCard title={t('prayer2')} time={prayers?.Asr} imgSrc={istanbulMosque} active={active} next={next} id="Asr" />
        <PrayerCard title={t('prayer3')} time={prayers?.Maghrib} imgSrc={umayyad} active={active} next={next} id="Maghrib" />
        <PrayerCard title={t('prayer4')} time={prayers?.Isha} imgSrc={kaaba} active={active} next={next} id="Isha" />
      </div>
    </div>
  );
}