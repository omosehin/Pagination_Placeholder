import React from 'react'

 const Card=({body,title,cardTitleStyle,cardBodyStyle,className})=>{
    return (
                <div>
                    <div className={`font-weight-bolder mt-3 ${cardTitleStyle}`}>{title}</div>
                    <div className={`mt-3 mb-3 ${cardBodyStyle}`}>{body}</div>
                </div>
    )
}

export default Card;