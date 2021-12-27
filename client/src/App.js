import React, { useState, useEffect } from "react";
import ResizablePanels from "resizable-panels-react";

import "./styles.css";

export default function App() {
  const [windowContent1, setWindowContent1] = useState("");
  const [windowContent2, setWindowContent2] = useState("");
  const [windowContent3, setWindowContent3] = useState("");

  const [windowOneAddClicked, setWindowOneAddClicked] = useState(false);
  const [windowTwoAddClicked, setWindowTwoAddClicked] = useState(false);
  const [windowThreeAddClicked, setWindowThreeAddClicked] = useState(false);

  const [windowOneUpdateClicked, setWindowOneUpdateClicked] = useState(false);
  const [windowTwoUpdateClicked, setWindowTwoUpdateClicked] = useState(false);
  const [windowThreeUpdateClicked, setWindowThreeUpdateClicked] =
    useState(false);

  const [allTextList, setAllTextList] = useState([]);
  const [textList1, setTextList1] = useState([]);
  const [textList2, setTextList2] = useState([]);
  const [textList3, setTextList3] = useState([]);

  const [textIndex, setTextIndex] = useState(-1);
  const [textDetails, setTextDetails] = useState({});
  const [totCount, setTotCount] = useState([]);

  const [textClicked1, setTextClicked1] = useState(false);
  const [textClicked2, setTextClicked2] = useState(false);
  const [textClicked3, setTextClicked3] = useState(false);

  useEffect(() => {
    fetch("/text")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setAllTextList(data);
      });
      fetch("/count")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setTotCount(data);
      });
  }, []);

  useEffect(() => {
    function add(url, method, body) {
      fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          fetch("/text")
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              setAllTextList(data);
              fetch("/count")
                .then((response) => response.json())
                .then((data) => {
                  console.log(data);
                  setTotCount(data);
                })
                .catch((error) => {
                  console.error("Errorcount:", error);
                });
            })
            .catch((error) => {
              console.error("Errortext:", error);
            });
        })
        .catch((error) => {
          console.error("Erroradd:", error);
        });
    }

    if (windowOneAddClicked) {
      setWindowOneAddClicked(false);
    } else if (windowTwoAddClicked) {
      setWindowTwoAddClicked(false);
    } else if (windowThreeAddClicked) {
      setWindowThreeAddClicked(false);
    }
    if (windowOneAddClicked || windowTwoAddClicked || windowThreeAddClicked)
      add("/text/add", "POST", JSON.stringify(textDetails));
  }, [windowOneAddClicked, windowTwoAddClicked, windowThreeAddClicked]);

  useEffect(() => {
    function update(url, method, body) {
      fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          fetch("/text")
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              setAllTextList(data);
              fetch("/count")
                .then((response) => response.json())
                .then((data) => {
                  console.log(data);
                  setTotCount(data);
                })
                .catch((error) => {
                  console.error("Errorcount:", error);
                });
            })
            .catch((error) => {
              console.error("Errortext:", error);
            });
        })
        .catch((error) => {
          console.error("Errorupdate:", error);
        });
    }

    if (windowOneUpdateClicked) {
      setWindowOneUpdateClicked(false);
    } else if (windowTwoUpdateClicked) {
      setWindowTwoUpdateClicked(false);
    } else if (windowThreeUpdateClicked) {
      setWindowThreeUpdateClicked(false);
    }
    if (
      windowOneUpdateClicked ||
      windowTwoUpdateClicked ||
      windowThreeUpdateClicked
    )
      update("/text/update", "PATCH", JSON.stringify(textDetails));
  }, [
    windowOneUpdateClicked,
    windowTwoUpdateClicked,
    windowThreeUpdateClicked,
  ]);

  const handleAddOne = () => {
    if (windowContent1 === "") return;
    setWindowOneAddClicked(true);
    const windowOneTextDetails = {
      text: windowContent1,
      textId: allTextList.length,
      windowName: "1",
    };
    console.log("Add: ", allTextList.length);
    setTextIndex(allTextList.length);
    setTextDetails(windowOneTextDetails);
    setWindowContent1("");
    setTextClicked1(false);

    textList1.push(windowContent1);
    console.log(windowContent1, textList1);
    setTextList1(textList1);
  };

  const handleAddTwo = () => {
    if (windowContent2 === "") return;
    setWindowTwoAddClicked(true);
    const windowTwoTextDetails = {
      text: windowContent2,
      textId: allTextList.length,
      windowName: "2",
    };
    setTextIndex(allTextList.length);
    setTextDetails(windowTwoTextDetails);
    setWindowContent2("");
    setTextClicked2(false);

    textList2.push(windowContent2);
    setTextList2(textList2);
  };

  const handleAddThree = () => {
    if (windowContent3 === "") return;
    setWindowThreeAddClicked(true);
    const windowThreeTextDetails = {
      text: windowContent3,
      textId: allTextList.length,
      windowName: "3",
    };
    setTextIndex(allTextList.length);

    setTextDetails(windowThreeTextDetails);
    setWindowContent3("");
    setTextClicked3(false);

    textList3.push(windowContent3);
    setTextList3(textList3);
  };

  const handleUpdateOne = () => {
    setWindowOneUpdateClicked(true);
    const textList1Clone = [...textList1];
    console.log(textIndex);
    const updateDetailsWindow1 = {
      text: windowContent1,
      textId: textIndex,
      windowName: "1",
    };
    setTextDetails(updateDetailsWindow1);

    textList1Clone[textIndex] = updateDetailsWindow1;
    setTextList1(textList1Clone);
  };

  const handleUpdateTwo = () => {
    setWindowTwoUpdateClicked(true);
    const textList2Clone = [...textList2];
    const updateDetailsWindow2 = {
      text: windowContent2,
      textId: textIndex,
      windowName: "2",
    };
    setTextDetails(updateDetailsWindow2);

    textList2Clone[textIndex] = updateDetailsWindow2;
    setTextList2(textList2Clone);
  };

  const handleUpdateThree = () => {
    setWindowThreeUpdateClicked(true);
    const textList3Clone = [...textList3];
    const updateDetailsWindow3 = {
      text: windowContent3,
      textId: textIndex,
      windowName: "3",
    };
    setTextDetails(updateDetailsWindow3);
    textList3Clone[textIndex] = windowContent3;
    setTextList3(textList3Clone);
  };

  return (
    <div className="App">
      <ResizablePanels
        bkcolor="orange"
        displayDirection="column"
        width="100%"
        height="100vh"
        panelsSize={[52, 48]}
        sizeUnitMeasure="%"
        resizerColor="#353b48"
        resizerSize="10px"
      >
        <div>
          <ResizablePanels
            bkcolor="#33FF68"
            displayDirection="row"
            width="100%"
            height="100vh"
            panelsSize={[30, 70]}
            sizeUnitMeasure="%"
            resizerColor="#353b48"
            resizerSize="10px"
          >
            <div>
            <h5 className="padding info-style">Window 1</h5>
              <table align="center">
                {allTextList.map((row, i) => {
                  return (
                    <>
                      <div
                        onClick={() => {
                          setWindowContent1(row.text);
                          setTextIndex(i);
                          setTextClicked1(true);
                        }}
                      >
                        {row.windowName === "1" && (
                          <div className="list">
                            <tr>{row.text}</tr>
                          </div>
                        )}
                      </div>
                    </>
                  );
                })}
              </table>
              <div className="block">
                <input
                  type="text"
                  className="input-res"
                  placeholder="Enter Text"
                  onChange={(e) => {
                    setWindowContent1(e.target.value);
                  }}
                  value={windowContent1}
                />
              </div>
              <button
                type="button"
                className="btn btn-primary gap"
                onClick={handleAddOne}
              >
                {"Add"}
              </button>
              <button
                type="button"
                className="btn btn-primary gap"
                onClick={handleUpdateOne}
                disabled={!textClicked1}
              >
                Update
              </button>
              <div className="padding">
                <h6 className="info-style">
                  Add Count:{" "}
                  {totCount.length > 0
                    ? totCount.find((obj) => obj["windowName"] === "1") !==
                      undefined
                      ? totCount.find((obj) => obj["windowName"] === "1")[
                          "addCount"
                        ]
                      : 0
                    : 0}
                </h6>
                <h6 className="info-style"> 
                  Update Count:{" "}
                  {totCount.length > 0
                    ? totCount.find((obj) => obj["windowName"] === "1") !==
                      undefined
                      ? totCount.find((obj) => obj["windowName"] === "1")[
                          "updateCount"
                        ]
                      : 0
                    : 0}
                </h6>
              </div>
            </div>

            <div
              style={{
                backgroundColor: "#33E0FF",
                height: "inherit",
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "column",
              }}
            >
              <h5 className="padding info-style">Window 2</h5>
              <table align="center">
                {allTextList.map((row, i) => {
                  return (
                    <>
                      <div
                        onClick={() => {
                          setWindowContent2(row.text);
                          setTextIndex(i);
                          setTextClicked2(true);
                        }}
                      >
                        {row.windowName === "2" && (
                          <div className="list">
                            <tr>{row.text}</tr>
                          </div>
                        )}{" "}
                      </div>
                    </>
                  );
                })}
              </table>
              <div className="block win-two-width">
                <input
                  type="text"
                  className="input-res"
                  value={windowContent2}
                  placeholder="Enter Text"
                  onChange={(e) => {
                    setWindowContent2(e.target.value);
                  }}
                />
              </div>
              <div className="window-two-btn gap">
                <button
                  type="button"
                  className="btn btn-primary gap"
                  onClick={handleAddTwo}
                >
                  {"Add"}
                </button>
                <button
                  type="button"
                  className="btn btn-primary gap"
                  onClick={handleUpdateTwo}
                  disabled={!textClicked2}
                >
                  Update
                </button>
              </div>
              <div className="padding">
                <h6 className="info-style">
                  Add Count:{" "}
                  {totCount.length > 0
                    ? totCount.find((obj) => obj["windowName"] === "2") !==
                      undefined
                      ? totCount.find((obj) => obj["windowName"] === "2")[
                          "addCount"
                        ]
                      : 0
                    : 0}
                </h6>
                <h6 className="info-style">
                  {" "}
                  Update Count:{" "}
                  {totCount.length > 0
                    ? totCount.find((obj) => obj["windowName"] === "2") !==
                      undefined
                      ? totCount.find((obj) => obj["windowName"] === "2")[
                          "updateCount"
                        ]
                      : 0
                    : 0}
                </h6>
              </div>
            </div>
          </ResizablePanels>
        </div>
        <div>
        <h5 className="padding info-style">Window 3</h5>
          <table align="center">
            {allTextList.map((row, i) => {
              return (
                <>
                  <div
                    onClick={() => {
                      setWindowContent3(row.text);
                      setTextIndex(i);
                      setTextClicked3(true);
                    }}
                  >
                    {row.windowName === "3" && (
                      <div className="list">
                        <tr>{row.text}</tr>
                      </div>
                    )}{" "}
                  </div>
                </>
              );
            })}
          </table>
          <div className="block">
            <input
              type="text"
              className="input-res"
              value={windowContent3}
              placeholder="Enter Text"
              onChange={(e) => {
                setWindowContent3(e.target.value);
              }}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary gap"
            onClick={handleAddThree}
          >
            {"Add"}
          </button>
          <button
            type="button"
            className="btn btn-primary gap"
            onClick={handleUpdateThree}
            disabled={!textClicked3}
          >
            Update
          </button>
          <div className="padding">
            <h6 className="info-style">
              Add Count:{" "}
              {totCount.length > 0
                ? totCount.find((obj) => obj["windowName"] === "3") !==
                  undefined
                  ? totCount.find((obj) => obj["windowName"] === "3")[
                      "addCount"
                    ]
                  : 0
                : 0}
            </h6>
            <h6 className="info-style">
              {" "}
              Update Count:{" "}
              {totCount.length > 0
                ? totCount.find((obj) => obj["windowName"] === "3") !==
                  undefined
                  ? totCount.find((obj) => obj["windowName"] === "3")[
                      "updateCount"
                    ]
                  : 0
                : 0}
            </h6>
          </div>
        </div>
      </ResizablePanels>
    </div>
  );
}

