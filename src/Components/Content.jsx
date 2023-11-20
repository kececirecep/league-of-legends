import React from 'react'


const Content = (props) => {
  const textStyle = {
    color: "#969284",
  };
  const borderStyle = {
    borderColor: "#969284",
  } 
  return (
    <div className="text-white mx-4 my-6 border cursor-pointer" style={borderStyle}>
      <div className="card w-[135px] h-[175px] relative">
        <img src={props.imageHero} className="w-full h-full bg-contain object-cover hover:text-white" alt="" />
        <div className="absolute inset-0 bg-black opacity-30 transition-opacity duration-300 hover:opacity-0"></div>
        <h1 className='text-center text-md py-1' style={textStyle}>{props.name}</h1>

      </div>
    </div>
  );
}

export default Content