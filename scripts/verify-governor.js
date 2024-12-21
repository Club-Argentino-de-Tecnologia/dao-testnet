// scripts/verify-governor.js
async function main() {
    try {
        const [signer] = await ethers.getSigners();
        const governorAddress = process.env.GOVERNOR_ADDRESS;
        const Governor = await ethers.getContractFactory("CATGovernor");
        const governor = Governor.attach(governorAddress);

        console.log("Verificando Governor...");
        console.log("Dirección:", governorAddress);
        
        // Verificar parámetros básicos
        const votingDelay = await governor.votingDelay();
        const votingPeriod = await governor.votingPeriod();
        const quorum = await governor.quorum(0);
        const proposalThreshold = await governor.proposalThreshold();

        console.log("\nParámetros del Governor:");
        console.log("Voting Delay:", votingDelay.toString(), "bloques");
        console.log("Voting Period:", votingPeriod.toString(), "bloques");
        console.log("Quorum:", quorum.toString());
        console.log("Proposal Threshold:", proposalThreshold.toString());

    } catch (error) {
        console.error("Error:", error);
    }
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });