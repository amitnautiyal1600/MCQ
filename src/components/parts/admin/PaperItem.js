import React from 'react'
import { Link } from 'react-router-dom'

export default function PaperItem(props) {
    return (
        <div className='col'>
            <div className={`card text-center ${props.navBackgroundColor} border-primary`}>
                <div className="card-header">
                    <h4 className=''>{props.title}</h4>
                </div>
                <div className="card-body">
                    <p className="card-text">{props.description}</p>
                    <Link to={`/questions/${props.paper_id}`} className="btn btn-primary">Start Quizz</Link>
                </div>
                <div className="card-footer text-muted">
                    {props.time} min
                </div>
            </div>
        </div>
    )
}
