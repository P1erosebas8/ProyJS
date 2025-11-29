import { useEffect, useState } from "react";

export const Weather = () => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=-12.0464&longitude=-77.0428&current_weather=true"
        )
            .then(res => res.json())
            .then(data => setWeather(data.current_weather));
    }, []);

    if (!weather) return <span>Cargando clima...</span>;

    return (
        <div className="d-flex align-items-center gap-2">
            <span>{weather.temperature}°C</span>
            <span style={{ fontSize: "26px" }}>
                {weather.weathercode <= 2 ? "☀️" :
                 weather.weathercode <= 3 ? "⛅" :
                 weather.weathercode <= 45 ? "🌫️" :
                 weather.weathercode <= 61 ? "🌦️" :
                 weather.weathercode <= 65 ? "🌧️" :
                 "🌡️"}
            </span>
        </div>
    );
};
