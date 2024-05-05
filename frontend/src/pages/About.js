import React from "react";
import "./About.css";

export default function AboutPage() {
  // Slider settings

  return (
    <div id="root">
      {/* Content Section */}
      <div id="content">
        {/* Title */}
        <div className="title">
          <h2>Spartan Yap</h2>
        </div>

        {/* Objective and Purpose */}
        <div className="objective-purpose">
          <p>
            A problem at San Jose State University is students are afraid to
            speak up on the SammyAPP as there identity is exposed.
          </p>
        </div>

        {/* Horizontal line */}
        <hr className="line" />

        {/* Powered by People */}
        <div className="powered-by">
          <h2>Powered by People</h2>
        </div>

        <div className="horizontal-box1">
          <p>Built By SJSU Software Engineering Students</p>
        </div>

        {/* Horizontal line */}
        <hr className="line" />

        {/* Powered by People */}
      </div>
    </div>
  );
}
