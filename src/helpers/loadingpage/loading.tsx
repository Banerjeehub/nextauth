import React from "react";
import LoadingScreen from "react-loading-screen";

interface Props {
  text: string;
}

const Loading: React.FC<Props> = ({ text }) => {
  return (
    <div>
      <LoadingScreen
        loading={true}
        bgColor="#000000"
        spinnerColor="#9ee5f8"
        textColor="#676767"
        logoSrc="/loading.png"
        text={text}
      >
        {" "}
      </LoadingScreen>
    </div>
  );
};

export default Loading;
