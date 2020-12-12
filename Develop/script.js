// Akram Sabbah

/************************** GLOBALS **************************/

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");


/************************* FUNCTIONS *************************/

// Write password to the #password input
function writePassword() {
    var password = generatePassword();
    var passwordText = document.querySelector("#password");

    passwordText.value = password;

}

/* Ask user for password length and desired character types via the Prompt() functions,
   then use generate() to return a randomized password meeting the criteria. */
var generatePassword = function() {
    // grab desired password length
    var passLength = lengthPrompt();

    // grab all the desired character types to use in password
    var desiredChars = setCharacterChoices();
    // TODO: maybe make this an object?
    /*var desiredChars = {
        lower: false, 
        upper: false,
        nums: false,
        special: false
    };*/

    return generate(passLength, desiredChars);
};

/* Make a string out of all the desired characters specified beforehand, and grab random
   characters from that string until the desired length is reached. */
var generate = function(desiredLength, desiredChars) {
    // first make a bunch of strings containing all the possible characters
    // TODO: maybe move these to global scope? Maybe make these constant?
    var lowerChars = "abcdefghijklmnopqrstuvwxyz";
    var upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // or use lowerChars.toUpperCase();
    var numChars = "0123456789";
    var specialChars = " !\"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~";
    var characterDictionary = [lowerChars, upperChars, numChars, specialChars];

    // now make a string containing the concatenation of all the DESIRED possible characters
    var wantedChars = "";
    for (var i = 0; i < desiredChars.length; i++) {
        if (desiredChars[i]) {
            wantedChars += characterDictionary[i];
        }
    }
    console.log(wantedChars);

    /* finally, repeatedly grab a random character from wantedChars until the desired
       length is reached */
    var password = "";
    while (desiredLength > 0) {
        // generate random number
        var index = Math.floor(Math.random() * wantedChars.length); // range: [0, length)
        //console.log(index);
        // use that number to grab a char from wantedChars and store in password
        password += wantedChars[index];
        desiredLength--;
    }
    // TODO: validate password: does it contain at least one of each type of character?
    return password;
};

// Prompt user to enter a length between 8 and 128, validating the input.
var lengthPrompt = function() {
    var len = 0;
    len = window.prompt(
        "What length will this password be? Enter a number.\n" +
        "Must be at least 8, and no more than 128."
    );
    // TODO: validate: is it a Number? Is it between 8 and 128?
    return parseInt(len);
};

// prompt the user to choose AT LEAST ONE "character type" for the password, returning an array.
var setCharacterChoices = function() {
    // make list of options to choose from and a list to store the responses
    // TODO: maybe make this global?
    var charOptions = ["lowercase", "uppercase", "numerical", "special"];
    var choices = [false, false, false, false];
    //if (!choices.includes(true)) { console.log("Yup, this works."); }

    for (var i = 0; i < charOptions.length; i++) {
        // prompt user whether to choose to include an option
        choices[i] = characterPrompt(charOptions[i]);
    }
    //TODO: validate: is at least one option true?
    return choices;
};

// Prompt user for inclusion of "character type" and return true/false.
var characterPrompt = function(charType) {
    return window.confirm(
        "Include " + charType + " characters in this password?\n" +
        "Click OK to include, Cancel otherwise."
    );
};


/************************* MAIN CODE *************************/

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
