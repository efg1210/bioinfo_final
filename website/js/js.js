
function submit1(e) {
    let bases = String(e.target.message.value).toUpperCase();
    console.log("bases: " + bases);
    let frame = [];
    for (let i = 0; i < 3; i++) {
        console.log("loop");
    }
}

function convert(bases) {
    let acids = [];
    let codon = bases.slice(0,3);
    let counter = 0;
    while (counter < bases.length) {
        switch(codon) {
            case "ATG":
                acids.push("Met"); break;
        }
    }
}

function reset1(){
    document.getElementByClass("answer").value = "";
  }