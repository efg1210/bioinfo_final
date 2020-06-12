function submit1(e) {
    e.preventDefault();
    let bases = String(e.target.message.value).toUpperCase();
    let backwards = document.getElementById("myCheck").checked;
    if (backwards) {
        bases = backwardize(bases);
    }
    let transcribedBases = transcribe(bases);
    let frames = ["", "", ""];
    for (let i = 0; i < 3; i++) {
        frames[i] = translate(transcribedBases.slice(i));
    }
    let one = pretty(frames[0]);
    let two = pretty(frames[1]);
    let three = pretty(frames[2]);
    let longestStrandVar = longestStrand(frames);
    document.getElementById("result1").innerHTML = one;
    document.getElementById("result2").innerHTML = two;
    document.getElementById("result3").innerHTML = three;
    document.getElementById("result4").innerHTML = pretty(longestStrandVar);
}

function backwardize(bases) {
    let output = "";
    for (let i = bases.length - 1; i >= 0; i--) {
        output += bases.charAt(i);
    } return output;
}

function longestStrand(frames) {
    
    let longest = "";
    let readingFrame = 0;

    for (let index = 0; index < frames.length; index++) {
        let currentStrand = "";
        for (let i = 0; i < frames[index].length; i++) {
            let currentChar = frames[index].charAt(i);
            
            if (!currentStrand.includes("M") && currentChar == "M") {
                currentStrand = "M";
            } else if (currentChar == "*") {
                currentStrand += currentChar;
                if (currentStrand.length > longest.length && currentStrand.includes("M")) {
                    longest = currentStrand;
                    readingFrame = index + 1;
                } else if (currentStrand.length > longest.length && currentStrand.length == i+1) {
                    longest = currentStrand;
                    readingFrame = index + 1;
                }
                currentStrand = "";
            } else {
                currentStrand += currentChar;
            }

            if (i + 1 == frames[index].length && currentStrand.length > longest.length && currentStrand.includes("M")) {
                longest = currentStrand;
                readingFrame = index + 1;
            }
        }
    }
    if (longest.length == 0) return "";
    longest = longest + "<br> <b>(Frame " + readingFrame.toString() + ")<b>";
    return longest;
}

function pretty(polyPep) {
    let result = "<p>";
    let frame = "";
    if (polyPep.includes(" (F")) {
        let split = polyPep.split(" ");
        polyPep = split[0];
        frame = split[1] + " " + split[2];
    }

    for (let i = 0; i < polyPep.length; i++) {
        if (polyPep.charAt(i) == "M") {
            result += "<marked class='green'>M</marked>";
        } else if (polyPep.charAt(i) == "*") {
            result += "<marked class='red'>*</marked>";
        } else {
            result += polyPep.charAt(i);
        }
    }

    if (frame != "") {
        result += " " + frame;
    }

    result += "</p>";
    return result;
}

function checkAction() {
    let checkBox = document.getElementById("myCheck");
    let text = document.getElementById("warning");
    if (checkBox.checked == true){
        text.style.display = "block";
        document.getElementById("rf1").textContent = "Reading Frame -1";
        document.getElementById("rf2").textContent = "Reading Frame -2";
        document.getElementById("rf3").textContent = "Reading Frame -3";
    } else {
        text.style.display = "none";
        document.getElementById("rf1").textContent = "Reading Frame 1";
        document.getElementById("rf2").textContent = "Reading Frame 2";
        document.getElementById("rf3").textContent = "Reading Frame 3";
    }
}

function transcribe(template) {
    let result = "";
    for (let i = 0; i < template.length; i++) {
        if (template.charAt(i) == "T") {
            result += "U";
        } else if (template.charAt(i) != " ") {
            result += template.charAt(i);
        }
    }
    return result;
}

function translate(bases) {
    let acids = [];
    let codon = bases.slice(0,3);
    let counter = 0;
    while (counter < bases.length) {
        let codon = bases.slice(counter, (counter + 3));
        switch(codon) {
            case "AUG":
                acids.push("M"); break;
            case "UUU":
            case "UUC":
                acids.push("F"); break;
            case "UUA":
            case "UUG":
            case "CUU":
            case "CUC":
            case "CUA":
            case "CUG":
                acids.push("L"); break;
            case "AUU":
            case "AUC":
            case "AUA":
                acids.push("I"); break;
            case "GUU":
            case "GUC":
            case "GUA":
            case "GUG":
                acids.push("V"); break;
            case "CCU":
            case "CCC":
            case "CCA":
            case "CCG":
                acids.push("P"); break;
            case "ACU":
            case "ACC":
            case "ACA":
            case "ACG":
                acids.push("T"); break;
            case "GCU":
            case "GCC":
            case "GCA":
            case "GCG":
                acids.push("A"); break;
            case "GGU":
            case "GGC":
            case "GGA":
            case "GGG":
                acids.push("G"); break;
            case "CGU":
            case "CGC":
            case "CGA":
            case "CGG":
            case "AGA":
            case "AGG":
                acids.push("R"); break;
            case "UGG":
                acids.push("W"); break;
            case "UAU":
            case "UAC":
                acids.push("Y"); break;
            case "CAU":
            case "CAC":
                acids.push("H"); break;
            case "CAA":
            case "CAG":
                acids.push("Q"); break;
            case "AAU":
            case "AAC":
                acids.push("N"); break;
            case "AAA":
            case "AAG":
                acids.push("K"); break;
            case "GAU":
            case "GAC":
                acids.push("D"); break;
            case "GAA":
            case "GAG":
                acids.push("E"); break;
            case "UGU":
            case "UGC":
                acids.push("C"); break;
            case "UCU":
            case "UCC":
            case "UCA":
            case "UCG":
            case "AGU":
            case "AGC":
                acids.push("S"); break;
            case "UAA":
            case "UAG":
            case "UGA":
                acids.push("*"); break;
            default:
                acids.push("");
        }
        counter += 3;
    }

    let answer = "";
    for (let i = 0; i < acids.length; i++) {
        answer += acids[i];
    }
    return answer;
}

function reset1(){
    document.getElementsByClassName("answer").value = "";
}