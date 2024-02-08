import json

class Battle():
    def __init__(self, tblsize):
        self.matrix_size = tblsize
        self.odds_matrix = []
        for _ in range(self.matrix_size + 1):
            self.odds_matrix.append([0.0] * (self.matrix_size + 1))
        self.odds_matrix[0][1:] = [1.0] * self.matrix_size  # The keys that access the required chance are basically [number of defenders][number of attackers].
        for self.defenders in range(1, len(self.odds_matrix)):
            for self.attackers in range(1, len(self.odds_matrix[0])):
                if self.defenders == 1:
                    if self.attackers == 1:
                        self.odds_matrix[self.defenders][self.attackers] = (15 / 36) * self.odds_matrix[self.defenders - 1][self.attackers] + (21 / 36) * self.odds_matrix[self.defenders][self.attackers - 1]
                    elif self.attackers == 2:
                        self.odds_matrix[self.defenders][self.attackers] = (125 / 216) * self.odds_matrix[self.defenders - 1][self.attackers] + (91 / 216) * self.odds_matrix[self.defenders][self.attackers - 1]
                    else:
                        self.odds_matrix[self.defenders][self.attackers] = (855 / 1296) * self.odds_matrix[self.defenders - 1][self.attackers] + (441 / 1296) * self.odds_matrix[self.defenders][self.attackers - 1]
                else:
                    if self.attackers == 1:
                        self.odds_matrix[self.defenders][self.attackers] = (55 / 216) * self.odds_matrix[self.defenders - 1][self.attackers] + (161 / 216) * self.odds_matrix[self.defenders][self.attackers - 1]
                    elif self.attackers == 2:
                        self.odds_matrix[self.defenders][self.attackers] = (295 / 1296) * self.odds_matrix[self.defenders - 2][self.attackers] + (581 / 1296) * self.odds_matrix[self.defenders][self.attackers - 2] + (420 / 1296) * self.odds_matrix[self.defenders - 1][self.attackers - 1]
                    else:
                        self.odds_matrix[self.defenders][self.attackers] = (2890 / 7776) * self.odds_matrix[self.defenders - 2][self.attackers] + (2275 / 7776) * self.odds_matrix[self.defenders][self.attackers - 2] + (2611 / 7776) * self.odds_matrix[self.defenders - 1][self.attackers - 1]

battle_class = Battle(int(input("What size do you want the battle table to be? ")))

jsondump = json.dumps(battle_class.odds_matrix)

with open("battleodds.json", "w") as jsonfile:
    jsonfile.write(jsondump)