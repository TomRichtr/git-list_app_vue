import moment from "moment";

export function convertDate(date) {
  return moment(date).format("Do MMM YYYY, h:mm");
}

export function convertDateRelative(date) {
  return moment(date).fromNow();
}

export function convertString(string) {
  return string === null
    ? ""
    : string.charAt(0).toUpperCase() + string.slice(1);
}

export function slashCheck(language) {
  return language === null ? "" : "/";
}

export function convertStringTitle(string) {
  const stringAdjusted =
    string === null ? "" : string.charAt(0).toUpperCase() + string.slice(1);
  return stringAdjusted.length > 25
    ? stringAdjusted.slice(0, 25) + "..."
    : stringAdjusted;
}

export function convertStringDescription(string) {
  const adjustedString =
    string === null
      ? ""
      : string.charAt(0).toUpperCase() +
        string.slice(1) +
        (string.slice(-1) === "." ? "" : ".");
  return adjustedString.length > 40
    ? adjustedString.slice(0, 40) + "..."
    : adjustedString;
}

export function checkEven(i) {
  return i % 2 === 0 ? "even-wrapper" : "odd-wrapper";
}

export function convertProctectionStatus(protection) {
  return !protection ? "Not protected" : "Protected";
}
