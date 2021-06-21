export const firstLetterUppercase = (string :string) :string => {
    //Wenn - vorhanden, in Array aufteilen
    const split :Array<string> = string.split("-");
    let newString :string = "";
    split.forEach((subString :string, i :number) => {
        //Wenn erster Durchgang -> kein Divider, danach -
        const divider :string = newString === "" ? "" : "-";
        //Anstöpseln an vorherigen Durchgang + Divider + neuer String mit großem ersten Buchstaben
        newString = newString + divider + subString.charAt(0).toUpperCase() + subString.slice(1).toLowerCase()
    })
    return newString;
}
