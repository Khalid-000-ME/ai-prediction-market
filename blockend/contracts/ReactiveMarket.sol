// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

contract ReactivePredictionMarket is Ownable {

    constructor() Ownable(msg.sender) {}

    struct Bet {
        address user;
        uint256 amount;
        bool prediction;
    }

    mapping(uint256 => Bet[]) public eventBets;
    mapping(uint256 => bool) public eventOutcome;
    mapping(uint256 => bool) public eventResolved;

    event BetPlaced(uint256 eventId, address user, uint256 amount, bool prediction);
    event EventResolved(uint256 eventId, bool outcome);

    function placeBet(uint256 eventId, bool prediction) external payable {
        require(msg.value > 0, "Must place a bet");

        eventBets[eventId].push(Bet(msg.sender, msg.value, prediction));
        emit BetPlaced(eventId, msg.sender, msg.value, prediction);
    }

    function resolveEvent(uint256 eventId, bool outcome) external onlyOwner {
        require(!eventResolved[eventId], "Event already resolved");

        eventOutcome[eventId] = outcome;
        eventResolved[eventId] = true;

        distributeRewards(eventId, outcome);
        emit EventResolved(eventId, outcome);
    }

    function distributeRewards(uint256 eventId, bool outcome) private {
        Bet[] storage bets = eventBets[eventId];
        uint256 totalPool = 0;
        uint256 winningPool = 0;

        for (uint256 i = 0; i < bets.length; i++) {
            totalPool += bets[i].amount;
            if (bets[i].prediction == outcome) {
                winningPool += bets[i].amount;
            }
        }

        for (uint256 i = 0; i < bets.length; i++) {
            if (bets[i].prediction == outcome) {
                uint256 reward = (bets[i].amount * totalPool) / winningPool;
                payable(bets[i].user).transfer(reward);
            }
        }
    }
}
