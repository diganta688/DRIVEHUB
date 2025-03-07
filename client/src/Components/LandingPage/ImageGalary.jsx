import React from 'react';
import RollingGallery from './RollingGallery'
  

function ImageGalary() {
    return ( 
        <>
<RollingGallery autoplay={true} pauseOnHover={true} />
        </>
     );
}

export default ImageGalary;