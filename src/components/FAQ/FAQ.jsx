import React, { useRef, useState } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import "./FAQ.css";

const FAQ = () => {
  const controls = useAnimation();
  const [activeIndex, setActiveIndex] = useState(null); // Track the currently opened FAQ
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  if (inView) {
    controls.start("visible");
  }

  // Function to handle FAQ toggle
  const toggleFAQ = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div>
      <h1 className="faqText">FAQ</h1>
      <motion.div
        className="faq-container"
        id="faqsection"
        ref={ref}
        variants={{
          hidden: { opacity: 0.8, x: -200 },
          visible: { opacity: 1, x: 0 },
        }}
        initial="hidden"
        animate={controls}
        transition={{ duration: 1 }}
      >
        {faqData.map((faq, index) => (
          <div className="faq-tab" key={index}>
            {/* Header section that toggles the FAQ */}
            <div
              className="faq-header"
              onClick={() => toggleFAQ(index)}
              style={{
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "15px",
                backgroundColor: activeIndex === index ? "#ef6d1e" : "#d64e2e", // Change background color when active
                color: "white",
                border: "1px solid white",
              }}
            >
              <h2>{`0${index + 1}`}</h2>
              <h3>{faq.question}</h3>
              <span>{activeIndex === index ? "×" : "+"}</span>
            </div>

            {/* Animated FAQ content */}
            <motion.div
              className="faq-content"
              initial={{ opacity: 0, x: -100, maxHeight: 0 }}
              animate={
                activeIndex === index
                  ? { opacity: 1, x: 0, maxHeight: 200 }
                  : { opacity: 0, x: -100, maxHeight: 0 }
              }
              transition={{ duration: 0.5, ease: "easeInOut" }}
              style={{
                overflow: "hidden",
                padding: activeIndex === index ? "10px" : "0px",
              }}
            >
              <p style={{ color: "white" }}>{faq.answer}</p>
            </motion.div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// Example FAQ data array
const faqData = [
  {
    question: "When and where is Robowars happening?",
    answer:
      "Robowars will be happening during Gravitas and will be from 27th Sep to 29th Sep at the SJT Ground. Stay tuned for the timings!",
  },
  {
    question: "How can you attend this event?",
    answer:
      "Go to the Gravitas website and search for robowars to register for the event!",
  },
  {
    question: "Who is eligible to participate?",
    answer:
      "If you’re a part of a team that builds bots and bots follow our regulations. Check out the rulebook above!",
  },
  {
    question: "How long is the event?",
    answer: "It happens for 4 hours throughout the day for up to 3 days!",
  },
];

export default FAQ;
