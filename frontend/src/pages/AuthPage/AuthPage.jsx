import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AuthPage.css';

function AuthPage({ handleLogin, handleRegister }) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Определяем режим (login или register) из URL
  const isLoginMode = location.pathname === '/login';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Очищаем ошибку при вводе
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (isLoginMode) {
        // Режим входа
        await handleLogin(formData.username);
        navigate('/schedule');
      } else {
        // Режим регистрации
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Пароли не совпадают');
        }
        await handleRegister(formData.username, formData.password);
        navigate('/login');
      }
    } catch (error) {
      setError(error.message || 'Произошла ошибка');
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    const newPath = isLoginMode ? '/register' : '/login';
    navigate(newPath);
    setFormData({ username: '', password: '', confirmPassword: '' });
    setError('');
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h1 className="auth-title">{isLoginMode ? 'Вход в систему' : 'Регистрация'}</h1>
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              className="form-input"
              placeholder="Введите имя пользователя"
            />
            <div className="form-group">
            <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="Введите пароль"
            />
            </div>
          </div>

          {!isLoginMode && (
            <>
              <div className="form-group">
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="Подтвердите пароль"
                />
              </div>
            </>
          )}

          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            className="auth-button"
            disabled={isLoading}
          >
            {isLoading ? 'Загрузка...' : (isLoginMode ? 'Войти' : 'Зарегистрироваться')}
          </button>
        </form>

        <div className="auth-switch">
          <span>
            {isLoginMode ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
          </span>
          <button 
            onClick={switchMode} 
            className="switch-button"
          >
            {isLoginMode ? 'Зарегистрироваться' : 'Войти'}
          </button>
        </div>

        <button 
          onClick={() => navigate('/')} 
          className="back-button"
        >
          Назад на главную
        </button>
      </div>
    </div>
  );
}

export default AuthPage;
