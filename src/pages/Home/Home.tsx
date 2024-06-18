import { Chat } from "widgets/Chat";
import ContentLayout from "shared/ContentLayout/ContentLayout";

const Home = () => {
  return (
    <ContentLayout className="mx-auto mt-20 md:max-w-fit">
      <div className="mb-6 text-center text-2xl font-bold">
        Godman Ai Chat Assistant
      </div>
      <Chat className="w-full rounded-md bg-white shadow-[0_0_50px_40px_#FFF] dark:bg-navy-700 dark:shadow-navy-700 md:min-w-[40rem]" />
    </ContentLayout>
  );
};

export default Home;
