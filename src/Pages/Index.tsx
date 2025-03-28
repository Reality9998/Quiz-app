import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import Homepage from "./Homepage";
import Trival from "./Trival";

function Index() {
    const restart = () => window.location.reload();

    const [category, setCategory] = useState<string>("");
    const [game, setGame] = useState<string>("menu");
    const [duration, setDuration] = useState<number | null>(null);

    // Duration mapping
    const durations: Record<string, number> = {
        play1: 3,
        play2: 4,
        play3: 5,
        play4: 7,
        play5: 10,
    };

    return (
        <div className="quizbody">
            <div className="leftbody">
                <p>Online Quiz built with React.js<br />Play for fun</p>
            </div>
            <div className="rightbody">
                <div className="inboxright">
                    {/* Menu Screen */}
                    {game === "menu" && (
                        <>
                            <h1>Test Your Knowledge</h1>
                            <p>Your capacity for thinking</p>

                            <h2>Select Category</h2>
                            <button onClick={() => setCategory("trivia")}>Trivia Questions</button>

                            {category === "trivia" && (
                                <div className="timeseconds">
                                    <span>Total Questions: 20</span>
                                    <span>Set Duration</span>
                                    <div className="seconds">
                                        {Object.entries(durations).map(([key, sec]) => (
                                            <b key={key} onClick={() => {
                                                setGame("trivia");
                                                setDuration(sec);
                                            }}>
                                                {sec} Seconds
                                            </b>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <button onClick={() => setCategory("maths")}>Maths Quiz (Simple Calculation)</button>

                            {category === "maths" && (
                                <div className="timeseconds">
                                    <span>Total Questions: 10</span>
                                    <span>Set Duration</span>
                                    <div className="seconds">
                                        {Object.entries(durations).map(([key, sec]) => (
                                            <b key={key} onClick={() => {
                                                setGame(key);
                                                setDuration(sec);
                                            }}>
                                                {sec} Seconds
                                            </b>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {/* Game Screen */}
                    {durations[game] && (
                        <>
                            <div className="menuback">
                                <i onClick={restart}><ArrowLeft /></i>
                                <h2>Quiz Time</h2>
                            </div>

                            <div className="quizroom">
                                <Homepage duration={durations[game]} />
                            </div>
                        </>
                    )}

                    {game === "trivia" && duration !== null && (
                        <>
                            <div className="menuback">
                                <i onClick={restart}><ArrowLeft /></i>
                                <h2>Quiz Time</h2>
                            </div>

                            <div className="quizroom">
                                <Trival duration={duration} />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Index;
