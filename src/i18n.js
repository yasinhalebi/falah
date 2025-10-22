import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  ar: {
    translation: {
      findMyLocation: 'أوجد موقعي تلقائياً',
      nextPrayer: 'الصلاة القادمة',
      countrySearch: 'ابحث عن بلدك',
      stateSearch: 'اختر مدينة',
      prayer0: 'صلاة الفجر',
      prayer1: 'صلاة الظهر',
      prayer2: 'صلاة العصر',
      prayer3: 'صلاة المغرب',
      prayer4: 'صلاة العشاء',
      noLocationError: 'تعذر العثور على موقعك. يرجى السماح بالوصول إلى الموقع أو اختيار بلدك و مدينتك يدوياً.!',
      loading: "جاري التحميل...",
      timesIn: ":مواقيت االصلاة في",
      todaysAyah: "آية اليوم",
      todaysHadith: "حديث اليوم",
      hadith: "نضَّرَ اللَّهُ امرأً سمِعَ مقالتي ، فبلَّغَها ، فرُبَّ حاملِ فِقهٍ ، غيرُ فَقيهٍ ، وربَّ حاملِ فِقهٍ إلى من هوَ أفقَهُ منهُ",
      dateHaijri: "التاريخ الهجري",
      dateGregorian: "التاريخ الميلادي",
      timeRemaining: "الوقت المتبقي للصلاة القادمة:",
    },
  },
  en: {
    translation: {
      findMyLocation: 'Find My Location Automatically',
      nextPrayer: 'Next Prayer',
      countrySearch: 'select your country',
      stateSearch: 'select your state',
      prayer0: 'Fajr Prayer',
      prayer1: 'Dhuhr Prayer',
      prayer2: 'Asr Prayer',
      prayer3: 'Maghrib Prayer',
      prayer4: 'Isha Prayer',
      noLocationError: 'Unable to find your location. Please allow location access or select your country and state manually.!',
      loading: "Loading...",
      timesIn: "Prayer Times in:",
      todaysAyah: "Today's Ayah",
      todaysHadith: "Today's Hadith",
      hadith: "May Allah brighten the face of a person who hears my words and conveys them, for perhaps the carrier of knowledge is not a scholar, and perhaps the carrier of knowledge conveys it to someone more understanding than himself.",
      dateHaijri: "Hijri Date",
      dateGregorian: "Gregorian Date",
      timeRemaining: "Time Remaining for Next Prayer:",
    },
  },
  tr: {
    translation: {
      findMyLocation: 'Konumumu Otomatik Bul',
      nextPrayer: 'Sonraki Namaz',
      countrySearch: 'ülke seç',
      stateSearch: 'şehir seç',
      prayer0: 'Sabah Namazı',
      prayer1: 'Öğlen Namazı',
      prayer2: 'İkindi Namazı',
      prayer3: 'Akşam Namazı',
      prayer4: 'Yatsı Namazı',
      noLocationError: 'Konumunuzu belirlemediniz. Lütfen konum erişimine izin verin veya ülkenizi ve şehrinizi manuel olarak seçiniz.!',
      loading: "Yükleniyor...",
      timesIn: "Namaz Vakitleri:",
      todaysAyah: "Bugünün Ayeti",
      todaysHadith: "Bugünün Hadisi",
      hadith: "Allah, sözlerimi işitip onları ileten kişinin yüzünü aydınlatsın; çünkü belki de ilim taşıyıcısı bir alim değildir ve belki de ilim taşıyıcısı, kendisinden daha anlayışlı birine iletir.",
      dateHaijri: "Hicri Tarih",
      dateGregorian: "Miladi Tarih",
      timeRemaining: "Sonraki Namaza Kalan Süre:",
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'tr',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;