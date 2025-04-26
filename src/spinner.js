// src/spinner.js

import { DEFAULT_PRECISION } from "./constants.js";

/**
 * DigitSpinner provides a custom numeric input UI component for precise value entry.
 * It displays the value as styled digits and allows increment/decrement via buttons or keyboard.
 * Used for entering measurement values in the pipette calibration workflow.
 *
 * @class
 * @param {HTMLElement} containerElement - The DOM element to render the spinner into.
 * @param {Object} [options] - Configuration options for the spinner.
 * @param {number} [options.initialValue=0] - Initial value to display.
 * @param {number} [options.step=0.1] - Step size for increment/decrement.
 * @param {number} [options.min=0] - Minimum allowed value.
 * @param {number} [options.max=10000] - Maximum allowed value.
 * @param {number} [options.precision=DEFAULT_PRECISION] - Number of decimal places to display.
 */
export class DigitSpinner {
  constructor(containerElement, options = {}) {
    this.container = containerElement;
    this.options = {
      initialValue: 0,
      step: 0.1,
      min: 0,
      max: 10000,
      precision: DEFAULT_PRECISION,
      ...options,
    };
    this._value = this._parseValue(this.options.initialValue);
    this._precision = this._getPrecision();
    this._createElements();
    this._addEventListeners();
    this.render();
    this.container.spinnerInstance = this;
  }
  /**
   * Determines the number of decimal places to use for the spinner value,
   * based on the step size or the provided precision option.
   *
   * @returns {number} The number of decimal places for value formatting.
   */
  _getPrecision() {
    const stepString = String(this.options.step);
    if (stepString.includes(".")) {
      return stepString.split(".")[1].length;
    }
    return this.options.precision;
  }
  /**
   * Parses and clamps the given value to the spinner's min and max,
   * and rounds it to the configured precision.
   *
   * @param {number|string} value - The value to parse and clamp.
   * @returns {number} The parsed, clamped, and rounded value.
   */
  _parseValue(value) {
    let num = parseFloat(value);
    if (isNaN(num)) num = this.options.min;
    num = Math.max(this.options.min, num);
    num = Math.min(this.options.max, num);
    const factor = Math.pow(10, this._precision || DEFAULT_PRECISION);
    return Math.round(num * factor) / factor;
  }
  /**
   * Creates and appends the DOM elements for the digit spinner UI,
   * including the display for digits and the increment/decrement buttons.
   * Sets up the container structure and accessibility attributes.
   *
   * @private
   */
  _createElements() {
    this.container.innerHTML = "";
    this.container.classList.add("digit-spinner");
    this.container.setAttribute("tabindex", "0");
    this.digitsDisplay = document.createElement("div");
    this.digitsDisplay.className = "spinner-digits";
    this.container.appendChild(this.digitsDisplay);
    const controlsDiv = document.createElement("div");
    controlsDiv.className = "spinner-controls";
    this.downButton = document.createElement("button");
    this.downButton.type = "button";
    this.downButton.className = "spinner-btn spinner-down";
    this.downButton.textContent = "-";
    this.downButton.setAttribute("aria-label", "Decrease value");
    controlsDiv.appendChild(this.downButton);
    this.upButton = document.createElement("button");
    this.upButton.type = "button";
    this.upButton.className = "spinner-btn spinner-up";
    this.upButton.textContent = "+";
    this.upButton.setAttribute("aria-label", "Increase value");
    controlsDiv.appendChild(this.upButton);
    this.container.appendChild(controlsDiv);
  }
  /**
   * Attaches event listeners to the spinner's increment and decrement buttons,
   * as well as keyboard handlers for arrow key navigation.
   * Handles user interactions for changing the spinner value.
   *
   * @private
   */
  _addEventListeners() {
    this.upButton.addEventListener("click", () => this.stepUp());
    this.downButton.addEventListener("click", () => this.stepDown());
    this.container.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          this.stepUp();
          break;
        case "ArrowDown":
          e.preventDefault();
          this.stepDown();
          break;
      }
    });
  }
  /**
   * Renders the current spinner value as styled digit elements in the UI.
   * Splits the value into integer and fractional parts, displays each digit,
   * and updates the container's data-value attribute.
   */
  render() {
    const valueString = this._value.toFixed(this._precision);
    this.digitsDisplay.innerHTML = "";
    const [integerPart, fractionalPart] = valueString.split(".");
    integerPart.split("").forEach((digitChar) => {
      const digitSpan = document.createElement("span");
      digitSpan.className = "digit";
      digitSpan.textContent = digitChar;
      this.digitsDisplay.appendChild(digitSpan);
    });
    if (this._precision > 0) {
      const decimalPointSpan = document.createElement("span");
      decimalPointSpan.className = "decimal-point";
      decimalPointSpan.textContent = ".";
      this.digitsDisplay.appendChild(decimalPointSpan);
      (fractionalPart || "")
        .padEnd(this._precision, "0")
        .split("")
        .forEach((digitChar) => {
          const digitSpan = document.createElement("span");
          digitSpan.className = "digit";
          digitSpan.textContent = digitChar;
          this.digitsDisplay.appendChild(digitSpan);
        });
    }
    this.container.dataset.value = this._value;
  }
  stepUp() {
    this.setValue(this._value + this.options.step);
  }
  stepDown() {
    this.setValue(this._value - this.options.step);
  }
  setValue(newValue) {
    const parsedValue = this._parseValue(newValue);
    if (parsedValue !== this._value) {
      this._value = parsedValue;
      this.render();
    }
  }
  getValue() {
    return this._value;
  }
}
