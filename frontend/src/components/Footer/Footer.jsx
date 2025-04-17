import React from 'react';

import './Footer.css';

const Footer = () => {
  return (
    <div className='pt-28 lg:pt-36 container-fluid p-3 d-flex justify-content-center align-items-center text-white footer '>
      <h4 className='text-2xl'>Movies Watchlist</h4>
      <div className="flex items-center justify-around gap-5 sm:gap-5">
        
        <div className="flex justify-center items-center gap-0">
        <img 
          src="/copyright.png" 
          alt="copyright"
          className="w-5 h-5" 
          /> 
        <p className="m-0 p-0">
        Lakshya Sharma
        </p>
        </div>
      
        <div className="flex items-center justify-center gap-2">
          <img src="/github.png" alt="linkedin" className='w-5'/>
          <a href="https://github.com/lakshy-2004" target='_blank'><p className="m-0">lakshy-sharma</p></a>
        </div>

        <div className="flex items-center justify-center gap-2">
          <img src="/linkedin.png" alt="linkedin" className='w-5'/>
          <a href="https://www.linkedin.com/in/lakshya-sharma-67b20a275/" target='_blank'><p className="m-0">Linked in</p></a>
        </div>

      </div>
    </div>
  )
}

export default Footer