import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// مكون لعرض آية قرآنية وحديث نبوي يومي
const DailyAyahHadith = () => {
  const { t, i18n } = useTranslation();
  // حالات لتخزين الآية والحديث
  const [ayah, setAyah] = useState({ text: 'جارٍ التحميل...', surah: '', tafsir: '' });
  const [ayahEnglish, setAyahEnglish] = useState({ text: 'loading...', surah: '', tafsir: '' });
  const [ayahTurkish, setAyahTurkish] = useState({ text: 'yükleniyor...', surah: '', tafsir: '' });
  const [hadith, setHadith] = useState({ text: 'جارٍ التحميل...', resourse: '' });
  const [hadithEnglish, setHadithEnglish] = useState({ text: 'loading...', resourse: '' });
  const [hadithTurkish, setHadithTurkish] = useState({ text: 'yükleniyor...', resourse: '' });
  const [isDark, setIsDark] = useState(false);

  const languages = [
    { value: 'ar', label: 'العربية (تفسير الميسر)', edition: 'ar' },
    { value: 'en', label: 'English (Muhammad Asad)', edition: 'en.asad' },
    { value: 'tr', label: 'Türkçe (Diyanet İşleri)', edition: 'tr.diyanet' },
  ];

  const API_KEY = "$2y$10$byd54ReQ1Zzz6wKsnPeOEHcgTZqmZ7TzQoCDZ94kRd6JYbSNt0m";
  const MICROSOFT_TRANSLATE_API_KEY = process.env.REACT_APP_TRANSLATE_API_KEY;
  const MICROSOFT_ENDPOINT = process.env.REACT_APP_MICROSOFT_ENDPOINT;
  const MICROSOFT_REGION = process.env.REACT_APP_MICROSOFT_REGION;


  // جلب البيانات عند تحميل المكون
  useEffect(() => {
    // جلب الآية من Al-Quran Cloud API
    const fetchAyahs = async () => {
      try {
        const day = new Date().getDate();
        const ayahIndex = (day % 6236) + 1; // اختيار آية بناءً على اليوم

        // إرسال طلبات لكل لغة بالتوازي باستخدام Promise.all
        const promises = languages.map(lang =>
          fetch(`http://api.alquran.cloud/v1/ayah/${ayahIndex}/${lang.edition}`)
            .then(res => res.json())
            .then(data => {
              if (data.code === 200 && data.data) {
                return {
                  lang: lang.value,
                  data: {
                    text: data.data.text || 'لا يوجد نص متاح',
                    surah: `${data.data.surah.name} (${data.data.surah.number}:${data.data.numberInSurah})`,
                    tafsir: data.data.text || 'لا يوجد تفسير متاح لهذه اللغة',
                  },
                };
              }
              throw new Error('بيانات الآية غير صالحة');
            })
            .catch(() => ({
              lang: lang.value,
              data: {
                text: lang.value === 'ar' ? 'خطأ في جلب الآية' : lang.value === 'en' ? 'Error loading ayah' : 'Ayet yüklenirken hata oluştu',
                surah: '',
                tafsir: lang.value === 'ar' ? 'خطأ في جلب التفسير' : lang.value === 'en' ? 'Error loading tafsir' : 'Tefsir yüklenirken hata oluştu',
              },
            }))
        );

        const results = await Promise.all(promises);

        // تحديث الحالات بناءً على اللغة
        results.forEach(({ lang, data }) => {
          if (lang === 'ar') setAyah(data);
          else if (lang === 'en') setAyahEnglish(data);
          else if (lang === 'tr') setAyahTurkish(data);
        });
      } catch (error) {
        console.error('خطأ في جلب الآيات:', error);
      }
    };

    // جلب الحديث من Hadith API وترجمته إلى التركية
    const fetchHadith = async () => {
      try {
        const day = new Date().getDate();
        const hadithIndex = (day % 50) + 1; // اختيار حديث بناءً على اليوم
        const response = await fetch(
          `https://hadithapi.com/api/hadiths?apiKey=${API_KEY}&book=sahih-bukhari&hadithNumber=${hadithIndex}&lang=ar`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.status === 200 && data.hadiths && data.hadiths.data && data.hadiths.data.length > 0) {
          const hadithArabic = data.hadiths.data[0].hadithArabic;
          const hadithEnglish = data.hadiths.data[0].hadithEnglish || 'No English translation available';

          // تحديث الحالات للعربية والإنجليزية
          setHadith({ text: hadithArabic, resourse: 'صحيح البخاري' });
          setHadithEnglish({ text: hadithEnglish, resourse: 'Sahih Al-Bukhari' });

          // ترجمة الحديث إلى التركية باستخدام Microsoft Translator API
          const translateHadith = async (text) => {
            try {
              const response = await fetch(
                `${MICROSOFT_ENDPOINT}/translate?api-version=3.0&from=ar&to=tr`,
                {
                  method: 'POST',
                  headers: {
                    'Ocp-Apim-Subscription-Key': MICROSOFT_TRANSLATE_API_KEY,
                    'Ocp-Apim-Subscription-Region': MICROSOFT_REGION,
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify([{ Text: text }]),
                }
              );
              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }
              const data = await response.json();
              console.log('Microsoft Translator Response:', data); // لتسجيل الاستجابة
              if (data[0] && data[0].translations && data[0].translations[0].text) {
                return data[0].translations[0].text;
              }
              throw new Error('فشل ترجمة الحديث');
            } catch (error) {
              console.error('خطأ في ترجمة الحديث إلى التركية:', error);
              return 'Hadis çevrilemedi';
            }
          };

          const hadithTurkishText = await translateHadith(hadithArabic);
          setHadithTurkish({ text: hadithTurkishText, resourse: 'Sahih Buhari' });
        } else {
          throw new Error('لا توجد بيانات للحديث');
        }
      } catch (error) {
        console.error('خطأ في جلب الحديث:', error);
        setHadith({
          text: 'قال رسول الله صلى الله عليه وسلم: من قال سبحان الله وبحمده مائة مرة غفرت ذنوبه ولو كانت مثل زبد البحر',
          resourse: 'صحيح البخاري',
        });
        setHadithEnglish({
          text: 'The Messenger of Allah (peace be upon him) said: Whoever says "SubhanAllah wa bihamdih" one hundred times, his sins will be forgiven even if they were as much as the foam of the sea.',
          resourse: 'Sahih Al-Bukhari',
        });
        setHadithTurkish({
          text: 'Hadis çevrilemedi',
          resourse: 'Sahih Buhari',
        });
      }
    };

    fetchAyahs();
    fetchHadith();
  }, []);


  return (
    <div className="px-10 lg:px-40 md:px-30 px-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 flex flex-col md:flex-row gap-10 lg:gap-40 pb-20">
      <div className="flex-1 text-center">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          {t("todaysAyah")}
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-200 leading-relaxed">
          {ayah.text}
        </p>
        <p className="text-normal text-gray-600 dark:text-gray-200 leading-relaxed mt-4">
          {i18n.language === 'ar' ? "" : i18n.language === 'tr' ? ayahTurkish.text : ayahEnglish.text}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          {i18n.language === 'ar' ? ayah.surah : i18n.language === 'tr' ? ayahTurkish.surah : ayahEnglish.surah}
        </p>
      </div>


      <div className="flex-1 text-center">
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
          {t("todaysHadith")}
        </h2>
        <p className="text-medium text-gray-700 dark:text-gray-200 leading-relaxed">
          {i18n.language === 'ar' ? hadith.text : i18n.language === 'tr' ? hadithTurkish.text : hadithEnglish.text}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          {i18n.language === 'ar' ? hadith.resourse : i18n.language === 'tr' ? hadithTurkish.resourse : hadithEnglish.resourse}
        </p>
      </div>
      
    </div>
  );
};

export default DailyAyahHadith;