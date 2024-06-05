import SwitchLayout from "shared/SwitchLayout/SwitchLayout";

const Home = () => {
  return (
    <SwitchLayout
      leftSide={{ title: "Info", component: <div>Info</div> }}
      rightSide={{ title: "Assistent", component: <div>Godman assistent</div> }}
    />
  );
};

export default Home;
