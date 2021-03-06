import React, { useState } from "react";
import { Summary } from "./Summary";
import { RadioButton } from "RadioButton";
import { InputText } from "InputText";
import { InputTextarea } from "InputTextarea";
import { Submit } from "Submit";
import { Questions } from "Questions";
import { Select } from "Select";

export const App = () => {
  const [name, setName] = useState("");
  const [quality, setQuality] = useState("");
  const [time, setTime] = useState("");
  const [experience, setExperience] = useState("");
  const [hideForm, setHideForm] = useState(false);
  const [section, setSection] = useState("firstQuestion");
  const [error, setError] = useState(false);

  const handleRadioChange = event => {
    setQuality(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    setHideForm(hideForm => !hideForm);
  };

  const handleNext = event => {
    event.preventDefault();

    if (section === "firstQuestion") {
      setSection("secondQuestion");
    } else if (section === "secondQuestion") {
      setSection("thirdQuestion");
    } else if (section === "thirdQuestion") {
      setSection("fourthQuestion");
    }

    if (name.length <= 2) {
      setSection("firstQuestion");
      setError(true);
    }
  };

  return (
    <main>
      <section className="hero-image"></section>
      <section className="main-container">
        <h1>
          Customer Satsfaction Survey <span>"The Coffee time"</span>
        </h1>
        {hideForm && (
          <Summary
            name={name}
            time={time}
            quality={quality}
            experience={experience}
          />
        )}
        <form onSubmit={handleSubmit}>
          {section === "firstQuestion" && !hideForm && (
            <div className="questions firstQuestion">
              {!error && (
                <Questions value={"q1"} text={"Please fill in your name:"} />
              )}
              {error && <Questions value={"q1"} text={"** Name required"} />}
              <InputText
                value={name}
                onChange={event => setName(event.target.value)}
                className={"inputName"}
              />
              <Submit
                onClick={handleNext}
                text={"Next question"}
                className={"btn btn-next"}
              />
            </div>
          )}
          {section === "secondQuestion" && !hideForm && (
            <div className="questions secondQuestion">
              <Questions
                value={"q2"}
                text={`Are you satisfied with the quality of our coffee place, ${name}?`}
              />
              <RadioButton
                label="Yes"
                value="yes"
                checked={quality === "yes"}
                className={"radio"}
                onChange={handleRadioChange}
              />
              <RadioButton
                label="No"
                value="no"
                checked={quality === "no"}
                className={"radio"}
                onChange={handleRadioChange}
              />
              <Submit
                onClick={handleNext}
                text={"Next question"}
                className={"btn btn-next"}
              />
            </div>
          )}
          {section === "thirdQuestion" && (
            <div className="questions thirdQuestion">
              <Questions
                value={"q3"}
                text={"How often do you visit our place?"}
              />
              <Select
                value={time}
                onChange={event => setTime(event.target.value)}
              />
              <Submit
                onClick={handleNext}
                text={"Next question"}
                className={"btn btn-next"}
              />
            </div>
          )}
          {section === "fourthQuestion" && !hideForm && (
            <div className="questions fourthQuestion">
              <Questions
                value={"q4"}
                text={"Finally, how can we improve your experience?"}
              />
              <InputTextarea
                value={experience}
                onChange={event => setExperience(event.target.value)}
                className={"inputTextarea"}
              />
              <Submit
                onClick={handleSubmit}
                text={"Submit"}
                className={"btn btn-submit"}
              />
            </div>
          )}
        </form>
      </section>
    </main>
  );
};
