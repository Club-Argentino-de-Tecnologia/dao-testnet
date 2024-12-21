// scripts/check-proposal.js
async function main() {
    try {
        const [signer] = await ethers.getSigners();
        const governorAddress = process.env.GOVERNOR_ADDRESS;
        const Governor = await ethers.getContractFactory("CATGovernor");
        const governor = Governor.attach(governorAddress);

        const proposalId = "62363289856984037396400653264550876904124485917437541152330187916735411493250";
        
        console.log("\nVerificando parámetros de tiempo del Governor:");
        const votingDelay = await governor.votingDelay();
        const votingPeriod = await governor.votingPeriod();
        console.log("Voting Delay:", votingDelay.toString(), "bloques");
        console.log("Voting Period:", votingPeriod.toString(), "bloques");

        const currentBlock = await ethers.provider.getBlockNumber();
        console.log("\nBloque actual:", currentBlock);
        
        const proposalSnapshot = await governor.proposalSnapshot(proposalId);
        const proposalDeadline = await governor.proposalDeadline(proposalId);
        console.log("Bloque de snapshot (inicio votación):", proposalSnapshot.toString());
        console.log("Bloque deadline (fin votación):", proposalDeadline.toString());

        const state = await governor.state(proposalId);
        const states = ['Pending', 'Active', 'Canceled', 'Defeated', 'Succeeded', 'Queued', 'Expired', 'Executed'];
        console.log("\nEstado actual:", states[state]);

        // Calcular bloques restantes
        if (currentBlock < proposalSnapshot) {
            console.log("\nBloques restantes para poder votar:", proposalSnapshot - currentBlock);
            console.log("Tiempo estimado (2s por bloque):", ((proposalSnapshot - currentBlock) * 2) / 60, "minutos");
        }

        if (state === 1) { // Active
            console.log("\nBloques restantes para votar:", proposalDeadline - currentBlock);
            console.log("Tiempo estimado de votación restante:", ((proposalDeadline - currentBlock) * 2) / 60, "minutos");
        }

    } catch (error) {
        console.error("Error detallado:", error);
    }
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });