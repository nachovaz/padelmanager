export function BallLiveliness(temp, humidity) {
  if (temp <= 10) {
    return "low";
  } else if (temp <= 16) {
    if (humidity > 70) {
      return "low";
    } else {
      return "normal";
    }
  } else if (temp <= 26) {
    if (humidity > 75) {
      return "low";
    } else if (humidity < 35) {
      return "high";
    } else {
      return "normal";
    }
  } else if (temp <= 33) {
    if (humidity > 70) {
      return "normal";
    } else {
      return "high";
    }
  } else {
    if (humidity > 60) {
      return "normal";
    } else {
      return "high";
    }
  }
}

export function weatherIcon(code) {
  switch (true) {
    case code === 0:
      return "fa-sun";
    case code <= 2:
      return "fa-cloud-sun";
    case code <= 3:
      return "fa-cloud";
    case code <= 48:
      return "fa-smog";
    case code <= 67:
      return "fa-cloud-rain";
    case code <= 77:
      return "fa-snowflake";
    case code <= 82:
      return "fa-cloud-showers-heavy";
    case code <= 86:
      return "fa-snowflake";
    default:
      return "fa-cloud-bolt";
  }
}

export function weatherDescription(code) {
  if (code === 0) return "Clear sky";
  if (code <= 2) return "Partly cloudy";
  if (code <= 3) return "Overcast";
  if (code <= 48) return "Foggy";
  if (code <= 57) return "Drizzle";
  if (code <= 67) return "Rain";
  if (code <= 77) return "Snow";
  if (code <= 82) return "Rain showers";
  if (code <= 86) return "Snow showers";
  return "Thunderstorm";
}
