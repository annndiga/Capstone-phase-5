import React, { useEffect, useState } from "react";
import { css } from "@emotion/react";
import HashLoader from "react-spinners/HashLoader";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";

function Welcome() {
  const [loading, setLoading] = useState(false);
  const [showNewsletter, setShowNewsletter] = useState(true);
  const override = css`
    display: block;
    border-color: red;
    margin-top: 20%;
  `;

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handleNewsletterClose = () => {
    setShowNewsletter(false);
  };

  return (
    <div>
      {" "}
      {loading ? (
        <HashLoader
          color={"#3d2514"}
          loading={loading}
          css={override}
          size={500}
        />
      ) : (
        <>
          <Hero />
          {showNewsletter && <Newsletter onClose={handleNewsletterClose} />}
          <Footer />
        </>
      )}
    </div>
  );
}

export default Welcome;

// import React, { useEffect, useState } from "react";
// import { css } from "@emotion/react";
// import HashLoader from "react-spinners/HashLoader";

// const [loading, setLoading] = useState(false);
// const override = css`
//   display: block;
//   border-color: red;
//   margin-top: 20%;
// `;

// useEffect(() => {
//   setLoading(true);
//   setTimeout(() => {
//     setLoading(false);
//   }, 3000);
// }, []);

// <div>
//   {" "}
//   {loading ? (
//     <HashLoader
//       color={"#3d2514"}
//       loading={loading}
//       css={override}
//       size={500}
//     />
//   ) : (
//     <>
//
//     </>
//   )}
// </div>;
