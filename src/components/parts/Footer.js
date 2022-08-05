import React from 'react'

export default function Footer(props) {
    let navBackgroundColor = props.mode === 'light' ? 'footer-light' : 'footer-dark';
    let navFontColor = props.mode === 'light' ? 'text-dark' : 'text-light';
    let border = props.mode === 'light' ? 'footer-border-dark' : 'footer-border-light';
    return (
        <footer className={`footer mt-auto ${navBackgroundColor} ${navFontColor} ${border}`}>
            <div className='container'>
                <p className='py-2'>All Right Reserved © 2022 </p>
            </div>
        </footer>
    )
}
