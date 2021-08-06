import { useState } from 'react';
import "./App.css";
import Timer from "./Timer/Timer";
import { interval } from "rxjs";
import { map } from "rxjs/operators";

const delay = 1000;

function App() {
const [timer, setTimer] = useState(0);
const [diff, setDiff] = useState(0);

const [subscription, setSubscription] = useState("");
const [prevent, setPrevent] = useState(true);

const StartHandler = () => {
  if (!subscription) {
    const timerSubscription = interval(delay)
      .pipe(map((v) => v + 1))
      .subscribe((v) => {
        setTimer(v + diff);
      });
    setSubscription(timerSubscription);
  } else {
    subscription.unsubscribe();
    setTimer(0);
    setDiff(0);
    setSubscription("");
  }
};

const WaitHandler = (event) => {
  if (prevent) {
    setPrevent(false);
    const timerInstance = setTimeout(function () {
      setPrevent(true);
      clearTimeout(timerInstance);
    }, 300);
  } else {
    if (subscription) {
      subscription.unsubscribe();
    }

    setDiff(timer);
    setSubscription("");
  }
};

const ResetHandler = () => {
  if (subscription) {
    subscription.unsubscribe();
  }

  const timerSubscription = interval(delay).subscribe((v) => {
    setTimer(v);
  });
  setSubscription(timerSubscription);
};

  return (
    <div className="App">
    <h1>RxJs Stopwatch</h1>
      <div className="stopwatch">

        <div className="display">
          <Timer time={timer ? timer : diff} />
        </div>

        <div className="buttons">
          <button onClick={StartHandler} className="btn btn-s">Start/Stop</button>
          <button onClick={WaitHandler} className="btn btn-w">Wait</button>
          <button onClick={ResetHandler} className="btn btn-r">Reset</button>
        </div>
      </div>
    </div>
  );
}

export default App;
