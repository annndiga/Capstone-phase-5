import React, { useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import "../styles/Home.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import eventImage from "../assets/eventImage.jpg"; // Import your event image here

function Home() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div>
      {loading ? (
        <HashLoader
          className="loader"
          color={"#3d2514"}
          loading={loading}
          size={500}
        />
      ) : (
        <div className="home">
          <Navbar />
          {/* Insert the event image here */}
          <img src={eventImage} alt="Event" style={{ width: "100%" }} />
          <Footer />
        </div>
      )}
    </div>
  );
}

export default Home;
