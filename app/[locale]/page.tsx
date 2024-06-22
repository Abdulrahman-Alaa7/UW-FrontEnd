import Heading from "../utils/Heading";
import Hero from "../../components/publicComonents/Hero";
import HeroChatAi from "../../components/publicComonents/HeroChatAi";
import HeroTime from "../../components/publicComonents/HeroTime";
import HeroChatAndVideo from "../../components/publicComonents/HeroChatAndVideo";
import Footer from "../../components/Footer";
import HeroDocuments from "../../components/publicComonents/HeroDocuments";
import HeroStore from "../../components/publicComonents/HeroStore";
import HeaderPub from "../../components/HeaderPub";

export default function Home() {
  return (
    <>
      <Heading
        title="UW"
        description="LMS is a platform for students to learn and get help from teachers"
        keywords="Programming, Science, Languages,etc"
      />
      <div className={`relative min-h-screen  bg-background`}>
        <HeaderPub />
        <Hero />
        <HeroChatAi />
        <HeroTime />
        <HeroChatAndVideo />
        <HeroDocuments />
        <HeroStore />
        <Footer />
      </div>
    </>
  );
}
