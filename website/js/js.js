
function submit1(e) {
    e.preventDefault();
    let bases = String(e.target.message.value).toUpperCase();
    //console.log("bases: " + bases);
    let transcribedBases = transcribe(bases);
    //console.log(transcribedBases);
    let frames = ["", "", ""];
    for (let i = 0; i < 3; i++) {
        frames[i] = translate(transcribedBases.slice(i));
    }
    //console.log(frames);
    console.log(pretty(frames[0]));
    document.getElementById("result1").innerHTML = pretty(frames[0]);
    document.getElementById("result2").innerHTML = pretty(frames[1]);
    document.getElementById("result3").innerHTML = pretty(frames[2]);
}

function translate(bases) {
    let acids = [];
    let codon = bases.slice(0,3);
    let counter = 0;
    while (counter < bases.length) {
        let codon = bases.slice(counter, (counter + 3));
        //console.log("codon:" + codon);
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

function pretty(polyPep) {
    let result = "<p>";
    for (let i = 0; i < polyPep.length; i++) {
        if (polyPep.charAt(i) == "M") {
            result += "<marked class='green'>M</marked>";
        } else if (polyPep.charAt(i) == "*") {
            result += "<marked class='red'>*</marked>";
        } else {
            result += polyPep.charAt(i);
        }
    }
    result += "</p>";
    return result;
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

function reset1(){
    document.getElementsByClassName("answer").value = "";
  }