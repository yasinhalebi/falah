import { useState, useEffect } from "react";
import ReactFlagsSelect from "react-flags-select";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import Countries from "../data/countries";

export default function Location({ country, setCountry, city, setCity, loading, setLoading }) {
  const { t, i18n } = useTranslation();
  const API_KEY = "WVltMWZVem4zcmd5cnVSWlhIelRZMXBIWDBwZkRnV0N1aDZUaElBTg==";

  const [error, setError] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState("SA");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState(null);

  const handleFindLocation = () => {
    if (!navigator.geolocation) {
      setError(t("geolocationNotSupported"));
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        setError(null);
        await reverseGeocode(lat, lon);
        setLoading(false);
      },
      (err) => {
        setError(t("unableToRetrieveLocation"));
        setLoading(false);
        console.error(err);
      }
    );
  };

  const reverseGeocode = async (lat, lon) => {
    try {
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=${i18n.language}`
      );
      if (!response.ok) throw new Error("Failed to fetch location data");
      const data = await response.json();
      setCountry(data.countryName);
      setCity(data.city || data.locality);
    } catch (error) {
      setError(t("errorFetchingLocation"));
      console.error("Error in reverse geocoding:", error);
    }
  };

  useEffect(() => {
    if (selectedCountry) {
      setStates([]);
      fetch(`https://api.countrystatecity.in/v1/countries/${selectedCountry}/states`, {
        headers: {
          "X-CSCAPI-KEY": API_KEY,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch states");
          return res.json();
        })
        .then((data) => {
          const stateOptions = data.map((state) => ({
            value: state.iso2,
            label: state.name,
          }));
          setStates(stateOptions);
          setSelectedState(null);
        })
        .catch((error) => {
          setError(t("errorFetchingStates"));
          console.error("Error fetching states:", error);
        });
    }
  }, [selectedCountry, t]);

  const customOption = ({ label }) => (
    <div className="flex items-center gap-2 text-[#1C2526] dark:text-[#E6EDF7]">
      {label}
    </div>
  );

  return (
    <div className="z-30 p-4 bg-[#F5F7FA] dark:bg-[#1E2A38] rounded-lg shadow-md">
      <button
        className="w-[300px] font-medium px-8 py-2 bg-[#4A90E2] hover:bg-[#2E6DB4] text-[#E6EDF7] rounded-md transition-all duration-300 disabled:bg-[#8AB4F8] disabled:cursor-not-allowed"
        onClick={handleFindLocation}
        disabled={loading}
      >
        {t("findMyLocation")}
      </button>

      <div className="mt-4">
        <ReactFlagsSelect
          selected={selectedCountry}
          onSelect={(code) => {
            setSelectedCountry(code);
            setCountry(Countries[code] || code);
          }}
          searchable={true}
          searchPlaceholder={t("countrySearch")}
          placeholder={t("selectCountry")}
          showSelectedLabel={true}
          showOptionLabel={true}
          className="w-full mb-4"
          selectButtonClassName="bg-[#F5F7FA] dark:bg-[#2E3A4A] border border-[#4A90E2] dark:border-[#4A90E2] text-[#1C2526] dark:text-[#E6EDF7] rounded-md shadow-sm hover:border-[#2E6DB4] dark:hover:border-[#2E6DB4] transition-all duration-300"
        />

        <Select
          options={states}
          value={selectedState}
          onChange={(e) => {
            setSelectedState(e);
            setCity(e ? e.label : null);
          }}
          isSearchable={true}
          placeholder={t("stateSearch")}
          formatOptionLabel={customOption}
          className="w-full"
          classNamePrefix="react-select"
          styles={{
            control: (provided) => ({
              ...provided,
              backgroundColor: "#F5F7FA",
              border: "1px solid #4A90E2",
              borderRadius: "0.375rem",
              boxShadow: "none",
              "&:hover": { borderColor: "#2E6DB4" },
              ...(i18n.dir() === "rtl" && { direction: "rtl" }),
            }),
            menu: (provided) => ({
              ...provided,
              backgroundColor: "#FFFFFF",
              border: "1px solid #4A90E2",
              borderRadius: "0.375rem",
              ...(i18n.dir() === "rtl" && { direction: "rtl" }),
            }),
            option: (provided, { isFocused, isSelected }) => ({
              ...provided,
              backgroundColor: isSelected
                ? "rgba(74, 144, 226, 0.2)"
                : isFocused
                ? "rgba(74, 144, 226, 0.1)"
                : "transparent",
              color: "#1C2526",
              ...(i18n.dir() === "rtl" && { direction: "rtl", textAlign: "right" }),
            }),
            singleValue: (provided) => ({
              ...provided,
              color: "#1C2526",
              ...(i18n.dir() === "rtl" && { direction: "rtl" }),
            }),
            placeholder: (provided) => ({
              ...provided,
              color: "#666D74",
            }),
          }}
        />
      </div>

      {error && <p className="mt-3 text-[#D32F2F] dark:text-[#EF5350]">{error}</p>}
    </div>
  );
}