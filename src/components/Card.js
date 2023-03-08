import React from "react";


export function Card(props, children) {

  function classes() {
    const bg = props.bgcolor ? 'bg-' + props.bgcolor : ' ';
    const txt = props.txtcolor ? 'text-' + props.txtcolor : ' ';
    return "card-header " + bg + " " + txt;
  }

  return (
    <div className="card mb-3" style={{maxWidth: "26rem"}}>
      <div className={classes()}>
        <b>{props.header}</b>
      </div>
      <div className="card-body">
        {props.title && (<h3 className="card-title">{props.title}</h3>)}
        {props.text && (<div className="card-text">{props.text}</div>)}
        {props.children}
      </div>
    </div>
  )
}