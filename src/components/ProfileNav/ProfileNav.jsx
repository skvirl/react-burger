import Style from "./ProfileNav.module.css";

export const ProfileNav = () => {
  return (
    <div>
      <NavButton text="Профиль" isActive />
      <NavButton text="История"  />
      <NavButton text="Выход"  />
    </div>
  );
};

const NavButton = ({ text, onClick, isActive }) => {
  return (
    <button
      className={Style.button}
      {...(isActive ? { active: "" } : {})}
      onClick={onClick}
      pewpew ={isActive}
    >
      {text}
    </button>
  );
};
