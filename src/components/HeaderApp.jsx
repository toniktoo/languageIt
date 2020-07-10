import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { isEmpty, useFirebase } from 'react-redux-firebase';

import { routes } from '../constants/routes';
import { Divider } from 'antd';
import { UserAddOutlined, ExportOutlined } from '@ant-design/icons';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 33%;
`;

const TitleApp = styled.span`
  margin: 0;
`;
const LinkHome = styled(Link)`
  margin: 0;
  color: #6d6d6d;
`;

const ProfileWrap = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileExit = styled.div`
  font-size: 20px;
  color: #6d6d6d;
  display: flex;
  align-items: center;
  margin-left: 8px;

  &:hover {
    color: #65a7f3;
    transition: 0.5s;
  }
`;

const styleDivider = {
  color: '#65a7f3',
  fontWeight: '900',
  margin: '0 0 16px 0',
  fontSize: '16px',
};

export const HeaderApp = ({ title }) => {
  const firebase = useFirebase();
  // const [weather, setWeather] = useState(null);
  const auth = useSelector((state) => state.firebase.auth);
  const { displayName } = useSelector((state) => state.firebase.auth);

  // useEffect(() => {
  //   const fetchWeather = async () => {
  //     const response = await fetchWeatherApi();
  //     await setWeather(response);
  //   };
  //   if (!weather) {
  //     fetchWeather();
  //   }
  // }, [weather]);

  const renderUser = () => {
    if (!isEmpty(auth)) {
      return (
        <ProfileWrap>
          <Link to={routes.profileUser}>{displayName}</Link>
          <ProfileExit>
            <ExportOutlined onClick={() => firebase.logout()} />
          </ProfileExit>
        </ProfileWrap>
      );
    } else {
      return (
        <>
          <Link to={routes.signIn}>
            <span>Sign in</span>
            <UserAddOutlined />
          </Link>
        </>
      );
    }
  };

  // const renderWeather = () => {
  //   if (weather) {
  //     return (
  //       <div className={styles.weather}>
  //         <img
  //           src={weather.current.weather_icons || ''}
  //           alt="weather"
  //           className={styles.weatherImg}
  //         />
  //         <h3
  //           className={styles.weatherCity}
  //         >{`Мурино ${weather.current.temperature}℃`}</h3>
  //       </div>
  //     );
  //   }
  // };

  return (
    <Wrapper>
      <Divider orientation="left" style={styleDivider}>
        <LinkHome to={routes.home}>Go home</LinkHome>
      </Divider>
      <Divider orientation="center" style={styleDivider}>
        <TitleApp>{title}</TitleApp>
      </Divider>
      <Divider orientation="right" style={styleDivider}>
        {renderUser()}
      </Divider>
    </Wrapper>
  );
};
