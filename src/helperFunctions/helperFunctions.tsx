export const firstLetterUppercase = (string :string) :string => {
    const split :Array<string> = string.split("-");
    let newString :string = "";
    split.forEach((subString :string, i :number) => {
        const divider :string = newString === "" ? "" : "-"
        newString = newString + divider + subString.charAt(0).toUpperCase() + subString.slice(1).toLowerCase()
    })
    return newString;
}
