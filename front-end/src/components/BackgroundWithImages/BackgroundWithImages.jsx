import "./BackgroundWithImages.styles.css";

export const BackgroundWithImages = () => {
  return (
    <div className="h-full w-full absolute z-[-1]">
      <div className="topBackground" />
      <div className="bottomBackground" />
      <div className="backgroundGradient" />
    </div>
  );
};
