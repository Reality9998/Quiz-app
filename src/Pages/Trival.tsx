import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";

interface Question {
    num: number,
    quest: string,
    answer: string
}

// Function to shuffle an array (Fisher-Yates Algorithm)
const shuffleArray = (array: Question[]) => {
    let shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
};

const questionsData: Question[] = [
    { num: 1, quest: "A female dog is called?", answer: "Bitch" },
    { num: 2, quest: "A group of wolves is called?", answer: "Pack" },
    { num: 3, quest: "Name a country that ends with 'rk'?", answer: "Denmark" },
    { num: 4, quest: "How many colors are in the rainbow?", answer: "7" },
    { num: 5, quest: "Name a country that starts with 'Q'?", answer: "Qatar" },
    { num: 6, quest: "Name a country that starts with 'Y'?", answer: "Yemen" },
    { num: 7, quest: "Name a country that ends with 'Q'?", answer: "Iraq" },
    { num: 8, quest: "What is the largest land animal?", answer: "Elephant" },
    { num: 9, quest: "How many bones does a shark have?", answer: "0" },
    { num: 10, quest: "How many hearts does an octopus have?", answer: "3" },
    { num: 11, quest: "Which musician has the most Grammy awards?", answer: "Beyonce" },
    { num: 12, quest: "What is the chemical formula of water?", answer: "H2O" },
    { num: 13, quest: "What is the largest organ in the human body?", answer: "Skin" },
    { num: 14, quest: "What is the largest aquatic animal?", answer: "Blue whale" },
    { num: 15, quest: "Name one country that starts with V and ends with M", answer: "Vietnam" },
    { num: 16, quest: "Type 1 class of food that starts with P", answer: "Protein" },
    { num: 17, quest: "How many days are there in December?", answer: "31" },
    { num: 18, quest: "What is the 17th alphabet?", answer: "Q" },
    { num: 19, quest: "What is the full meaning of POV?", answer: "Point of View" },
];

function Trival({ duration }: { duration: number }) {
    const [shuffledQuestions, setShuffledQuestions] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(duration);
    const [score, setScore] = useState(0);
    const [value, setValue] = useState(""); // Track user input
    const [gameOver, setGameOver] = useState(false); // Track game status

    useEffect(() => {
        setShuffledQuestions(shuffleArray(questionsData)); // Shuffle questions on mount
    }, []);

    useEffect(() => {
        if (gameOver) return; // Stop the timer when the game is over

        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, [currentQuestionIndex, gameOver]);

    useEffect(() => {
        if (timeLeft === 0) {
            if (value.trim().toLowerCase() === shuffledQuestions[currentQuestionIndex]?.answer.toLowerCase()) {
                setScore((prev) => prev + 1);
            }

            if (currentQuestionIndex === shuffledQuestions.length - 1) {
                setGameOver(true); // End game when all questions are answered
            } else {
                setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
                setTimeLeft(duration); // Reset timer for next question
                setValue(""); // Clear input
            }
        }
    }, [timeLeft]);

    const clickme = (vals: string) => {
        if (vals == "clear") {
            setValue("");
        } else {
            setValue((prev) => prev + vals);
        }
    };

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
                        <b>{shuffledQuestions.length}</b>
                    </div>

                    <div className="detailsrow">
                        <span>Question per second:</span>
                        <b>{duration}</b>
                    </div>

                    <div className="detailsrow">
                        <span>Grade:</span>
                        <b>{shuffledQuestions.length > score * 2 ? "Fail" : "Pass"}</b>
                    </div>

                    <div className="detailsrow">
                        <span>Score Rate:</span>
                        <b>{(100 * score) / shuffledQuestions.length}%</b>
                    </div>
                </div>
            ) : (
                <div className="gameplays">
                    <div className="myquestion2">
                        ({currentQuestionIndex + 1}) {shuffledQuestions[currentQuestionIndex]?.quest}
                    </div>
                    <div className="myanswer2">
                        <input
                            className="laptop"
                            value={value}
                            type="text"
                            placeholder="Your answer..."
                            onChange={(e) => setValue(e.target.value)}
                        />

                        <input
                            className="mobile"
                            readOnly
                            value={value}
                            type="text"
                            placeholder="Your answer..."
                        />
                    </div>
                    <div className="timeleft">
                        <span>{timeLeft}</span> Time left
                    </div>

                    <div className="keyboard2">
                        <div className="keyboardiv2">
                            {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "-", "Z", "X", "C", "V", "B", "N", "M"].map((char) => (
                                <button key={char} onClick={() => clickme(char)}>
                                    {char}
                                </button>
                            ))}
                            <button style={{ marginLeft: "10px" }} onClick={() => clickme("clear")}>
                                <ArrowLeft />
                            </button>
                            <button className="spaces" onClick={() => clickme(" ")}>
                                space
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Trival;
