import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './Header.module.css';
import { GithubOutlined, ExportOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { isEmpty, useFirebase } from 'react-redux-firebase';
import { UserAddOutlined } from '@ant-design/icons';
import { fetchWeatherApi } from '../../api/weather';
import { routes } from '../../constants/routes';

const Header = ({ currentUser }) => {
  const firebase = useFirebase();
  const [weather, setWeather] = useState(null);
  const auth = useSelector((state) => state.firebase.auth);
  const { displayName } = useSelector((state) => state.firebase.auth);

  useEffect(() => {
    const fetchWeather = async () => {
      const response = await fetchWeatherApi();
      await setWeather(response);
    };
    if (!weather) {
      fetchWeather();
    }
  }, [weather]);

  const renderUser = () => {
    if (!isEmpty(auth)) {
      return (
        <>
          <span className={styles.userTitleText}>{displayName}</span>
          <ExportOutlined
            style={{ fontSize: '20px' }}
            onClick={() => firebase.logout()}
          />
        </>
      );
    } else {
      return (
        <>
          <Link to={routes.signIn} className={styles.linkWithImgRigth}>
            <span>Sign in</span>
            <UserAddOutlined />
          </Link>
        </>
      );
    }
  };

  const renderWeather = () => {
    if (weather) {
      return (
        <div className={styles.weather}>
          <img
            src={weather.current.weather_icons || ''}
            alt="weather"
            className={styles.weatherImg}
          />
          <h3
            className={styles.weatherCity}
          >{`Мурино ${weather.current.temperature}℃`}</h3>
        </div>
      );
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.titleBlock}>
        <h2 className={styles.titleWrap}>
          <GithubOutlined />
          <span className={styles.titleText}>LanguageIt</span>
        </h2>
      </div>
      {renderWeather()}
      <div className={styles.userBlock}>
        <h3 className={styles.userWrap}>{renderUser()}</h3>
      </div>
    </div>
  );
};

export default Header;
