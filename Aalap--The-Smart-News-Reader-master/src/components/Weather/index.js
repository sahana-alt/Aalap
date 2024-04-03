import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import ArrowDownIcon from "mdi-react/ArrowDownIcon";
import ArrowUpIcon from "mdi-react/ArrowUpIcon";
import CircleOutlineIcon from "mdi-react/CircleOutlineIcon";
import MagnifyIcon from "mdi-react/MagnifyIcon";
import WeatherCloudyIcon from "mdi-react/WeatherCloudyIcon";
import WeatherLightningRainyIcon from "mdi-react/WeatherLightningRainyIcon";
import WeatherPouringIcon from "mdi-react/WeatherPouringIcon";
import WeatherSnowyIcon from "mdi-react/WeatherSnowyIcon";

import './styles.module.css';
class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      location: "Bangalore",
      days: [],
      daysFull: [],
      temps: [],
      minTemps: [],
      maxTemps: [],
      weather: [],
      icons: [],
      displayIndex: 0
    };
  }

  fetchData = () => {
    const url = this.buildUrlApi();
    console.log("api", url);

    axios.get(url).then(response => {
      this.setState({
        data: response.data
      });

      const currentData = this.currentData();
      const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const dayOfWeekFull = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ];
      const currentDay = "Today";
      const currentDayFull =
        dayOfWeekFull[new Date(currentData.dt_txt).getDay()];
      const currentTemp = Math.round(currentData.main.temp);
      const currentMinTemp = Math.round(currentData.main.temp_min);
      const currentMaxTemp = Math.round(currentData.main.temp_max);
      const currentWeather =
        currentData.weather[0].main === "Clouds"
          ? "Cloudy"
          : currentData.weather[0].main;
      const currentIcon = this.convertWeatherIcons(currentData.weather[0].main);

      const days = [];
      const daysFull = [];
      const temps = [];
      const minTemps = [];
      const maxTemps = [];
      const weather = [];
      const icons = [];
      for (let i = 0; i < this.state.data.list.length; i = i + 8) {
        let date = new Date(this.state.data.list[i].dt_txt);
        let day = dayOfWeek[date.getDay()];
        let dayFull = dayOfWeekFull[date.getDay()];
        days.push(day);
        daysFull.push(dayFull);
        temps.push(Math.round(this.state.data.list[i].main.temp));
        minTemps.push(Math.round(this.state.data.list[i].main.temp_min));
        maxTemps.push(Math.round(this.state.data.list[i].main.temp_max));

        if (this.state.data.list[i].weather[0].main === "Clouds") {
          weather.push("Cloudy");
        } else {
          weather.push(this.state.data.list[i].weather[0].main);
        }

        icons.push(
          this.convertWeatherIcons(this.state.data.list[i].weather[0].main)
        );
      }

      this.setState({
        days: [currentDay, ...days.slice(1)],
        daysFull: [currentDayFull, ...daysFull.slice(1)],
        temps: [currentTemp, ...temps.slice(1)],
        minTemps: [currentMinTemp, ...minTemps.slice(1)],
        maxTemps: [currentMaxTemp, ...maxTemps.slice(1)],
        weather: [currentWeather, ...weather.slice(1)],
        icons: [currentIcon, ...icons.slice(1)]
      });
    });
  };

  buildUrlApi = () => {
    const location = encodeURIComponent(this.state.location);
    const urlPrefix = "https://api.openweathermap.org/data/2.5/forecast?q=";
    const urlSuffix = "&APPID=c4522703d3bb2557e4cab524177d2cf1&units=metric";

    return [urlPrefix, location, urlSuffix].join("");
  };

  currentData = () => {
    const list = this.state.data.list;
    const nearestHr = this.computeNearestHr();

    return list.find(e => new Date(e.dt_txt).getHours() === nearestHr);
  };

  computeNearestHr = () => {
    const currentTimeInHrs = new Date().getHours();
    const constHrs = [0, 3, 6, 9, 12, 15, 18, 21];
    const differences = constHrs.map(e => Math.abs(e - currentTimeInHrs));
    const indexofLowestDiff = differences.indexOf(Math.min(...differences));

    return constHrs[indexofLowestDiff];
  };

  convertWeatherIcons = weather => {
    switch (weather) {
      case "Clear":
        return <CircleOutlineIcon size={32} />;
      case "Clouds":
        return <WeatherCloudyIcon size={32} />;
      case "Snow":
        return <WeatherSnowyIcon size={32} />;
      case "Rain":
        return <WeatherPouringIcon size={32} />;
      case "Drizzle":
        return <WeatherPouringIcon size={32} />;
      case "Thunderstorm":
        return <WeatherLightningRainyIcon size={32} />;
      default:
        return <WeatherCloudyIcon />;
    }
  };

  componentDidMount() {
    this.fetchData();
  }

  handleFocus = e => {
    e.target.select();
  };

  changeLocation = e => {
    e.preventDefault();
    const inputLocation = this.locationInput.value;
    this.setState(
      {
        location: inputLocation
      },
      () => {
        this.fetchData();
      }
    );
  };

  setIndex = index => {
    this.setState({
      displayIndex: index
    });
  };

  render() {
    const {
      location,
      days,
      daysFull,
      temps,
      maxTemps,
      minTemps,
      weather,
      icons,
      displayIndex
    } = this.state;

    let background = "";
    switch (weather[displayIndex]) {
      case "Clear":
        background = "clear";
        break;
      case "Cloudy":
        background = "cloudy";
        break;
      case "Snow":
        background = "snow";
        break;
      case "Rain":
        background = "rain";
        break;
      case "Drizzle":
        background = "rain";
        break;
      case "Thunderstorm":
        background = "thunderstorm";
        break;
      default:
        background = "cloudy";
    }

    return (
      <div className="weather">
      <div style={{borderRadius:'0.5rem',boxShadow:'0 3px 5px rgba(0, 0, 0, 0.16), 0 3px 5px rgba(0, 0, 0, 0.23)',margin:'0px 10px 10px 10px',padding:'3rem 5rem'}}
       className={"widget ".concat(...background)}>
        <form onSubmit={this.changeLocation}>
          <div className="inline-input">
            <MagnifyIcon size={30} />
            <input
              className="location-input"
              defaultValue={location}
              type="text"
              onFocus={this.handleFocus}
              ref={input => (this.locationInput = input)}
            />
          </div>
        </form>

        <div className="main-display">
          <div className="main-info">
            <div className="temp-measurement">{temps[displayIndex]}</div>
            <div className="temp-unit">°C</div>
          </div>

          <div className="sub-info">
            <div className="sub-info-title">{daysFull[displayIndex]}</div>
            <div className="sub-info-text">{weather[displayIndex]}</div>

            <div className="sub-info-text">
              <span className="max-temp">
                <ArrowUpIcon size={16} />
                {maxTemps[displayIndex]}
                °C
              </span>
              <span className="min-temp">
                <ArrowDownIcon size={16} />
                {minTemps[displayIndex]}
                °C
              </span>
            </div>
          </div>
        </div>

        <div className="selection-panel">
          <div className="selection-row">
            {icons.map((item, index) => {
              if (displayIndex === index) {
                return (
                  <div
                    className="selection-icons selected"
                    key={index + 1}
                    onClick={() => this.setIndex(index)}
                  >
                    {item}
                  </div>
                );
              } else {
                return (
                  <div
                    className="selection-icons"
                    key={index + 1}
                    onClick={() => this.setIndex(index)}
                  >
                    {item}
                  </div>
                );
              }
            })}
          </div>
          <div className="selection-row">
            {days.map((item, index) => {
              if (displayIndex === index) {
                return (
                  <div
                    className="selection-days selected"
                    key={index + 1}
                    onClick={() => this.setIndex(index)}
                  >
                    {item}
                  </div>
                );
              } else {
                return (
                  <div
                    className="selection-days"
                    key={index + 1}
                    onClick={() => this.setIndex(index)}
                  >
                    {item}
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default Weather;