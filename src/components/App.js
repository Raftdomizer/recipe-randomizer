// Libraries
import React, { useState } from "react";
import FileSaver from "file-saver";

// Applicaiton components
import VanillaCraftingMenu from "../data/VanillaCraftingMenu.json";
import EmptyCraftingMenu from "../data/EmptyCraftingMenu.json";
import GeneratePreview from "../utils/GeneratePreview";
import Preview from "./Preview";

function App() {
    // Styles
    // TODO: Figure out a way to make styles play nicely with GitHub pages
    const HeaderStyle = {textAlign: "center"};
    const ButtonStyle = {marginBottom: "25px"};
    const ContainerStyle = {display: "flex", justifyContent: "center"};
    const DivLeftRight =  {width: "50%", justifyContent: "center"};

    const parsedVanilla = JSON.parse(JSON.stringify(VanillaCraftingMenu, null, 2));
    let emptyCraftingMenu = JSON.parse(JSON.stringify(EmptyCraftingMenu, null, 2));

    const [craftingMenuPreview, setCraftingMenuPreview] = useState(JSON.stringify(parsedVanilla, null, 2));
    const [radioOption, setRadioOption] = useState("option0");

    const saveJsonFile = async () => {
        const blob = new Blob(
            [craftingMenuPreview],
            { type: "text/plain;charset=utf-8" });

        FileSaver.saveAs(blob, "RecipeOverride.json");
    };

    // TODO: Move this whole function(s) into its own container component
    const previewContent = () => {
        if (radioOption === "option0") {
            setCraftingMenuPreview(JSON.stringify(VanillaCraftingMenu, null, 2));
        } else{
            const parsedJson = parsedVanilla

            emptyCraftingMenu = GeneratePreview(parsedJson, radioOption);
            setCraftingMenuPreview(JSON.stringify(emptyCraftingMenu, null, 2));
        }
    }

    const handleOptionChange = (e) => {
        setRadioOption(e.target.value);
    }

    return (
        <div>
            <h1 style={HeaderStyle}>
                Raftdomizer: Recipe Randomizer (WIP)
            </h1>
            <div style={ContainerStyle}>
                <div style={DivLeftRight}>
                <h2>Options</h2>
                    <div>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    value="option0"
                                    name="randomizerOption"
                                    checked={radioOption === "option0"}
                                    onChange = {(e) => handleOptionChange(e)}
                                />Vanilla
                            </label>
                        </div>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    value="option1"
                                    name="randomizerOption"
                                    checked={radioOption === "option1"}
                                    onChange = {(e) => handleOptionChange(e)}
                                />Shuffle ingredients and cost
                            </label>
                        </div>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    value="option2"
                                    name="randomizerOption"
                                    checked={radioOption === "option2"}
                                    onChange = {(e) => handleOptionChange(e)}
                                />Same ingredients and shuffle cost
                            </label>
                        </div>
                    </div>
                    <br />
                    <button style={ButtonStyle}
                        onClick={() => previewContent()}>Generate Preview</button>
                    <br />
                    <button onClick={() => saveJsonFile()}>Save Override</button>
                </div>
                <div sstyle={DivLeftRight}>
                    <Preview craftingMenuPreview={craftingMenuPreview}/>
                </div>
            </div>
        </div>
    );
}

export default App;