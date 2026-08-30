import { useNavigate } from 'react-router-dom';
import ReactLogo from '../../images/react-logo.svg';
import { Button } from '../Button';
import { Container } from '../Container';
import cls from './Header.module.scss';

export const Header = () => {
  const navigate = useNavigate();

  return (
    <header className={cls.header}>
      <Container className={cls.headerContainer}>
        <p className={cls.headerImg} onClick={() => navigate('/')}>
          <img src={ReactLogo} alt="" width="50" height="50" />
          <span>React Notes</span>
        </p>

        <div className={cls.headerButtons}>
          <Button onClick={() => navigate('/addquestion')}>Add</Button>
          <Button isActive={true}>Login</Button>
        </div>
      </Container>
    </header>
  );
};
