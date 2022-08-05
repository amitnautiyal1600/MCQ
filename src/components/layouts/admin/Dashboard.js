import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function Dashboard(props) {
    document.title = 'MCQ APP | DASHBOARD';
    let backgroundColor = props.mode === 'light' ? 'table-light' : 'table-dark';
    // let fontColor = props.mode === 'light' ? 'text-dark' : 'text-light';

    const [studentResult, setStudentResult] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState([]);

    useEffect(() => {
        axios.get('/test-results/')
            .then(function (response) {
                const test_results = response.data.result;
                setIsLoaded(true);
                setStudentResult(test_results);
            })
            .catch(function (errorData) {
                if (errorData.response.data === undefined) {
                    setError({ status: false, message: 'Backend API is not responding.' });
                } else {
                    setError(errorData.response.data);
                }
            });

    }, []);

    if (!isLoaded) {
        return (
            <main>
                <section className="py-2 text-center container">
                    <div className="row pt2">
                        <div className="col-lg-6 col-md-8 mx-auto">
                            <h1 className="fw-light">loading</h1>
                        </div>
                    </div>
                </section>
            </main>
        );
    } else {
        return (
            <main>
                <section className="py-3 text-center container">
                    <div className="row py-lg-5">
                        <div className="col-xl-3 col-md-6">
                            <div className="card bg-primary text-white mb-4">
                                <div className="card-body">Primary Card</div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <a className="small text-white stretched-link" href="/">View Details</a>
                                    <div className="small text-white"><i className='fa right-angle'></i> </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="card bg-warning text-white mb-4">
                                <div className="card-body">Warning Card</div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <a className="small text-white stretched-link" href="/">View Details</a>
                                    <div className="small text-white"><i className='fa right-angle'></i> </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="card bg-success text-white mb-4">
                                <div className="card-body">Success Card</div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <a className="small text-white stretched-link" href="/">View Details</a>
                                    <div className="small text-white"><i className='fa right-angle'></i> </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="card bg-danger text-white mb-4">
                                <div className="card-body">Danger Card</div>
                                <div className="card-footer d-flex align-items-center justify-content-between">
                                    <a className="small text-white stretched-link" href="/">View Details</a>
                                    <div className="small text-white"><i className='fa right-angle'></i> </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <span className="text-danger badge">{error.message}</span>
                    <div className='row bottomspace'>
                        <div className="table-responsive bottomspace">
                            <table id="table_id" className={`table table-striped table-hover table-sm ${backgroundColor} bottomspace`}>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Paper</th>
                                        <th>Score</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {studentResult.length > 0 ? (

                                        studentResult.map((results) => (
                                            <tr key={results.id}>
                                                <td>{results.user.name}</td>
                                                <td>{results.paper.paper_name}</td>
                                                <td><span className='score'>{results.score}</span></td>
                                                <td>{results.created_at}</td>
                                            </tr>
                                        ))

                                    ) : (
                                        <tr>
                                            <td className='text-danger' colSpan={4}>No Record Found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </main >
        );
    }
}
