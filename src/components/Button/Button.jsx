import cls from './Button.module.scss';

export const Button = (props) => {
  return (
    <button
      className={`${cls.btn} ${props.isActive ? cls.active : ""}`}
      onClick={props.onClick}
      disabled={props.isDisabled}
    >
      {props.children}
    </button>
  );
};
