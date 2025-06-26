import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import LoginCard from '../../components/LoginCard';
import LoginButton from '../../components/LoginButton';
import './LoginPage.css';
import LogoImage from '../../assets/logo.png';

function LoginPage() {

  return (
    <div className="LoginPage">
      <div className="LoginInformation">
          
        <img src={LogoImage} alt="Logo" className="LogoImage" />

        <LoginCard
         className="card-top"
         CardTitle="Централизованный учет активности"
         CardDescription="Все внерабочие мероприятия (конференции, хакатоны, менторство) в одной системе" 
        />
        <LoginCard
         className="card-left"
         CardTitle="Умные напоминания" 
         CardDescription="Оповещения о грядущих событиях, чтобы ничего не пропустить"
        />
        <LoginCard 
         className="card-right"
         CardTitle="Автоматизация отчетности"
          CardDescription="Легкий сбор данных через формы после ивентов и генерация аналитики для менеджеров" 
        />

        <LoginCard 
         className="card-bottom"
         CardTitle="Прозрачность для команды" 
         CardDescription="Видимость участия коллег: кто спикер, ментор или участник"
        />
      </div>

      <div className="LoginForm">
        <h1 className="LoginFormTitle">Event Tracker</h1>
        <h3 className="LoginFormSubtitle">Приложение для учёта внерабочих активностей с возможностью уведомлений в телеграм</h3>
        <div className="LoginFormButtons">
          <LoginButton ButtonText="Вход" />
          <LoginButton ButtonText="Регистрация" />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;