// Akram Sabbah

/************************** GLOBALS **************************/

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");

// strings containing all the possible characters, 
// TODO: Maybe make these constant?
var lowerChars = "abcdefghijklmnopqrstuvwxyz";
var upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // or use lowerChars.toUpperCase();
var numChars = "0123456789";
var specialChars = " !\"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~";
var characterDictionary = [lowerChars, upperChars, numChars, specialChars];

/************************* FUNCTIONS *************************/

// Write password to the #password input
function writePassword() {
    var password = generatePassword();
    var passwordText = document.querySelector("#password");

    passwordText.value = password;

}

/* Ask user for password length and desired character types via the Prompt() functions,
   then use generate() to return a randomized password meeting the criteria.
   Validates the generated password to have at least one character from each desired type. */
var generatePassword = function() {
    var password = "";

    // grab desired password length
    var passLength = lengthPrompt();

    // grab all the desired character types to use in password
    var desiredChars = setCharacterChoices();

    // make a string containing the concatenation of all the desired possible characters
    var wantedChars = "";
    for (var i = 0; i < desiredChars.length; i++) {
        if (desiredChars[i]) {
            wantedChars += characterDictionary[i];
        }
    }

    // validate: does password represent all desired criteria?
    // if password is empty or invalid, generate a new one.
    while(!validatePass(password, desiredChars)) {
        console.log(password);
        password = generate(passLength, wantedChars);
    }

    return password;
};

/* Grab random characters from wantedChars string until the desired length is reached. */
var generate = function(length, wantedChars) {
    var password = "";
    for (var i = 0; i < length; i++) {
        // generate random number. Range: [0, wantedChars.length)
        var index = Math.floor(Math.random() * wantedChars.length);
        
        // use that number to grab a char from wantedChars and store in password
        password += wantedChars[index];
    }
    return password;
};

// Prompt user to enter a length between 8 and 128, validating the input.
var lengthPrompt = function() {
    var len = parseInt(window.prompt(
        "What length will this password be? Enter a number.\n" +
        "Must be at least 8, and no more than 128."
    ));

    // validate: is it a Number? Is it between 8 and 128?
    // len will either be a number if parseInt worked, or NaN if not.
    while (isNaN(len) || len < 8 || len > 128) {
        len = parseInt(window.prompt(
            "This is not a valid length. Please re-enter.\n" +
            "Must be at least 8, and no more than 128."
        ));
    }
    
    return len;
};

// Prompt user to choose AT LEAST ONE criteria for the password, returning an array.
var setCharacterChoices = function() {
    // make list of options to choose from and a list to store the responses
    // both will be same length and order as characterDictionary
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

// Determine if password has 1+ chars of each chosen criteria from characterDictionary
var validatePass = function(pass, choices) {
    // for each true member of choices:
    for (var i = 0; i < choices.length; i++) {
        if (choices[i]) {

            var match = false;
            // match becomes true if a character in pass matches the criteria.
            for (var j = 0; j < pass.length; j++) {
                if (characterDictionary[i].includes(pass[j])) {
                    match = true;
                    break;
                }
            }
            // ...if match is still false, return false.
            if (!match) {
                return false;
            }

        }
    }
    // if all criteria are represented in pass, return true.
    return true;
};



/************************* MAIN CODE *************************/

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
