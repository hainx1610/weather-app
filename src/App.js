import React, { useState, useEffect } from "react";

const api = {
  key: "1b2da9b8390d6608a18133c6670172c4",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [searchInput, setSearchInput] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [weatherInfo, setWeatherInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!searchCity) return;
      // begin process
      setLoading(true);
      // process
      try {
        const url = `${api.base}weather?q=${searchCity}&units=metric&appid=${api.key}`;
        const res = await fetch(url);
        const data = await res.json();
        if (res.ok) {
          setWeatherInfo(
            `${data.name}, ${data.sys.country}, ${data.weather[0].description}, ${data.main.temp}`
          );
          setErrorMessage("");
        } else {
          setErrorMessage(data.message);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
      // end process
      setLoading(false);
    };
    fetchWeatherData();
  }, [searchCity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // only render when submit, not when change input
    setSearchCity(searchInput);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="city"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button>Search</button>
      </form>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {errorMessage ? (
            <div style={{ color: "red" }}>{errorMessage}</div>
          ) : (
            <div>{weatherInfo}</div>
          )}
        </>
      )}
    </>
  );
}

export default App;
