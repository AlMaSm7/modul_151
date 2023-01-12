import { Card, CardContent, CardMedia, Typography, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import NearMeIcon from "@mui/icons-material/NearMe";

function Weather() {
  const [weatherData, setWeatherData] = useState<any>();
  const [iconUrl, setIconUrl] = useState("");
  const currentHour = new Date().getHours();

  const bgGradient =
    currentHour < 20 && currentHour > 6
      ? {
          background:
            "linear-gradient(135deg, rgba(0,110,255,0.9) 4%, rgba(0,200,255,0.9) 93%)",
          color: "white",
          maxWidth: "auto",
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center'
        }
      : {
          background:
            "linear-gradient(135deg, rgba(29,29,56,0.9) 4%, rgba(42,31,119,0.9) 93%)",
          color: "white",
          maxWidth: "auto",
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center'
        };
        
  const key = "54ef179bfb2f63ef2afb82174444ec07";

  const fetchData = async () => {
    "geolocation" in navigator
      ? console.log("geolocation available")
      : console.log("gelocation unavailable");

    let lat = undefined;
    let lon = undefined;

    navigator.geolocation.getCurrentPosition((pos) => {
      const geoUrl = `http://api.openweathermap.org/geo/1.0/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&limit=5&appid=${key}`;
      axios.get(geoUrl).then((resp) => {
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${resp.data[0].name}&appid=${key}`;
        axios.get(weatherUrl).then((resp) => {
          setWeatherData(resp.data);
        });
      });
    });
  };

  function getTempInC(tempInKelvin: number) {
    return Math.round(tempInKelvin - 273);
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (weatherData !== undefined) {
      console.log(weatherData);
      setIconUrl(
        `http://openweathermap.org/img/wn/${weatherData?.weather[0].icon}.png`
      );
    }
  }, [weatherData]);

  useEffect(() => {
    console.log(iconUrl);
  }, [iconUrl]);

  return (
    <Card sx={bgGradient}>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={6}>
          <CardContent sx={{ mr: "auto" }}>
            <Typography variant="body1" sx={{ mr: "auto", width: 100 }}>
              {weatherData?.name}
              <NearMeIcon sx={{ fontSize: 14 }} />
            </Typography>
            <Typography
              variant="h5"
              component="div"
              sx={{ mr: "auto", width: 40 }}
            >
              {getTempInC(weatherData?.main.temp)}°
            </Typography>
          </CardContent>
        </Grid>

        <Grid item xs={6}>
          <CardContent>
            <CardMedia
              image={iconUrl}
              component="img"
              title="weather"
              sx={{ ml: "auto", height: 50, width: 50 }}
            />
            <Typography
              variant="body2"
              sx={{ ml: "auto", height: 20, width: 60 }}
            >
              {getTempInC(weatherData?.main.temp_min)}° /{" "}
              {getTempInC(weatherData?.main.temp_max)}°
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}

export default Weather;
