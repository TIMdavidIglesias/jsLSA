/**
 * Static Convolution Integrator.
 *
 * This function represents the signal integrator by applying the convolution of unit signals.
 * It calculates the output using the strategy of summing the underlying responses to a Dirac
 * step input.
 *
 * @param {Array} inputs - The input signal data to be integrated.
 * @param {object} transferFunction - The transfer function parameters.
 * @param {number} At - Difference between the values of At1 and At0.
 * @returns {Array} - The integrated output signal.
 */
const staticConvolutionIntegrator = (inputs, transferFunction, At) => {
  const nIterations = inputs.length;

  let Y = [];
  let yTemp = [];

  let u = 0;
  let u0 = 0;
  let u1 = 0;

  for (let r = 0; r < nIterations; r++) {
    u1 = inputs[r];
    u = u1;

    if (r > 0) {
      u0 = inputs[r - 1];
      if (u1 !== u0) {
        u = u1 - u0;
      } else {
        u = 0;
      }
    }

    for (let c = 0; c < nIterations; c++) {
      if (c > r) {
        const t = (c - r) * At;
        yTemp.push(transferFunction.secondOrderStepResponse(u, t));
      } else {
        yTemp.push(0);
      }
    }

    Y.push(yTemp);
    yTemp = [];
  }

  return _columnOutputReader(Y, nIterations);
};

/**
 * Column Output Reader.
 *
 * Reduces the nxn upper triangular matrix to a vector of length nx1,
 * containing each point of the curve that forms the response signal.
 *
 * @param {number} y0 - Initial value.
 * @param {number} nIterations - Number of iterations.
 * @returns {Array} - Vector containing the points of the response signal.
 */
const _columnOutputReader = (sqMatrixResponse, nIterations) => {
  const y = [];
  let col_sum = 0;

  for (let i = 0; i < nIterations; i++) {
    for (let j = 0; j < nIterations; j++) {
      col_sum += sqMatrixResponse[j][i];
    }
    Number.isNaN(col_sum) && console.log(sqMatrixResponse[i]);
    y.push(col_sum);
    col_sum = 0;
  }

  return y;
};

module.exports = staticConvolutionIntegrator;