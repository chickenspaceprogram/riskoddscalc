program expectedvals
    implicit none
    real, allocatable :: oldArray(:,:), newArray(:,:)
    real :: atkWinProb, defWinProb, expAtkLoss, expDefLoss
    integer :: numAtk, numDef, Atk, Def, numLoops, i
    print *, "Enter number of Attackers:"
    read *, numAtk
    print *, "Enter number of Defenders:"
    read *, numDef
    numLoops = (numAtk + numDef) / 2
    allocate(oldArray(0:numAtk, 0:numDef))
    allocate(newArray(0:numAtk, 0:numDef))
    oldarray(numAtk, numDef) = 1
    do numLoops = 1, numAtk + numDef
        do Atk = 0, numAtk
            do Def = 0, numDef
                if (oldArray(Atk, Def) /= 0) then
                    if ((Def >= 2) .and. (Atk >= 3)) then
                        newArray(Atk, Def - 2) = oldArray(Atk, Def) * 2890 / 7776 + newArray(Atk, Def - 2)
                        newArray(Atk - 2, Def) = oldArray(Atk, Def) * 2275 / 7776 + newArray(Atk - 2, Def)
                        newArray(Atk - 1, Def - 1) = oldArray(Atk, Def) * 2611 / 7776 + newArray(Atk - 1, Def - 1)
                    else if ((Def == 0) .or. (Atk == 0)) then
                        newArray(Atk, Def) = oldArray(Atk, Def)
                    else if ((Def >= 2) .and. (Atk == 2)) then
                        newArray(2, Def - 2) = oldArray(2, Def) * 295 / 1296 + newArray(2, Def - 2)
                        newArray(0, Def) = oldArray(2, Def) * 581 / 1296 + newArray(0, Def)
                        newArray(1, Def - 1) = oldArray(2, Def) * 420 / 1296 + newArray(1, Def - 1)
                    else if ((Def >= 2) .and. (Atk == 1)) then
                        newArray(1, Def - 1) = oldArray(1, Def) * 55 / 216 + newArray(1, Def - 1)
                        newArray(0, Def) = oldArray(1, Def) * 161 / 216 + newArray(0, Def)
                    else if ((Def == 1) .and. (Atk >= 3)) then
                        newArray(Atk, 0) = oldArray(Atk, 1) * 855 / 1296 + newArray(Atk, 0)
                        newArray(Atk - 1, 1) = oldArray(Atk, 1) * 441 / 1296 + newArray(Atk - 1, 1)
                    else if ((Def == 1) .and. (Atk == 2)) then
                        newArray(2, 0) = oldArray(2, 1) * 125 / 216 + newArray(2, 0)
                        newArray(1, 1) = oldArray(2, 1) * 91 / 216 + newArray(1, 1)
                    else if ((Def == 1) .and. (Atk == 1)) then
                        newArray(1, 0) = oldArray(1, 1) * 15 / 36 + newArray(1, 0)
                        newArray(0, 1) = oldArray(1, 1) * 21 / 36 + newArray(0, 1)
                    end if
                end if
            end do
        end do
        oldArray = newArray
        newArray = 0
    end do
    atkWinProb = 0
    do i = 1, numAtk
        atkWinProb = atkWinProb + oldArray(i, 0)
    end do
    defwinProb = 1 - atkWinProb
    do i = 1, numAtk
        expAtkLoss = expAtkLoss + (oldArray(i, 0)) * (numAtk - i)
    end do
    do i = 1, numDef
        expDefLoss = expDefLoss + (oldArray(0, i)) * (numDef - i)
    end do
    expAtkLoss = expAtkLoss + defWinProb * numAtk
    expDefLoss = expDefLoss + atkWinProb * numDef
    print *, 'Attacker win prob:', atkWinProb * 100, "%"
    print *, 'Defender win prob:', defWinProb * 100, "%"
    print *, 'Attacker expected losses:', expAtkLoss
    print *, 'Defender expected losses:', expDefLoss
end program expectedvals