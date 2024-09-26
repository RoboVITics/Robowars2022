// import React from "react";
// import { Container, Carousel } from "react-bootstrap";

// const sponsors = [
//   { name: "Sponsor 1", logo: "https://via.placeholder.com/150" },
//   { name: "Sponsor 2", logo: "https://via.placeholder.com/150" },
//   { name: "Sponsor 3", logo: "https://via.placeholder.com/150" },
//   { name: "Sponsor 4", logo: "https://via.placeholder.com/150" },
//   { name: "Sponsor 5", logo: "https://via.placeholder.com/150" },
//   { name: "Sponsor 6", logo: "https://via.placeholder.com/150" },
// ];

// const SponsorSection = () => {
//   return (
//     <section className="py-5">
//       <Container>
//         {/* Our Sponsors title */}
//         <h2 className="text-center text-white mb-4">Our Sponsors</h2>

//         {/* Carousel for Sponsors */}
//         <Carousel indicators={false} interval={2000} pause={false}>
//           {sponsors.map((sponsor, index) => (
//             <Carousel.Item key={index}>
//               <div className="d-flex justify-content-center">
//                 <img
//                   src={sponsor.logo}
//                   alt={sponsor.name}
//                   className="img-fluid"
//                   style={{ maxHeight: "100px" }}
//                 />
//               </div>
//               <Carousel.Caption>
//                 <h5 className="text-white">{sponsor.name}</h5>
//               </Carousel.Caption>
//             </Carousel.Item>
//           ))}
//         </Carousel>
//       </Container>
//     </section>
//   );
// };

// export default SponsorSection;