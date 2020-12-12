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

    // make a string containing the concatenation of all the DESIRED possible characters
    var wantedChars = "";
    for (var i = 0; i < desiredChars.length; i++) {
        if (desiredChars[i]) {
            wantedChars += characterDictionary[i];
        }
    }
    //console.log(wantedChars);

    /* finally, repeatedly grab a random character from wantedChars until the desired
       length is reached */
    var password = "";
    for (var i = 0; i < desiredLength; i++) {
        // generate random number
        var index = Math.floor(Math.random() * wantedChars.length); // range: [0, length)
        
        // use that number to grab a char from wantedChars and store in password
        password += wantedChars[index];
    }
    // validate password: does it contain 1+ char(s) of each desired type?
    if (!validatePass(password, desiredChars, characterDictionary)) {
        /*console.log(password);
        window.alert("It failed lol");*/
        return generate(desiredLength, desiredChars);
    }
    return password;
};

// Prompt user to enter a length between 8 and 128, validating the input.
var lengthPrompt = function() {
    var len = window.prompt(
        "What length will this password be? Enter a number.\n" +
        "Must be at least 8, and no more than 128."
    );
    len = parseInt(len);

    // validate: is it a Number? Is it between 8 and 128?
    // len will either be a number if parseInt worked, or NaN if not.
    while (isNaN(len) || len < 8 || len > 128) {
        len = window.prompt(
            "This is not a valid length. Please re-enter.\n" +
            "Must be at least 8, and no more than 128."
        );
        len = parseInt(len);
    }
    
    return len;
};

// Prompt user to choose AT LEAST ONE "character type" for the password, returning an array.
var setCharacterChoices = function() {
    // make list of options to choose from and a list to store the responses
    // TODO: maybe make this global?
    var charOptions = ["lowercase", "uppercase", "numerical", "special"];
    var choices = [false, false, false, false];

    for (var i = 0; i < charOptions.length; i++) {
        // prompt user whether to choose to include an option
        choices[i] = characterPrompt(charOptions[i]);
    }
    // validate: is at least one option true?
    // if the choices array doesn't have a true element, recurse.
    if (!choices.includes(true)) {
        window.alert(
            "You must choose to include at least one type of character " +
            "criteria in this password. Please try again."
        );
        return setCharacterChoices();
    }

    return choices;
};

// Prompt user for inclusion of "character type" and return true/false.
var characterPrompt = function(charType) {
    return window.confirm(
        "Include " + charType + " characters in this password?\n" +
        "Click OK to include, Cancel otherwise."
    );
};

// Determine if a password has at least one of each chosen criteria.
// note: choices and criteria are the same length.
var validatePass = function(pass, choices, criteria) {
    for (var i = 0; i < criteria.length; i++) {
        if (choices[i]) {

            // either we find a character of pass that matches the criteria,
            var match = false;
            for (var j = 0; j < pass.length; j++) {
                if (criteria[i].includes(pass[j])) {
                    match = true;
                    break;
                }
            }
            // ... or we don't, and return false
            if (!match) {
                return false;
            }

        }
    }
    return true;
};



/************************* MAIN CODE *************************/

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
