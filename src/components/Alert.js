import React from 'react'

export default function alert(props) {
    const chng=(word)=>{
        if(word=="danger")
        word="error"
        return word;
    }
  return (
    <div style={{height:'50px'}}>
    { props.alert && <div className={`alert alert-${props.alert.type}`} role="alert">
     <strong>{chng(props.alert.type)}</strong>: {props.alert.msg}
</div>
  }
  </div>

  )
}
