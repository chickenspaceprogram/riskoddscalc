function main() {
    let atk = document.getElementById("numAtk").value;
    let def = document.getElementById("numDef").value;
    if (atk >= tbl_size[0] || def >= tbl_size[1]) {
        makeTbl(atk, def);
    };
    document.getElementById("atkwinprob").innerHTML = "Attacker win chance: <mark>" + (Math.round(atkWinProb[atk][def] * 100000) / 1000) + "%</mark>"
    document.getElementById("defwinprob").innerHTML = "Defender win chance: <mark>" + (Math.round((1 - atkWinProb[atk][def]) * 100000) / 1000) + "%</mark>"
    document.getElementById("atkexplosses").innerHTML = "Attacker expected troop losses: <mark>" + (Math.round(atkExpLoss[atk][def] * 10) / 10) + "</mark>"
    document.getElementById("defexplosses").innerHTML = "Defender expected troop losses: <mark>" + (Math.round(defExpLoss[atk][def] * 10) / 10) + "</mark>"
};

function makeTbl(atk, def) {
    tbl_size = [atk, def];
    atkWinProb = []
    for (let i = 0; i <= atk; i++) {
        let subarray = [];
        for (let j = 0; j <= def; j++) {
            subarray.push(0)
        };
        atkWinProb.push(subarray)
    };
    atkExpLoss = atkWinProb;
    defExpLoss = atkWinProb;
    for (let i = 1; i <= def; i++) {
        atkWinProb[0][i] = 1
    }
    /*
    Why did I think it was a good idea to change variable names from the python script?
    This sucked to rewrite for the FIFTH time. 
    (original Python script, TI-BASIC, Fortran, new Python script, and now this JS script)

    im gonna lose my mind >:(
    
    (by the way, the probabilities here are from datagenetics.com/blog/november22011/index.html)
    I've calculated them myself before with a python script (not included) but if you don't want to do that just take them from there.
    The idea (but not the algorithm) for this whole long project that has spanned years originally came from this article.

    While I'm here, holy hell I apologise for this block of code. It is hideous.
    */
    for (numAtk = 1; numAtk <= atk; numAtk++) {
        for (numDef = 1; numDef <= def; numDef++) {
            if (numDef >= 2) {
                if (numAtk >= 3) {
                    atkWinProb[numAtk][numDef] = atkWinProb[numAtk][numDef - 2] * (2890 / 7776) + atkWinProb[numAtk - 2][numDef] * (2275 / 7776) + atkWinProb[numAtk - 1][numDef - 1] * (2611 / 7776);
                    atkExpLoss[numAtk][numDef] = atkExpLoss[numAtk][numDef - 2] * (2890 / 7776) + (atkExpLoss[numAtk - 2][numDef] + 2) * (2275 / 7776) + (atkExpLoss[numAtk - 1][numDef - 1] + 1) * (2611 / 7776);
                    defExpLoss[numAtk][numDef] = (defExpLoss[numAtk][numDef - 2] + 2) * (2890 / 7776) + defExpLoss[numAtk - 2][numDef] * (2275 / 7776) + (defExpLoss[numAtk - 1][numDef - 1] + 1) * (2611 / 7776);
                } else if (numAtk === 2) {
                    atkWinProb[numAtk][numDef] = atkWinProb[numAtk][numDef - 2] * (295 / 1296) + atkWinProb[numAtk - 2][numDef] * (581 / 1296) + atkWinProb[numAtk - 1][numDef - 1] * (420 / 1296);
                    atkExpLoss[numAtk][numDef] = atkExpLoss[numAtk][numDef - 2] * (295 / 1296) + (atkExpLoss[numAtk - 2][numDef] + 2) * (581 / 1296) + (atkExpLoss[numAtk - 1][numDef - 1] + 1) * (420 / 1296);
                    defExpLoss[numAtk][numDef] = (defExpLoss[numAtk][numDef - 2] + 2) * (295 / 1296) + defExpLoss[numAtk - 2][numDef] * (581 / 1296) + (defExpLoss[numAtk - 1][numDef - 1] + 1) * (420 / 1296);
                } else {
                    atkWinProb[numAtk][numDef] = atkWinProb[numAtk][numDef - 1] * (55 / 216) + atkWinProb[numAtk - 1][numDef] * (161 / 216);
                    atkExpLoss[numAtk][numDef] = atkExpLoss[numAtk][numDef - 1] * (55 / 216) + (atkExpLoss[numAtk - 1][numDef] + 1) * (161 / 216);
                    defExpLoss[numAtk][numDef] = (defExpLoss[numAtk][numDef - 1] + 1) * (55 / 216) + defExpLoss[numAtk - 1][numDef] * (161 / 216);
                };
            } else {
                if (numAtk >= 3) {
                    atkWinProb[numAtk][numDef] = atkWinProb[numAtk][numDef - 1] * (855 / 1296) + atkWinProb[numAtk - 1][numDef] * (441 / 1296);
                    atkExpLoss[numAtk][numDef] = atkExpLoss[numAtk][numDef - 1] * (855 / 1296) + (atkExpLoss[numAtk - 1][numDef] + 1) * (441 / 1296);
                    defExpLoss[numAtk][numDef] = (defExpLoss[numAtk][numDef - 1] + 1) * (855 / 1296) + defExpLoss[numAtk - 1][numDef] * (441 / 1296);
                } else if (numAtk === 2) {
                    atkWinProb[numAtk][numDef] = atkWinProb[numAtk][numDef - 1] * (125 / 216) + atkWinProb[numAtk - 1][numDef] * (91 / 216);
                    atkExpLoss[numAtk][numDef] = atkExpLoss[numAtk][numDef - 1] * (125 / 216) + (atkExpLoss[numAtk - 1][numDef] + 1) * (91 / 216);
                    defExpLoss[numAtk][numDef] = (defExpLoss[numAtk][numDef - 1] + 1) * (125 / 216) + defExpLoss[numAtk - 1][numDef] * (91 / 216);
                } else {
                    atkWinProb[numAtk][numDef] = atkWinProb[numAtk][numDef - 1] * (15 / 36) + atkWinProb[numAtk - 1][numDef] * (21 / 36);
                    atkExpLoss[numAtk][numDef] = atkExpLoss[numAtk][numDef - 1] * (15 / 36) + (atkExpLoss[numAtk - 1][numDef] + 1) * (21 / 36);
                    defExpLoss[numAtk][numDef] = (defExpLoss[numAtk][numDef - 1] + 1) * (15 / 36) + defExpLoss[numAtk - 1][numDef] * (21 / 36);
                };
            };
        };
    };
};

var atkWinProb = []
var atkExpLoss = []
var defExpLoss = []
var tbl_size = [0, 0]