import {MiniMaple} from "../src/miniMaple";

test('it fails', () => {
    const maple = new MiniMaple('x+x');
    expect(maple.func == 'x+x').toBeTruthy();
});