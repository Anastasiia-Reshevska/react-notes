import { Outlet } from 'react-router-dom';
import cls from './MainLayout.module.scss';

export const MainLayout = () => {
  const currentYear = new Date().getFullYear()
  return (
    <div className={cls.mainLayout}>
      ggggg
      <div className={cls.mainWrapper}>
        <main className={cls.main}>
          <Outlet />
        </main>
        <footer className={cls.footer}>
          React Question Cards Application {currentYear} <br />
          by Anastasiia Reshevska
        </footer>
      </div>
    </div>
  );
}

export default MainLayout
