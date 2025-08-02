import './App.css';
import Header from './Header';
import About from './About';
import Services from './Services';
import Footer from './Footer';
import InquiryForm from './InquiryForm'; // If you have this component

function App() {
  return (
    <>
      <Header />
      <main>
        <About />
        <Services />
        <InquiryForm />
      </main>
      <Footer />
    </>
  );
}

export default App;
