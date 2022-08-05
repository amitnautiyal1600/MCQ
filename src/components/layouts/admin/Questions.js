import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';

export default function Questions(props) {
    document.title = 'MCQ APP | PAPERS';
    const params = useParams();
    const paper_id = params.paper_id;

    let navBackgroundColor = props.mode === 'light' ? 'bg-light' : 'bg-dark';
    let navFontColor = props.mode === 'light' ? 'text-dark' : 'text-light';

    const [questions, setQuestions] = useState([]);

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [questionComplete, setQuestionComplete] = useState(false);

    const [selectedAnswer, setSelectedAnswer] = useState([]);
    const [answers, setAnswers] = useState([]);

    const [score, setScore] = useState(0);

    const [btnText, setBtnText] = useState('Next Question');
    const [error, setError] = useState([]);

    const [complete, setComplete] = useState();


    let percentPlus = 100 / questions.length;
    const [progressPercent, setProgressPercent] = useState({ width: percentPlus * currentQuestion + '%' });

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (complete === true) {
            axios.post('/save-result', { paper_id: paper_id, answers })
                .then(function (response) {
                    setScore(response.data.score);
                    setQuestionComplete(true);
                })
                .catch(function (errorData) {
                    console.log(errorData)
                    if (errorData.response.data === undefined) {
                        setError({ status: false, message: 'Backend API is not responding.' });
                    } else {
                        setError(errorData.response.data.errors);
                    }
                });
        }
    }, [complete, paper_id, answers]);

    useEffect(() => {
        axios.get('/paper-question/' + paper_id)
            .then(function (response) {
                const paper_data = response.data;
                setIsLoaded(true);
                setQuestions(paper_data.questions);
            })
            .catch(function (errorData) {
                if (errorData.response.data === undefined) {
                    setError({ status: false, message: 'Backend API is not responding.' });
                } else {
                    setError(errorData.response.data);
                }
            });

    }, [paper_id]);

    const handleAnswerOptionClick = () => {
        if (selectedAnswer.length < 0) {
            swal({
                title: "Wrong Selection!!",
                text: "Please choose one option.",
                icon: "warning",
            });
            return false;
        }
        setAnswers(answers => [...answers, selectedAnswer]);
        const nextQuestion = currentQuestion + 1;
        setProgressPercent({ width: percentPlus * nextQuestion + '%' });
        if (nextQuestion === questions.length - 1) {
            setBtnText('Submit Question')
        }
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setComplete(true);
        }
    };

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
                <section className="py-3 text-center container" style={{ margin: '20px auto 300px auto' }}>
                    <div className='row py-lg-5'>
                        <div className="progress mb-2" >
                            <div className="progress-bar progress-bar-striped bg-success" role="progressbar" style={progressPercent} aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <span className="text-danger badge">{error.message}</span>
                        {questionComplete ? (
                            <div className={`card text-center ${navBackgroundColor} ${navFontColor} border-success`} style={{ margin: '20px auto 300px auto' }}>
                                <div className="card-header border-success"><h3>Result</h3></div>
                                <div className="card-body text-success">
                                    <h3 className="card-title">Score</h3>
                                    <p className="card-text">You scored {score} out of {questions.length}</p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className={`card text-center ${navBackgroundColor} border-primary`}>
                                    <div className="card-header">
                                        <span>Question {currentQuestion + 1}</span>/{questions.length}
                                    </div>
                                    <div className="card-body">
                                        <h5 className="card-title">{questions[currentQuestion].quetion_text}</h5>
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                {questions[currentQuestion].answers.map((answerOption) => (
                                                    <div className={`input-group-text my-2 ${navBackgroundColor} ${navFontColor} border-primary`} key={answerOption.id}>
                                                        <input type="radio" name="answer" className='mx-2' onClick={() => setSelectedAnswer([answerOption.question_id, answerOption.id])} /> {answerOption.answer}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <button className="btn btn-primary" onClick={() => handleAnswerOptionClick()}>{btnText}</button>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </section>
            </main >
        );
    }
}

