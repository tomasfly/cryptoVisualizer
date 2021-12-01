import Volume from "../../../src/operations/volume";

let volume

beforeAll(() => {
    volume = new Volume()
});

test('getAverageOfVolume ', () => {
    let volumeList = [5, 3, 5]
    expect(volume.getAverageOfVolume(volumeList)).toBe(4.333333333333333)
});

test('getVolumeIncrementPercentage', () => {
    let volumeList = [5, 3, 5]
    expect(volume.getVolumeIncrementPercentage(volumeList, 30)).toBe(592.3076923076924);
});

test('getVolumeIncrementPercentage false case', () => {
    let volumeList = [5, 3, 5]
    expect(volume.getVolumeIncrementPercentage(volumeList, 1)).toBe(undefined);
});

test('triggerVolumeAlert false case', () => {
    expect(volume.triggerVolumeAlert(120,592.3076923076924)).toBe(false);
});

test('triggerVolumeAlert true case', () => {
    expect(volume.triggerVolumeAlert(690,592.3076923076924)).toBe(true);
});