## CrowdFund Solidity Contract

The starter code is initially from https://solidity-by-example.org/app/crowd-fund/.

### Additional features:
- Voting for a campaign (separate function and event), should have at least 10 approved votes in order to start pledging any amount
- Added a goal description field in the on-chain state, so that initial goal description is not lost when the campaign is approved
- Keeping track of number of donors for each campaign, a campaign can only be claimed if it has at least 10 donors