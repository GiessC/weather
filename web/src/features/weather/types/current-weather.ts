import dayjs, { Dayjs } from 'dayjs';

export interface CurrentWeatherJson {
  current: {
    last_updated_epoch: number;
    temp_c: number;
    condition: WeatherConditionJson;
    wind_mph: number;
    wind_dir: string;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    windchill_c: number;
    heatindex_c: number;
    dewpoint_c: number;
    vis_miles: number;
    uv: number;
    gust_mph: number;
  };
}

export class CurrentWeather {
  private readonly _lastUpdated: Dayjs;
  private readonly _temperature: Temperature;
  private readonly _condition: WeatherCondition;
  private readonly _humidity: number;
  private readonly _cloudCoverage: number;
  private readonly _uvIndex: number;
  private readonly _wind: Wind;
  private readonly _visibilityMiles: number;

  constructor(
    lastUpdated: Dayjs,
    temperature: Temperature,
    condition: WeatherCondition,
    wind: Wind,
    humidity: number,
    cloudCoverage: number,
    visibilityMiles: number,
    uvIndex: number
  ) {
    this._lastUpdated = lastUpdated;
    this._temperature = temperature;
    this._condition = condition;
    this._humidity = humidity;
    this._cloudCoverage = cloudCoverage;
    this._uvIndex = uvIndex;
    this._wind = wind;
    this._visibilityMiles = visibilityMiles;
  }

  static fromJson(json: CurrentWeatherJson): CurrentWeather {
    return new CurrentWeather(
      dayjs.unix(json.current.last_updated_epoch),
      new Temperature(
        json.current.temp_c,
        json.current.feelslike_c,
        json.current.windchill_c,
        json.current.heatindex_c,
        json.current.dewpoint_c
      ),
      WeatherCondition.fromJson(json.current.condition),
      new Wind(
        json.current.wind_mph,
        json.current.wind_dir,
        json.current.gust_mph
      ),
      json.current.humidity,
      json.current.cloud,
      json.current.vis_miles,
      json.current.uv
    );
  }

  public get lastUpdated(): Dayjs {
    return this._lastUpdated;
  }

  public get temperature(): Temperature {
    return this._temperature;
  }

  public get condition(): WeatherCondition {
    return this._condition;
  }

  public get humidity(): number {
    return this._humidity;
  }

  public get cloudCoverage(): number {
    return this._cloudCoverage;
  }

  public get uvIndex(): number {
    return this._uvIndex;
  }

  public get wind(): Wind {
    return this._wind;
  }

  public get visibilityMiles(): number {
    return this._visibilityMiles;
  }
}

interface WeatherConditionJson {
  text: string;
  icon: string;
}

export class WeatherCondition {
  private readonly _text: string;
  private readonly _icon: string;

  constructor(text: string, icon: string) {
    this._text = text;
    this._icon = icon;
  }

  static fromJson(json: WeatherConditionJson): WeatherCondition {
    return new WeatherCondition(json.text, json.icon);
  }

  get text(): string {
    return this._text;
  }

  get icon(): string {
    return this._icon;
  }
}

class Wind {
  private readonly _speedMph: number;
  private readonly _direction: string;
  private readonly _gustMph: number;

  constructor(speedMph: number, direction: string, gustMph: number) {
    this._speedMph = speedMph;
    this._direction = direction;
    this._gustMph = gustMph;
  }
}

class Temperature {
  private readonly _actualCelcius: number;
  private readonly _feelsLikeCelcius: number;
  private readonly _windChillCelcius: number;
  private readonly _heatIndexCelcius: number;
  private readonly _dewPointCelcius: number;

  get celcius(): number {
    return this._actualCelcius;
  }

  get feelsLikeCelcius(): number {
    return this._feelsLikeCelcius;
  }

  get windChillCelcius(): number {
    return this._windChillCelcius;
  }

  get heatIndexCelcius(): number {
    return this._heatIndexCelcius;
  }

  get dewPointCelcius(): number {
    return this._dewPointCelcius;
  }

  constructor(
    actualCelcius: number,
    feelsLikeCelcius: number,
    windChillCelcius: number,
    heatIndexCelcius: number,
    dewPointCelcius: number
  ) {
    this._actualCelcius = actualCelcius;
    this._feelsLikeCelcius = feelsLikeCelcius;
    this._windChillCelcius = windChillCelcius;
    this._heatIndexCelcius = heatIndexCelcius;
    this._dewPointCelcius = dewPointCelcius;
  }
}
