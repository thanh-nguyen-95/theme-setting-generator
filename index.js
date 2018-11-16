import defaultSetting from "./settings";

// Init editors
const editorConfig = {
  mode: "ace/mode/json",
  selectionStyle: "text",
  showPrintMargin: false,
  theme: "ace/theme/monokai"
};
// Config editors
const input = ace.edit("input", editorConfig);
const output = ace.edit("output", { ...editorConfig, readOnly: true });

// Init value for input
input.setValue(defaultSetting);
// Add event to Generate button
document.querySelector("button").addEventListener("click", e => {
  const result = JSON.stringify(flat(input.getValue()), null, "  ");
  output.setValue(result);
});

function flat(json) {
  try {
    // parse json to object
    const input = JSON.parse(json);

    // init result
    const result = {};
    Object.keys(input).forEach(key => {
      generateThemeJSON(`${key}`, input[key], result);
    });

    return result;
  } catch (error) {
    return {
      error: error.message
    };
  }
}

function generateThemeJSON(key, value, output) {
  if (
    typeof value === "string" ||
    typeof value === "boolean" ||
    typeof value === "number"
  ) {
    output[key] = value;
  } else if (typeof value === "object") {
    Object.keys(value).forEach(subKey => {
      generateThemeJSON(`${key}__${subKey}`, value[subKey], output);
    });
  }
}
