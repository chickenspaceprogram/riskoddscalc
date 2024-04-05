function main() {
    event.preventDefault()
    var atk = parseInt(document.getElementById("numAtk").value);
    var def = parseInt(document.getElementById("numDef").value);
    if (atk >= tbl_size[0] || def >= tbl_size[1]) {
        makeTbl(atk, def);
    };
    document.getElementById("atkwinprob").innerHTML = "Attacker win chance: <mark>" + (Math.round(atkWinProb[atk][def] * 100000) / 1000) + "%</mark>"
    document.getElementById("defwinprob").innerHTML = "Defender win chance: <mark>" + (Math.round((1 - atkWinProb[atk][def]) * 100000) / 1000) + "%</mark>"
    document.getElementById("atkexplosses").innerHTML = "Attacker expected troop losses: <mark>" + (Math.round(atkExpLoss[atk][def] * 10) / 10) + "</mark>"
    document.getElementById("defexplosses").innerHTML = "Defender expected troop losses: <mark>" + (Math.round(defExpLoss[atk][def] * 10) / 10) + "</mark>"
    console.log(atkWinProb)
};

function makeTbl(atk, def) {
    tbl_size = [atk, def];
    atkWinProb = Array.from(Array(atk + 1), () => new Array(def + 1).fill(0)); // thank you to someone here: https://stackoverflow.com/questions/966225/how-can-i-create-a-two-dimensional-array-in-javascript
    atkExpLoss = Array.from(Array(atk + 1), () => new Array(def + 1).fill(0)); // seriously why are JS arrays so dumb
    defExpLoss = Array.from(Array(atk + 1), () => new Array(def + 1).fill(0));
    for (i = 1; i <= atk; i++) {
        atkWinProb[0][i] = 1
    }

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