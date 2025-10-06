import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="header">
        <div className="container w-4/5 mx-auto py-6 flex md:flex-row flex-col justify-between items-center">
          <div className="left_section">
            <div className="content py-4 text-center md:text-left">
              <h1 className="md:text-8xl text-5xl font-poppins font-bold py-2">
                SK<span className="text-myblue">i</span>LL SHARE
                <span className="text-myblue">.</span>
              </h1>
              <p className="font-outfit md:text-2xl text-md my-1">
                “Connecting students through skills.”
              </p>
              <button className="my-6">
                <Link to="/exploreSkills"  className="mt-4 cursor-pointer text-2xl font-outfit border-2 border-myblue py-2 px-8 rounded-full hover:bg-myblue hover:text-white transition text-myblue" >Explore skills <i class="ri-arrow-right-line"></i></Link>
              </button>
            </div>
          </div>
          <div className="right_section">
            <div className="img_container">
              <img
                src="https://img.freepik.com/premium-vector/online-assistant-disable-flat-vector-illustration-vector-design_538610-1603.jpg"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      {/* about section */}
      <div className="about_section mx-4 md:h-[500px]">
        <h1 className="text-center text-myblue my-4 text-5xl font-poppins font-bold" >About us</h1>
        <div className="about_content flex flex-col md:flex-row w-3/4 mx-auto">
          <div className="md:w-1/2 w-full text-center">
            <img src="https://img.freepik.com/free-vector/business-man-described-showing-graph-stock-financial-trade-market-diagram-vector-illustration-flat-design_1150-39768.jpg?semt=ais_hybrid&w=740" alt="" />
          </div>
          <div className="md:w-1/2 md:px-6 w-full">
            <p className="text-xl text-justify font-outfit px-1">
              We are a team of passionate students building a peer-to-peer
              skill-sharing platform that empowers learners to connect,
              collaborate, and grow together. Our mission is to create a
              community where everyone can share their knowledge, discover new
              skills, and schedule interactive learning sessions with
              like-minded peers. Through this platform, we aim to make learning
              more accessible, engaging, and collaborative, ensuring that every
              student not only learns but also contributes by teaching others.
              Together, we believe in the power of “Learn. Share. Grow.”
            </p>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Home;
