
function submit1(e) {
    e.preventDefault();
    let bases = String(e.target.message.value).toUpperCase();
    //console.log("bases: " + bases);
    let frames = ["", "", ""];
    for (let i = 0; i < 1; i++) {
        frames[i] = convert(bases.slice(i));
    }
    console.log(frames);
    document.getElementById("result1").value = frames[0];
    document.getElementById("result2").value = frames[1];
    document.getElementById("result3").value = frames[2];
}

function convert(bases) {
    let acids = [];
    let codon = bases.slice(0,3);
    let counter = 0;
    while (counter < bases.length) {
        let codon = bases.slice(counter, (counter + 3));
        console.log("codon:" + codon);
        switch(codon) {
            case "TAC":
                acids.push("Met"); break;
            default:
                acids.push("hi");
        }
        counter += 3;
    }

    let answer = "";
    for (let i = 0; i < acids.length; i++) {
        answer += acids[i] + " ";
    }
    return answer;
}

function reset1(){
    document.getElementsByClassName("answer").value = "";
  }