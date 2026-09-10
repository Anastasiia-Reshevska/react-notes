import { useNavigate } from 'react-router-dom';
import ReactLogo from '../../assets/images/react-logo.svg';
import { Button } from '../Button';
import { Container } from '../Container';
import { useAuth } from '../../hooks/useAuth';
import { AUTH_STORAGE } from '../../constants';
import { ThemeToggler } from '../../features/ThemeToggler';
import cls from './Header.module.scss';

export const Header = () => {
  const navigate = useNavigate();
  const { isAuth, setAuth } = useAuth();

  const loginHandler = () => {
    localStorage.setItem(AUTH_STORAGE, !isAuth);
    setAuth(!isAuth);
  };

  return (
    <header className={cls.header}>
      <Container className={cls.headerContainer}>
        <p className={cls.headerImg} onClick={() => navigate('/')}>
          <img src={ReactLogo} alt="" width="50" height="50" />
          <span>React Notes</span>
        </p>

        <div className={cls.headerButtons}>
          <ThemeToggler />
          
          {isAuth && (
            <Button onClick={() => navigate('/addquestion')}>Add</Button>
          )}
          <Button isActive={!isAuth} onClick={loginHandler}>{isAuth ? 'Logout' : 'Login'}</Button>
        </div>
      </Container>
    </header>
  );
};
