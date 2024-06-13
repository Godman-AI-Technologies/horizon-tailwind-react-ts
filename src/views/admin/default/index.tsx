import Chat from "components/assistant-chat";
import ContentLayout from "shared/ContentLayout/ContentLayout";

const Home = () => {
  return (
    <ContentLayout>
      <div>Info</div>
      <Chat className="max-w-2xl rounded-md bg-white shadow-[0_0_50px_40px_#FFF]" />
    </ContentLayout>
  );
};

export default Home;
