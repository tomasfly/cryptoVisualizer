import SMACalculations from "../../../src/operations/SMACalculations";

let calculations

beforeAll(() => {
    calculations = new SMACalculations()
});

test('calculateDifferenceBetweenAverages', () => {
    let res = calculations.calculateDifferenceBetweenAverages(54001,54000)
    expect(res).toBe(0.001851851851851852)
});