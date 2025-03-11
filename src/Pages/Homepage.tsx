import { useState, useEffect } from "react";



interface Question {
    num: number,
    quest:string,
    answer: string
}

const questions: Question[] = [];
    let sign=["+","-"];
    let sign1=["+","-","*"];
    
    for(let y=0;y<5;y++){
        if(Math.floor(Math.random()*2)==0){
        let srand=Math.floor(Math.random()*3);
        let srand1=Math.floor(Math.random()*3);
        let rand1=Math.floor(Math.random()*5);
        let rand2=Math.floor(Math.random()*5);
        let rand3=Math.floor(Math.random()*5);
        let a=eval(rand1+sign1[srand]+rand2+sign1[srand1]+rand3);
        questions.push({ num: y, quest: ` ${rand1} ${sign1[srand]} ${rand2} ${sign1[srand1]} ${rand3}`, answer:`${a}`})

        }
        else{
            let srand=Math.floor(Math.random()*2);
            let rand1=Math.floor(Math.random()*50);
            let rand2=Math.floor(Math.random()*50);
            let a=eval(rand1+`${sign[srand]}`+rand2);
            questions.push({ num: y, quest: ` ${rand1} ${sign[srand]} ${rand2}`, answer:`${a}`})
        }
        
    }
   // { num: 6, quest: ` ${rand1} - ${rand2}`, answer:`${a}`},
    // { num: 1, quest: "A female dog is called?", answer: "Bitch" },
    // { num: 2, quest: "A group of wolves is called?", answer: "Pack" },
    // { num: 3, quest: "Name a country that ends with 'rk'?", answer: "Denmark" },
    // { num: 4, quest: "How many colors are in the rainbow?", answer: "7" },
    // { num: 5, quest: "Which Month comes before August?", answer: "July" }
    


function Homepage({duration}:{duration:number}) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(duration);
    const [score, setScore] = useState(0);
    const [value, setValue] = useState(""); // Track user input
    const [gameOver, setGameOver] = useState(false); // Track game status

    useEffect(() => {
        if (gameOver) return; // Stop the timer when the game is over

        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, [currentQuestionIndex, gameOver]);

    useEffect(() => {
        if (timeLeft === 0) {
            if (value.trim().toLowerCase() === questions[currentQuestionIndex].answer.toLowerCase()) {
                setScore((prev) => prev + 1);
            }

            if (currentQuestionIndex === questions.length - 1) {
                setGameOver(true); // End game when all questions are answered
            } else {
                setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
                setTimeLeft(duration); // Reset timer for next question
                setValue(""); // Clear input
            }
        }
    }, [timeLeft]);
    


    return (
        <div className="realquiz">
            {gameOver ? (
                <div className="gameover">
                    <h3>Game Over</h3>
                        <div className="detailsrow">
                            <span>Total Score:</span>
                            <b>{score}</b>
                        </div>

                        <div className="detailsrow">
                            <span>Total Questions:</span>
                            <b>{questions.length}</b>
                        </div>

                        <div className="detailsrow">
                            <span>Question per second:</span>
                            <b>{duration}</b>
                        </div>

                        <div className="detailsrow">
                            <span>Grade:</span>
                            <b>{questions.length > score * 2?"Fail":"Pass"}</b>
                        </div>

                        <div className="detailsrow">
                            <span>Score Rate:</span>
                            <b>{(100 * score) / questions.length}%</b>
                        </div>


                        



                    

                    
                    
                </div>
            ) : (
                <div className="gameplays">
                    <div className="myquestion">{questions[currentQuestionIndex].quest}</div>
                    <div className="myanswer">
                        <input
                            value={value}
                            type="text"
                            placeholder="Your answer..."
                            onChange={(e) => setValue(e.target.value)}
                        />
                    </div>
                    <div className="timeleft">Time left: 
                        <span>{timeLeft}</span></div>
                </div>
            )}
        </div>
    );
}

export default Homepage;
