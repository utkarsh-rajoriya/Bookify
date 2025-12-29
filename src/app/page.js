import Hero from "@/components/Hero";
import { FirebaseProvider } from "@/contexts/firebase";

const App = () => {
  return (
    <div>
      <FirebaseProvider>
        <Hero />
      </FirebaseProvider>
    </div>
  );
};

export default App;
