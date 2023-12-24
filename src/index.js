const realTimeConvolutionIntegrator = require("./RealTimeConvolution");
const SecondOrder = require("./SecondOrder");
const staticConvolutionIntegrator = require("./StaticConvolution");

/**
 * Class jsLSA: Algorithm for integrating a signal in a second-order nonlinear system.
 *
 * The algorithm uses the convolution theorem and considers the input signal as
 * a sum of delayed signals Δt, where Δt = Δt1 - Δt0. It calculates the sum
 * of multiple step responses to Dirac and obtains the result of each differential
 * response as a new signal. This result represents the output of the system simulation.
 *
 * @param {number} Wn - Natural frequency of the system.
 * @param {number} Zeta - Damping coefficient (Zeta).
 * @param {number} K - Gain or amplification of the system.
 * @param {number} At - Differential time between the values of At1 and At0.
 */
class jsLSA {
  constructor(Wn, Zeta, K, At, maxRealTimeSamples = 2000) {
    /*
     * Parameters:
     *   - K: System gain
     *   - ωₙ: Undamped natural frequency
     *   - ζ: Damping ratio
     */

    // ωₙ: Undamped natural frequency
    this.Wn = Wn;

    // ζ: Damping ratio
    this.Zeta = Zeta;

    // K: System gain
    this.K = K;

    // At: Integrator differential time step
    this.At = At;

    /*
     * Second-Order System Transfer Function:
     *
     * ==========================
     *                Kωₙ²
     *   H(s) = ----------------
     *          s² + 2ζωs + ωₙ²
     * ==========================
     *
     */
    this.transferFunction = new SecondOrder(Wn, Zeta, K);

    /*
     * Damping Ratio (ζ):
     *   damping = sqrt(1 - ζ^2)
     *
     * where damping is the damping factor.
     */
    this.damping = this.transferFunction.damping;

    /*
     * Input data for the main analysis. A float array is expected, filled up
     * with the value of the curve at each time differential.
     */
    this.inputAnalys = [];

    /*
     * Output data for the main analysis. A float array is expected, filled up
     * with the value of the response at each time differential.
     */
    this.outputAnalys = [];

    this.maxRealTimeSamples = maxRealTimeSamples;
  }

  /*
   * Function that returns the parameters that compose the transfer function.
   */
  getTransferFunctionCoeffs() {
    return {
      Wn: this.Wn,
      Zeta: this.Zeta,
      K: this.K,
    };
  }

  /*
   * Function that allows modifying any parameter of the transfer function.
   *
   * @param {string} propName - The name of the parameter to be modified.
   * @param {number} value - The new value for the specified parameter.
   *
   *  Transfer Function propName:
   *   - K: System gain
   *   - Wn: Undamped natural frequency
   *   - Zeta: Damping ratio
   *
   */
  setTransferFunctionData(propName, value) {
    this[propName] = value;
    this.transferFunction[propName] = value;
  }

  /**
   * Retrieves the analysis output.
   *
   * @returns {any} The output of the analysis.
   */
  getAnalysisOutput() {
    return this.outputAnalys;
  }

  /**
   * Retrieves the analysis input.
   *
   * @returns {any} The output of the analysis.
   */
  getAnalysisInput() {
    return this.inputAnalys;
  }

  /**
   * Simulates the input signal in a static environment.
   *
   * @param {Array} input - The input signal data to be simulated.
   * @returns {Array} The simulated output signal.
   */
  simpleLinearSimulation(input) {
    this.inputAnalys = input;
    this.outputAnalys = staticConvolutionIntegrator(
      input,
      this.transferFunction,
      this.At
    );

    return this.outputAnalys;
  }

  /**
   * Simulates the input signal in a real-time environment.
   *
   * @param {float} input - The input signal data to be simulated.
   * @returns {Array} The simulated output signal.
   */
  realTimeLinearSimulation(input) {
    if (this.inputAnalys.length > this.maxRealTimeSamples - 1) {
      this.inputAnalys.shift();
      this.outputAnalys.shift();
    }

    this.inputAnalys.push(input);
    const outputRTData = realTimeConvolutionIntegrator(
      this.inputAnalys,
      this.transferFunction,
      this.At
    );

    this.outputAnalys.push(outputRTData);
    return this.outputAnalys;
  }
}

module.exports = jsLSA;
