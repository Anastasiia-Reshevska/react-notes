import cls from './Loader.module.scss';
export const Loader = () => {
  return (
    <div className={cls.wrapper}>
      <span className={cls.loader}></span>
    </div>
  );
};
