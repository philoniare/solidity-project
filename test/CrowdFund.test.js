const { expect } = require("chai");
const { ethers } = require("hardhat");


const getTimestampInSeconds = () => Math.floor(Date.now() / 1000);

describe("CrowdFund contract", function () {
    it("Launch should create a campaign", async function () {
        const [owner] = await ethers.getSigners();

        // Deploy the custom token contract
        const FundToken = await ethers.getContractFactory("contracts/ERC20.sol:ERC20");

        const fundToken = await FundToken.deploy();

        const ownerBalance = await fundToken.balanceOf(owner.address);
        expect(await fundToken.totalSupply()).to.equal(ownerBalance);

        // Test out the crowdfund token
        const CrowdFund = await ethers.getContractFactory("contracts/CrowdFund.sol:CrowdFund");
        const crowdFund = await CrowdFund.deploy();

        await crowdFund.initialize(fundToken.address);

        // Launch a new campaign
        await crowdFund.launch(10000, getTimestampInSeconds() + 1000, getTimestampInSeconds() + 100000);

        // Make sure campaign has been created
        const campaignCount = await crowdFund.count();
        expect(campaignCount.toString()).to.equal('1');

        // Make sure that correct campaign has been created
        const campaign = await crowdFund.campaigns(1);
        const [creator, goal, pledged, start, end, claimed] = campaign.toString().split(',');
        expect(creator).to.equal(owner.address);
        expect(goal).to.equal('10000');
    });
});