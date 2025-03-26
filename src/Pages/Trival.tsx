import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";



interface Question {
    num: number,
    quest:string,
    answer: string
}
const month:[] = ["January", "February", "March","April","May","June","July","August","September","October","November","December"];
let monthr=Math.floor(Math.random()*11);
let cc=Math.floor(Math.random()*2);
let bb="beofre";
let monthr2=0;
if(cc==0){
    bb="before";
    monthr2=monthr-1;

}
else{
    bb="after";
    monthr2=monthr+1;

}

if(monthr2<0){
    monthr=11;
}


const questions: Question[] = [
    { num: 1, quest: "A female dog is called?", answer: "Bitch" },
    { num: 2, quest: "A group of wolves is called?", answer: "Pack" },
    { num: 3, quest: "Name a country that ends with 'rk'?", answer: "Denmark" },
    { num: 4, quest: "How many colors are in the rainbow?", answer: "7" },
    { num: 5, quest: `Which Month comes ${bb} ${month[monthr]}?`, answer: `${month[monthr2]}` },
    { num: 6, quest: "Name a country that starts with 'Q'?", answer: "Qatar" },
    { num: 7, quest: "Name a country that starts with 'Y'?", answer: "Yemen" },
    { num: 8, quest: "Name a country that ends with 'Q'?", answer: "Iraq" },
    { num: 9, quest: "What is the largest land animal?", answer: "Elephant" },
    { num: 10, quest: "How many bones does shark has", answer: "0" },
    { num: 11, quest: "How many heart does octopus has", answer: "3" },
    { num: 12, quest: "Which musician has the most grammy award?", answer: "Beyonce" },
    { num: 13, quest: "What is the chemical formula of water?", answer: "H2O" },
    { num: 14, quest: "What is the largest organ in human body?", answer: "Skin" },
    { num: 15, quest: "What is the largest acquatic animal?", answer: "Blue whale" },
    { num: 16, quest: "Name one country that starts with V and ends with M", answer: "Vietnam" },
    { num: 17, quest: "Type 1 class of food that start with P", answer: "Protein" },
    { num: 18, quest: "How many days are there in december", answer: "31" },
    { num: 19, quest: "What is the 17th alphabet", answer: "Q" },
    { num: 20, quest: "What is the full meaning of POV", answer: "point of view" },
    
];
    
    
    
   
    


function Trival({duration}:{duration:number}) {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(duration);
    const [score, setScore] = useState(0);
    const [value, setValue] = useState(""); // Track user input
    const [gameOver, setGameOver] = useState(false); // Track game status
    const clickme=(vals: string) =>{
        if(vals=="clear"){
            setValue("");
        }
        else{
        setValue((prev) => prev + vals);
        }
      }
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
    

    
  
    // const clears=() => {
    //   setVal("");
    // }

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
                    <div className="myquestion2">({currentQuestionIndex+1}) {questions[currentQuestionIndex].quest}</div>
                    <div className="myanswer2">
                        <input className="laptop"
                            value={value}
                            type="text"
                            placeholder="Your answer..."
                            onChange={(e) => setValue(e.target.value)}
                        />

                    <input className="mobile"
                            readOnly
                            value={value}
                            type="text"
                            placeholder="Your answer..."
                            onChange={(e) => setValue(e.target.value)}
                        />
                    </div>
                    <div className="timeleft">
                    <span>{timeLeft}</span>
                        Time left 
                        </div>

                        <div className="keyboard2">
                            <div className="keyboardiv2">
                                <div class="keyboardrow">
                                <button onClick={() => clickme("1")}>1</button>
                                <button onClick={() => clickme("2")}>2</button>
                                <button onClick={() => clickme("3")}>3</button>
                                <button onClick={() => clickme("4")}>4</button>
                                <button onClick={() => clickme("5")}>5</button>
                                <button onClick={() => clickme("6")}>6</button>
                                <button onClick={() => clickme("7")}>7</button>
                                <button onClick={() => clickme("8")}>8</button>
                                <button onClick={() => clickme("9")}>9</button>
                                <button onClick={() => clickme("0")}>0</button>
                                </div>
                                <div class="keyboardrow">
                                <button onClick={() => clickme("Q")}>Q</button>
                                <button onClick={() => clickme("W")}>W</button>
                                <button onClick={() => clickme("E")}>E</button>
                                <button onClick={() => clickme("R")}>R</button>
                                <button onClick={() => clickme("T")}>T</button>
                                <button onClick={() => clickme("Y")}>Y</button>
                                <button onClick={() => clickme("U")}>U</button>
                                <button onClick={() => clickme("I")}>I</button>
                                <button onClick={() => clickme("O")}>O</button>
                                <button onClick={() => clickme("P")}>P</button>
                                </div>
                                <div class="keyboardrow">
                                <button onClick={() => clickme("A")}>A</button>
                                <button onClick={() => clickme("S")}>S</button>
                                <button onClick={() => clickme("D")}>D</button>
                                <button onClick={() => clickme("F")}>F</button>
                                <button onClick={() => clickme("G")}>G</button>
                                <button onClick={() => clickme("H")}>H</button>
                                <button onClick={() => clickme("J")}>J</button>
                                <button onClick={() => clickme("K")}>K</button>
                                <button onClick={() => clickme("L")}>L</button>
                                </div>
                                <div class="keyboardrow">
                                <button onClick={() => clickme("-")}>-</button>
                                <button onClick={() => clickme("Z")}>Z</button>
                                <button onClick={() => clickme("X")}>X</button>
                                <button onClick={() => clickme("C")}>C</button>
                                <button onClick={() => clickme("V")}>V</button>
                                <button onClick={() => clickme("B")}>B</button>
                                <button onClick={() => clickme("N")}>N</button>
                                <button onClick={() => clickme("M")}>M</button>
                                <button style={{marginLeft:"10px"}} onClick={() => clickme("clear")}><ArrowLeft /></button>
                                </div>
                                <div class="keyboardrow">
                                <button className="spaces" onClick={() => clickme(" ")}>space</button>
                                </div>
                                
                                
                            </div>
                        </div>
                </div>

                
            )}
        </div>
    );
}

export default Trival;
