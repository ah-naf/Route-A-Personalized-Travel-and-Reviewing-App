import { useEffect, useState } from "react";

const Weather = () => {
  const [weather, setWeather] = useState({
    name: "",
    temp: 0,
    icon: "",
  });

  useEffect(() => {
    const handleSuccess = async (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=a917b0cffb05a489e50e337d918c6a24`;

      const res = await fetch(url);
      const data = await res.json();

      setWeather({
        name: data.name,
        icon: data.weather[0].icon,
        temp: data.main.temp,
      });
    };

    const handleError = (error: GeolocationPositionError) => {
      console.error("Error getting location:", error);
    };

    // Request current location
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);
  return (
    <div>
      {weather.name && (
        <div className="flex items-center ">
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt=""
          />
          <h1 className=" text-5xl font-primary font-medium text-gray-600">
            {(weather.temp - 273).toFixed(2)}
          </h1>
          <div className="ml-2">
            <p className="font-primary tracking-wider font-medium text-lg">
              {weather.name}
            </p>
            <p className="font-primary tracking-wider leading-4 font-light">
              Bangladesh
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
