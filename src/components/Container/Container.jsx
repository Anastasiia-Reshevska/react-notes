import cls from './Container.module.scss';

export const Container = ({ children, className = '' }) => {
  return <div className={`${cls.container} ${className}`}>{children}</div>;
};
