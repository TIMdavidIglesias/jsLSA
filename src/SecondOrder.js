/**
 * Class representing a second-order nonlinear mathematical system.
 *
 * @class
 */
class SecondOrder {
  /**
   * Constructor for the SecondOrder class.
   *
   * @constructor
   * @param {number} Wn - Natural frequency of the system.
   * @param {number} Zeta - Damping coefficient (Zeta).
   * @param {number} K - Gain or amplification of the system.
   */
  constructor(Wn, Zeta, K) {
    this.Wn = Wn;
    this.Zeta = Zeta;
    this.K = K;
    this.damping = Math.sqrt(1 - this.Zeta ** 2);
    this.At = 1 / 1000;
  }

  /**
   * Calculates the step response of a second-order system to a Dirac step input.
   *
   * @param {number} u - Dirac step input.
   * @param {number} t - Time variable.
   * @returns {number} - Step response of the second-order system.
   */
  secondOrderStepResponse = (u, t) => {
    const so_step_response =
      this.K *
      (u -
        u *
          (Math.exp(-this.Zeta * this.Wn * t) *
            (Math.cos(this.Wn * this.damping * t) +
              (this.Zeta / this.damping) *
                Math.sin(this.Wn * this.damping * t))));
    return so_step_response;
  };
}

module.exports = SecondOrder;