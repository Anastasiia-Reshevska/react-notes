import { Outlet } from 'react-router-dom';
import cls from './MainLayout.module.scss';
import { Header } from '../Header';
import { Container } from '../Container';
import { ToastContainer } from 'react-toastify';
import { Suspense } from 'react';
import { Loader } from '../Loader';

export const MainLayout = () => {
  const currentYear = new Date().getFullYear()
  return (
    <>
      <div className={cls.mainLayout}>
        <div className={cls.mainWrapper}>
          <Header />
          <main className={cls.main}>
            <Container className={cls.mainContainer}>
              <Suspense fallback={<Loader/>}>
                <Outlet />
              </Suspense>
            </Container>
          </main>
          <footer className={cls.footer}>
            React Question Notes Application {currentYear} <br />
            by Anastasiia Reshevska
          </footer>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default MainLayout;
