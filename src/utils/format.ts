// Luhn Algorithm for checking credit card number

export function luhnCheck(inputData: string) {
    // remove all non digit characters
    var value = inputData.replace(/\D/g, '');
    var sum = 0;
    var shouldDouble = false;
    // loop through values starting at the rightmost side
    for (var i = value.length - 1; i >= 0; i--) {
        var digit = parseInt(value.charAt(i));

        if (shouldDouble) {
            if ((digit *= 2) > 9) digit -= 9;
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }
    return (sum % 10) === 0;
}



/**
 * The function to format Full Name from first name and last name
 */
export const formatName = (firstName: string, lastName: string) => {
    if (firstName?.length < 1 && lastName?.length < 1) {
        return "YOUR NAME"
    }else { 
        return (firstName + " " + lastName)
    }
    
}

/**
 * The function to format Card Number to "XXX XXX" type
 */
export const makeFormText = (cardNum:string, formText: string) => {
    const result = cardNum + formText.slice(cardNum.length, formText.length)
    return result;
}