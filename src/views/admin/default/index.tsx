import ContentLayout from "shared/ContentLayout/ContentLayout";
import SwitchLayout from "shared/SwitchLayout/SwitchLayout";

const Home = () => {
  return (
    <ContentLayout>
      <SwitchLayout
        leftSide={{ title: "Info", component: <div>Info</div> }}
        rightSide={{
          title: "Assistent",
          component: <div>Godman assistent</div>,
        }}
      />
    </ContentLayout>
  );
};

export default Home;
