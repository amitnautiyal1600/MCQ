
export default function QuestionItem(props) {


    const questions = [
        {
            questionText: 'What is the capital of France?',
            answerOptions: [
                { id: '1', answerText: 'New York', isCorrect: false },
                { id: '2', answerText: 'London', isCorrect: false },
                { id: '3', answerText: 'Paris', isCorrect: true },
                { id: '4', answerText: 'Dublin', isCorrect: false },
            ],
        },
        {
            questionText: 'Who is CEO of Tesla?',
            answerOptions: [
                { id: '5', answerText: 'Jeff Bezos', isCorrect: false },
                { id: '6', answerText: 'Elon Musk', isCorrect: true },
                { id: '7', answerText: 'Bill Gates', isCorrect: false },
                { id: '8', answerText: 'Tony Stark', isCorrect: false },
            ],
        },
        {
            questionText: 'The iPhone was created by which company?',
            answerOptions: [
                { id: '9', answerText: 'Apple', isCorrect: true },
                { id: '10', answerText: 'Intel', isCorrect: false },
                { id: '11', answerText: 'Amazon', isCorrect: false },
                { id: '12', answerText: 'Microsoft', isCorrect: false },
            ],
        },
        {
            questionText: 'How many Harry Potter books are there?',
            answerOptions: [
                { id: '13', answerText: '1', isCorrect: false },
                { id: '14', answerText: '4', isCorrect: false },
                { id: '15', answerText: '6', isCorrect: false },
                { id: '16', answerText: '7', isCorrect: true },
            ],
        },
    ];

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [score, setScore] = useState(0);

    const handleAnswerOptionClick = (isCorrect) => {
        if (isCorrect) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };
    return (
        <main>
            <section className="py-3 text-center container">
                <div className="row py-lg-5">
                    <div className="p-4 p-md-5 mb-4 rounded text-bg-dark">
                        <div className="col-md-6 px-0">
                            <h1 className="display-4 fst-italic">Welcome To MCQ</h1>
                            <p className="lead my-3">Discover new way to learn and practice MCQs for SSC, IBPS, Bank PO, Campus selection and other aptitude based exams. Ask questions and be sure for the answers.</p>
                            <p className="lead mb-0"><a href="/" className="text-white fw-bold">Register Today</a></p>
                        </div>
                    </div>
                </div>
                <div className='row py-lg-5 app'>
                    {showScore ? (
                        <div className='score-section'>
                            You scored {score} out of {questions.length}
                        </div>
                    ) : (
                        <>
                            <div className='question-section'>
                                <div className='question-count'>
                                    <span>Question {currentQuestion + 1}</span>/{questions.length}
                                </div>
                                <div className='question-text'>{questions[currentQuestion].questionText}</div>
                            </div>
                            <div className='answer-section'>
                                {questions[currentQuestion].answerOptions.map((answerOption) => (
                                    <button key={answerOption.id} onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>
        </main>
    );
}



