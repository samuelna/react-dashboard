import React, { Component } from 'react';
import style from './Weather.css';
import { CSSTransitionGroup } from 'react-transition-group';
import TransitionGroup from 'react-transition-group/TransitionGroup';

export default class Weather extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      temp: '',
      icon: '',
      weatherDisplay: 'hide',
      searchDisplay: 'hide',
    };
  }

  getWeather(val) {
    // check val is zip or city
    let param = isNaN(Number(val)) ? 'city' : 'zip';
    console.log('param', param);
    fetch(`/api/weather/${param}/${val}`)
      .then(res => res.json())
      .then(data => {
        console.log('weather data', data);
        // console.log(data.weather[0].icon);
        this.setState({ 
          name: data.name,
          temp: this.convertToFah(data.main.temp),
          icon: this.iconURL(data.weather[0].icon),
          weatherDisplay: 'show',
        });
      })
      .catch(error => console.log('getWeather error', error));
  }

  handleKeyPress(event) {
    let weatherInput = document.getElementById('weather-input');
    if (event.key === 'Enter') {
      this.getWeather(weatherInput.value);
      weatherInput.value = ''; // clear
    } else if (event.type === 'click') {
      // check if the input is empty
      if (weatherInput.value.trim() !== '') {
        this.getWeather(weatherInput.value);
        weatherInput.value = ''; // clear
      }
    }
  }

  iconURL(icon) {
    const iconURL = 'http://openweathermap.org/img/w/';
    return `${iconURL}${icon}.png`;
  }

  convertToFah(k) {
    return ((k - 273.15) * 1.80 + 32).toFixed(1);
  }

  mouseEnter() {
    // console.log('mouse enter event');
    this.setState({ searchDisplay: 'show' });
  }
  mouseLeave() {
    this.setState({ searchDisplay: 'hide' });
  }

  render() {
    return (
      <div className="weather-container">
        <div className="search-container">
          <input 
            className={this.state.searchDisplay}
            type="text" 
            placeholder="Search City or Zip Code" 
            id="weather-input"
            onKeyPress={this.handleKeyPress.bind(this)}
          />
          <a 
            className="btn" 
            onMouseEnter={this.mouseEnter.bind(this)} 
            onMouseLeave={this.mouseLeave.bind(this)} 
            onClick={this.handleKeyPress.bind(this)} >
            <i className="fa fa-search" id="search-icon"></i>
          </a>
        </div>

        
        <div className="weather-info">
          <span className="city-name text-shadow">{this.state.name}</span>
          <span className={`${this.state.weatherDisplay} weather-icon-wrapper`}><img id="weather-icon" src={this.state.icon} alt="Weather Icon"/></span> <br/>
          <span className={`${this.state.weatherDisplay} temp-info text-shadow`}><span id="temp-value">{this.state.temp}</span><span id="fahrenheit">&#8457;</span></span>
        </div>
      </div>
    );
  }
}