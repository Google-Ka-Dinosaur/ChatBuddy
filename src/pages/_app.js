import "@/styles/globals.css";
import { ChatAppProvider } from "../Context/ChatAppContext";
import { Navbar } from "../components/index";
const App = ({ Component, pageProps }) => {
  return (
    <ChatAppProvider>
      <Navbar/>
      <Component {...pageProps} />
    </ChatAppProvider>
  );
};

export default App;
