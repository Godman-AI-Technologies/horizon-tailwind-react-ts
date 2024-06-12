import Chat from "components/chat";
import ContentLayout from "shared/ContentLayout/ContentLayout";
import SwitchLayout from "shared/SwitchLayout/SwitchLayout";

const Home = () => {
  return (
    <ContentLayout>
      <ContentLayout />
      <div>Info</div>
      <Chat />
    </ContentLayout>
  );
};

export default Home;
