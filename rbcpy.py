import json

tblsize = int(input("Enter maximum table size: "))
oddsArray = [ [ 0 for i in range(tblsize)] for j in range(tblsize) ]
atkLossArray = [ [ 0 for i in range(tblsize)] for j in range(tblsize) ]
defLossArray = [ [ 0 for i in range(tblsize)] for j in range(tblsize) ]

oddsArray[0] = [ 1 for i in range(tblsize) ]
oddsArray[0][0] = 0

def formatArrays(array):# little formatting function for ti 84, just delete it when putting online
    return [ [ i[j] for i in array[1:] ] for j in range(1, len(array)) ]

for defn in range(1, tblsize):
    for atk in range(1, tblsize):
        if defn >= 2:
            if atk >= 3:
                oddsArray[defn][atk] = (oddsArray[defn - 2][atk] * (2890 / 7776)) + (oddsArray[defn][atk - 2] * (2275 / 7776)) + (oddsArray[defn - 1][atk - 1] * (2611 / 7776))
                atkLossArray[defn][atk] = (atkLossArray[defn - 2][atk] * (2890 / 7776)) + ((atkLossArray[defn][atk - 2] + 2) * (2275 / 7776)) + ((atkLossArray[defn - 1][atk - 1] + 1) * (2611 / 7776))
                defLossArray[defn][atk] = ((defLossArray[defn - 2][atk] + 2) * (2890 / 7776)) + (defLossArray[defn][atk - 2] * (2275 / 7776)) + ((defLossArray[defn - 1][atk - 1] + 1) * (2611 / 7776))
            elif atk == 2:
                oddsArray[defn][atk] = (oddsArray[defn - 2][atk] * (295 / 1296)) + (oddsArray[defn][atk - 2] * (581 / 1296)) + (oddsArray[defn - 1][atk - 1] * (420 / 1296))
                atkLossArray[defn][atk] = (atkLossArray[defn - 2][atk] * (295 / 1296)) + ((atkLossArray[defn][atk - 2] + 2) * (581 / 1296)) + ((atkLossArray[defn - 1][atk - 1] + 1) * (420 / 1296))
                defLossArray[defn][atk] = ((defLossArray[defn - 2][atk] + 2) * (295 / 1296)) + (defLossArray[defn][atk - 2] * (581 / 1296)) + ((defLossArray[defn - 1][atk - 1] + 1) * (420 / 1296))
            elif atk == 1:
                oddsArray[defn][atk] = (oddsArray[defn - 1][atk] * (55 / 216)) + (oddsArray[defn][atk - 1] * (161 / 216))
                atkLossArray[defn][atk] = (atkLossArray[defn - 1][atk] * (55 / 216)) + ((atkLossArray[defn][atk - 1] + 1) * (161 / 216))
                defLossArray[defn][atk] = ((defLossArray[defn - 1][atk] + 1) * (55 / 216)) + (defLossArray[defn][atk - 1] * (161 / 216))
        elif defn == 1:
            if atk >= 3:
                oddsArray[defn][atk] = (oddsArray[defn - 1][atk] * (855 / 1296)) + (oddsArray[defn][atk - 1] * (441 / 1296))
                atkLossArray[defn][atk] = (atkLossArray[defn - 1][atk] * (855 / 1296)) + ((atkLossArray[defn][atk - 1] + 1) * (441 / 1296))
                defLossArray[defn][atk] = ((defLossArray[defn - 1][atk] + 1) * (855 / 1296)) + (defLossArray[defn][atk - 1] * (441 / 1296))
            elif atk == 2:
                oddsArray[defn][atk] = (oddsArray[defn - 1][atk] * (125 / 216)) + (oddsArray[defn][atk - 1] * (91 / 216))
                atkLossArray[defn][atk] = (atkLossArray[defn - 1][atk] * (125 / 216)) + ((atkLossArray[defn][atk - 1] + 1) * (91 / 216))
                defLossArray[defn][atk] = ((defLossArray[defn - 1][atk] + 1) * (125 / 216)) + (defLossArray[defn][atk - 1] * (91 / 216))
            elif atk == 1:
                oddsArray[defn][atk] = (oddsArray[defn - 1][atk] * (15 / 36)) + (oddsArray[defn][atk - 1] * (21 / 36))
                atkLossArray[defn][atk] = (atkLossArray[defn - 1][atk] * (15 / 36)) + ((atkLossArray[defn][atk - 1] + 1) * (21 / 36))
                defLossArray[defn][atk] = ((defLossArray[defn - 1][atk] + 1) * (15 / 36)) + (defLossArray[defn][atk - 1] * (21 / 36))

atkWinProbs = json.dumps(oddsArray)
atkExpLoss = json.dumps(atkLossArray)
defExpLoss = json.dumps(defLossArray)

with open('atkWinProbs.json', 'w') as awpjson:
    awpjson.write(atkWinProbs)

with open('atkExpLoss.json', 'w') as aeljson:
    aeljson.write(atkExpLoss)

with open('defExpLoss.json', 'w') as deljson:
    deljson.write(defExpLoss)
