import React from 'react';

export default function Status(props) {
  
  return (
    <div style={{textShadow: "2px 2px 10px #000000"}}>
        <h4>Status: <span style={{color: props.statusTextColor}}> {props.statusText} </span> </h4>
    </div>
  );
}

