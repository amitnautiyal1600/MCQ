import React, { useEffect, useState } from 'react'
import PaperItem from '../../parts/admin/PaperItem';

export default function Papers(props) {
    document.title = 'MCQ APP | PAPERS';
    let navBackgroundColor = props.mode === 'light' ? 'bg-light' : 'bg-dark';
    let navFontColor = props.mode === 'light' ? 'text-dark' : 'text-light';

    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const axios = require('axios').default;
        axios.get('/papers')
            .then(function (response) {
                const paper_data = response.data;
                setIsLoaded(true);
                setItems(paper_data);
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
                // always executed
            });

    }, [])

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

                <section className="py-2 text-center container" style={{ margin: '20px 0px 300px 0px' }}>
                    <div className="row pt-5">
                        <div className="row row-cols-1 row-cols-sm-4 row-cols-md-4 g-3">
                            {items.map(item => (
                                <PaperItem key={item.id} navBackgroundColor={navBackgroundColor} navFontColor={navFontColor} title={item.paper_name} description={item.description} time={item.paper_time} paper_id={item.id} />
                            ))}
                        </div>
                    </div>
                </section>



                {/* <nav aria-label="Page navigation example">
                    <ul className="pagination">
                        <li className="page-item">
                            <a className="page-link" href="/" aria-label="Previous">
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                        </li>
                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item">
                            <a className="page-link" href="#" aria-label="Next">
                                <span aria-hidden="true">&raquo;</span>
                            </a>
                        </li>
                    </ul>
                </nav> */}

            </main>
        )
    }
}


