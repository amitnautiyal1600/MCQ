import React from 'react'
import { Link } from 'react-router-dom'

export default function Home(props) {
    let navBackgroundColor = props.mode === 'light' ? 'banner-light' : 'banner-dark';
    let navFontColor = props.mode === 'light' ? 'text-dark' : 'text-light';
    return (
        <main>
            <section className="py-3 text-center container mt-4 pt-4">
                <div className="row py-lg-5">
                    <div className={`p-4 p-md-5 mb-4 rounded ${navBackgroundColor}`}>
                        <div className="col-md-6 px-0">
                            <h1 className="display-4 fst-italic">VIDHIKARA INSTITUTE</h1>
                            <p className="lead my-3">Best Computer Institute in Rishikesh
                                Join the IT Development Course at Vidhikara Institute in Rishikesh.
                                We are working to offer you the best computer education platform
                                where you can gain the basic to advanced knowledge of IT-enabled services.</p>
                            <p className="lead mb-0"><Link to="/register" className={`badge ${navFontColor}`}>Register Today</Link></p>
                        </div>
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-md-6">
                        <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                            <div className="col p-4 d-flex flex-column position-static">
                                <h3 className="">Get Certified</h3>
                                <p className=" my-4 card-text mb-auto">Get certified and open your ways in the vast career of the IT Industry with our courses in Rishikesh.</p>
                                <Link to="/login" className={`badge ${navFontColor}`}>Login</Link>
                            </div>
                            <div className="col-auto d-none d-lg-block">
                                <img src="http://vidhikarainstitute.com/wp-content/uploads/2022/03/computer-institute.jpg" width="200px" alt="notes" />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                            <div className="col p-4 d-flex flex-column position-static">
                                <h3 className="">Career Counselling</h3>
                                <p className=" my-4 card-text mb-auto">We will give you advice and information regarding the fastest growing Digital Marketing industry.</p>
                                <Link to="/login" className={`badge ${navFontColor}`}>Login</Link>
                            </div>
                            <div className="col-auto d-none d-lg-block">
                                <img src="http://vidhikarainstitute.com/wp-content/uploads/2022/04/vit1-800x800.jpg" width="200px" alt="notes" />

                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </main >
    )
}
