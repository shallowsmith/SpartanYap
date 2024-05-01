import React from "React";

export const About = () => {
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
            <p>A problem at San Jose State University is students are afraid to speak up on the SammyAPP as there identity is exposed.</p>
          </div>
  
          <div className="robot-image">
            <img src={robot} alt="Robot Pic" className="robot-image" />
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
  
          {/* Image of PNM Class */}
          <div className="pnm-class-container">
            <img src={groupPicture} alt="SpartanYap" className="pnm-class-image" />
          </div>
  
          {/* Second Box */}
          <div className="other-div">
            <h3>Our Team:</h3>
            <p>James Kim, Kyle Chu, Allen Le, Joshua Hsieh</p>
            
          </div>
  
          {/* Horizontal line */}
          <hr className="line" />
  
          {/* Powered by People */}
          
  
          
        </div>
      </div>
    );
  };