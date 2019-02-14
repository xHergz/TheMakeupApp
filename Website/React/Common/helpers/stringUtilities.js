
/*
* FILE          : stringUtilities.js
* PROJECT       : PROG3080 - Assignment 4
* PROGRAMMER    : Justin Hergott
* FIRST VERSION : 2018-11-16
* DESCRIPTION   : This file contains methods to validate strings.
*/

//
// FUNCTION		: isNullOrWhiteSpace
// DESCRIPTION	:
//		This function checks if a string is null, undefined, or whitespace.
// PARAMETERS	:
//		String value : the string to check
// RETURNS		:
//		bool    : returns true if the string is null, undefined, or whitespace, false if not
//
export default function isNullOrWhiteSpace(value) {
    if (value === '' || value === null || value === undefined) {
        return true;
    }
    return false;
}

export function searchMatch(value, searchValue) {
    return String(value).toLowerCase().startsWith(searchValue.toLowerCase());
}