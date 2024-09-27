import { useEffect, useState, useRef } from "react";
import "./About.css";
import logo from "../../assets/robovitics logo.png";
import AboutImage from "../../assets/AboutImage.jpg";
import GravLogo from "../../assets/newgravlogo.svg";

export default function AboutUs() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 1000);

  const cardsRef = useRef([]); // Create a ref to store card elements

  const handleMouseEnter = (cardId) => {
    setHoveredCard(cardId);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  const getCardContent = (cardId, imagePath, expandedContent) => {
    if (hoveredCard === cardId || isMobileView) {
      return <div className="expanded-content">{expandedContent}</div>;
    } else {
      return (
        <img
          src={imagePath}
          alt={`Image for ${cardId}`}
          className="card-image"
        />
      );
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 1000);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1, // Trigger when 10% of the card is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !entry.target.classList.contains("scroll-trigger")
        ) {
          entry.target.classList.add("scroll-trigger");
          observer.unobserve(entry.target);
        } else {
          entry.target.classList.remove("scroll-trigger");
        }
      });
    }, observerOptions);

    cardsRef.current.forEach((card) => {
      if (card) {
        observer.observe(card);
      }
    });

    return () => {
      cardsRef.current.forEach((card) => {
        if (card) {
          observer.unobserve(card);
        }
      });
    };
  }, []);

  return (
    <div
      className="AboutSection"
      style={{
        minHeight: "100vh",
        width: "100vw",
        alignItems: "center",
        alignContent: "center",
      }}
      id="aboutUsSection"
    >
      <center>
        <div className="cont">
          <div
            id="first"
            className="card"
            ref={(el) => (cardsRef.current[0] = el)}
            onMouseEnter={() => handleMouseEnter("first")}
            onMouseLeave={handleMouseLeave}
          >
            {getCardContent(
              "first",
              logo,
              <div className="expanded-content">
                <img src="https://res.cloudinary.com/dtuqpup4a/image/upload/fl_preserve_transparency/v1727411417/robovitics_team_hee1en.jpg?_s=public-apps" alt="About" className="expanded-image" />
                {window.innerWidth < 600 ? (
                  <p className="expanded-text">
                    RoboVITics, the official robotics club of VIT Vellore,
                    fosters passionate tech enthusiasts by supporting robotics
                    projects and workshops. Our teams have achieved numerous
                    accolades for their innovative work.
                  </p>
                ) : (
                  <p className="expanded-text">
                    We, RoboVITics - The official club of VIT, are a collection
                    of vehement tech enthusiasts with the aspiration to learn
                    and hone our skills & the drive to excel. As the official
                    robotics club of VIT Vellore, our motto is to support
                    aspiring robotics enthusiasts in working on jaw-dropping
                    projects and discovering their specialities by holding
                    numerous interactive workshops, seminars, and practical
                    sessions. We work together on some remarkable projects and
                    support exemplary teams that have received numerous
                    accolades.
                  </p>
                )}
              </div>
            )}
          </div>
          <div
            id="second"
            className="card"
            ref={(el) => (cardsRef.current[1] = el)}
            onMouseEnter={() => handleMouseEnter("second")}
            onMouseLeave={handleMouseLeave}
          >
            {getCardContent(
              "second",
              "https://res.cloudinary.com/dtuqpup4a/image/upload/fl_preserve_transparency/v1727411426/ROBOWARSmainLOGO_nerwxl.jpg?_s=public-apps",
              <div className="expanded-content">
                <img src={AboutImage} alt="About" className="expanded-image" />
                {window.innerWidth < 600 ? (
                  <p className="expanded-text">
                    ROBOWARS, the flagship event of graVITas, is one of India's
                    largest combat robotics competitions, featuring over 40 bots
                    battling for glory. Teams worldwide compete in an
                    adrenaline-filled spectacle.
                  </p>
                ) : (
                  <p className="expanded-text">
                    ROBOWARS is the flagship event of graVITas and one of the
                    biggest combat robotics events in India. More than 40 bots
                    engage in thrilling battles around-the-clock in the largest
                    and safest arena in India for a chance to win the
                    championship with their war machines. It proves to be an
                    adrenaline rush to the participants as well as the audience.
                    Teams all over the globe gather here to show off their
                    fighting spirits and attain glory.
                  </p>
                )}
              </div>
            )}
          </div>
          <div
            id="third"
            className="card"
            ref={(el) => (cardsRef.current[2] = el)}
            onMouseEnter={() => handleMouseEnter("third")}
            onMouseLeave={handleMouseLeave}
          >
            {getCardContent(
              "third",
              GravLogo,
              <div className="expanded-content">
                <img
                  src="https://res.cloudinary.com/dtuqpup4a/image/upload/fl_preserve_transparency/v1727411408/gravitas_vitjpeg_im9ljt.jpg?_s=public-apps"
                  alt="About"
                  className="expanded-image"
                />
                {window.innerWidth < 600 ? (
                  <p className="expanded-text">
                    Gravitas, VIT's annual techno-management carnival, enriches
                    students' and researchers' technological skills through a
                    wide range of innovative engineering events.
                  </p>
                ) : (
                  <p className="expanded-text">
                    Gravitas, VIT's annual techno-management carnival, is
                    designed to both entertain and enhance the technological
                    skills of students and researchers. It serves as a dynamic
                    platform that brings together a wide range of innovative
                    events spanning every field of engineering. From workshops
                    and competitions to seminars and exhibitions, Gravitas
                    encourages participants to explore cutting-edge
                    technologies, engage in hands-on learning experiences, and
                    collaborate on groundbreaking ideas, making it a celebration
                    of knowledge, creativity, and innovation.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </center>
    </div>
  );
}
