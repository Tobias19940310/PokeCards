import {firstLetterUppercase} from "../helperFunctions/helperFunctions";

test("firstLetterUppercase", () => {
    expect(firstLetterUppercase("bulbasaur")).toBe("Bulbasaur");
    expect(firstLetterUppercase("special-attack")).toBe("Special-Attack");
    expect(firstLetterUppercase("urshifu-single-strike")).toBe("Urshifu-Single-Strike");
    expect(firstLetterUppercase("toxtricity-low-key-gmax")).toBe("Toxtricity-Low-Key-Gmax");
    expect(firstLetterUppercase("tHiS-iS-a-DiFfIcUlT-tEsT")).toBe("This-Is-A-Difficult-Test");
    expect(firstLetterUppercase("123-456-789")).toBe("123-456-789");
})