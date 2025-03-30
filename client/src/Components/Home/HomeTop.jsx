import React from 'react';
import HomeHeroNav from '../LandingPage/HomeHeroNav';


function HomeTop() {
    return ( <HomeHeroNav
      display={true}
      mainclass="nav-main-list"
      navItemMain="nav-item-main-list"
      navItemUser="nav-items-user-list"
      Home="homee"
      img="\media\Images\logo.png"
      imgClass="nav-logo-list"
      is={true}
    />
     );
}

export default HomeTop;