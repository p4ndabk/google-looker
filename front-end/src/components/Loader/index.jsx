import "./style.css";
import Icon from "../../assets/images/icon.svg?react";

const Loader = () => {
  return (
    <div className="items-center fixed bg-[black] inset-0 z-10 bg-gradient-energy animate-fade">
      <div className="circle">
        <div className="wave"></div>
      </div>
      <Icon
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
        }}
      />
    </div>
  );
};

export default Loader;
