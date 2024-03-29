import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAppContainerStyle } from "styles/app";
import { getSystemButtonStyle, getContentBoxStyle } from "styles/settings";
import Checkbox from "components/Checkbox";
import TimeOptionSelect from "components/TimeOptionSelect";
import { convertTextToTitleCase } from "utility/parseText";
import { postOptions } from "data/queries";
import GraphDisplaySelect from "components/GraphDisplaySelect";
import { defaultOptions } from "data/defaultState";
import ColorSelect from "components/ColorSelect";

const DisplaySettings = (props) => {
  const { options, setOptions } = props;
  const navigate = useNavigate();
  const accountButtonStyle = getSystemButtonStyle(false);
  const [tempOptions, setTempOptions] = useState(options);
    
  const gridStyle = {
    display: "grid",
    gridTemplateColumns: "auto auto",
    gridTemplateRows: "repeat(5, 1fr)",
    gridColumnGap: "2rem",
    gridRowGap: "0px",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
  };

  const getBooleanObjParams = (objToCheck) => {
    const booleanObjParams = [];
    const iteration = (obj, layer = []) => {
      Object.keys(obj)
        .sort()
        .forEach((key) => {
          if (typeof obj[key] === "object")
            iteration(obj[key], [...layer, key]);
          else if (typeof obj[key] === "boolean")
            booleanObjParams.push({ value: obj[key], key: [...layer, key] });
        });
    };
    iteration(objToCheck);
    return booleanObjParams;
  };

  const generateInverseNestedObject = (obj, route, iter = 0) => {
    const spread = iter === 0 ? obj : obj[route.key[iter - 1]];
    if (iter !== route.key.length)
      return {
        ...spread,
        [route.key[iter]]: generateInverseNestedObject(spread, route, ++iter),
      };
    else return !route.value;
  };

  const genCheckboxesWithLabelsArray = () => {
    return getBooleanObjParams(tempOptions).map((el, i) => {
      return [
        <div key={`title${i}`}>
          {convertTextToTitleCase(el.key.join(" "))}:
        </div>,
        <Checkbox
          key={`check${i}`}
          style={{ borderRadius: "100%", margin: "1rem" }}
          default={el.value}
          options={tempOptions}
          onChange={() => {
              const temp = generateInverseNestedObject(tempOptions, el);
              setTempOptions(temp);
            }
          }
        />,
      ];
    });
  };

  return (
    <div
      className="display-settings screen-container"
      style={getAppContainerStyle(tempOptions.darkTheme)}
    >
      <div
        className="content-box"
        style={getContentBoxStyle(tempOptions.darkTheme)}
      >
        <h2 className="header">Display Settings</h2>
        <div className={"display-settings-grid"}>
          <div className="button-column">
            <div style={gridStyle}>{genCheckboxesWithLabelsArray()}</div>
          </div>
          <div className="button-column">
            <TimeOptionSelect
              options={tempOptions}
              setOptions={setTempOptions}
            />
            <GraphDisplaySelect
              options={tempOptions}
              setOptions={setTempOptions}
            />
          </div>
        </div>
        <div>
          <ColorSelect {...{ tempOptions, setTempOptions }} />
        </div>
        <div className="footer">
          <button
            style={accountButtonStyle}
            onClick={() => navigate("/settings")}
          >
            {"Cancel"}
          </button>
          <button
            style={accountButtonStyle}
            onClick={() => {
              if (
                window.confirm(
                  "Are you sure you want to reset settings to default?"
                )
              ) {
                setOptions(defaultOptions);
                postOptions(defaultOptions);
                navigate("/");
              }
            }}
          >
            Reset To Default
          </button>
          <button
            style={accountButtonStyle}
            onClick={() => {
              setOptions(tempOptions);
              postOptions(tempOptions);
              navigate("/");
            }}
          >
            {"Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DisplaySettings;
