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
        bgColor="#091B18"
        spinnerColor="#9ee5f8"
        textColor="#676767"
        logoSrc="https://i.imgur.com/uPvFvZe.jpg"
        text={text} // Pass text as a string, not an object
      />
    </div>
  );
};

export default Loading;
