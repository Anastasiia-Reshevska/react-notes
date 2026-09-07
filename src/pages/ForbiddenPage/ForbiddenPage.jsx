import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';

import cls from './ForbiddenPage.module.scss';
export const ForbiddenPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { isAuth } = useAuth();
  const fromPage = location.state?.from || '/';

  useEffect(() => {
    isAuth && navigate(fromPage, { replace: true });
  }, [isAuth]);

  return <h2 className={cls.title}>Page is Forbidden! </h2>;
};
