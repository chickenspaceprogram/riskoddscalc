# I think this verified the main program, it's close enough anyhow. Turns out that the expected losses are similar, shoulda probably expected that. 
# Likely won't add the expected values to the TI-BASIC program, takes 3x the storage space and would need to be precalculated.

# NEVER FUCKING USE THIS. IT'S SHIT. GET THE EXACT PROBS USING REVC INSTEAD.

import random
import math
numAtk = int(input("Enter number of attackers: "))
numDef = int(input("Enter number of defenders: "))
numSims = int(input("Enter number of simulations: "))

atkWins = 0
defWins = 0
totalAtkLosses = 0
totalDefLosses = 0

for i in range(numSims):
    currentAtk = numAtk
    currentDef = numDef
    atkLosses = 0
    defLosses = 0
    while currentAtk > 0 and currentDef > 0:
        atkRolls = []
        defRolls = []
        if currentAtk >= 3:
            atkDice = 3
        else:
            atkDice = currentAtk
        if currentDef >= 2:
            defDice = 2
        else:
            defDice = 1
        for j in range(atkDice):
            atkRolls.append(random.randint(1, 6))
        for k in range(defDice):
            defRolls.append(random.randint(1, 6))
        atkRolls.sort(reverse=True)
        defRolls.sort(reverse=True)
        numCompare = min([atkDice, defDice])
        for l in range(numCompare):
            if atkRolls[l] > defRolls[l]:
                currentDef -= 1
                defLosses += 1
            else:
                currentAtk -= 1
                atkLosses += 1
    if currentAtk > 0:
        atkWins += 1
    else:
        defWins += 1
    totalAtkLosses += atkLosses
    totalDefLosses += defLosses

atkWinChance = atkWins / numSims
defWinChance = defWins / numSims
expAtkLosses = totalAtkLosses / numSims
expDefLosses = totalDefLosses / numSims



print(f"Attacker Win Chance: {atkWinChance * 100}\nDefender Win Chance: {defWinChance * 100}\nExpected Attacker Losses: {expAtkLosses}\nExpected Defender Losses: {expDefLosses}")