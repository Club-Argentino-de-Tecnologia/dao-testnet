// scripts/monitor-proposal.js
async function main() {
    try {
        const governorAddress = process.env.GOVERNOR_ADDRESS;
        const Governor = await ethers.getContractFactory("CATGovernor");
        const governor = Governor.attach(governorAddress);

        const proposalId = "62363289856984037396400653264550876904124485917437541152330187916735411493250";
        
        // Obtener información actual
        const currentBlock = await ethers.provider.getBlockNumber();
        const deadline = await governor.proposalDeadline(proposalId);
        const state = await governor.state(proposalId);
        const states = ['Pending', 'Active', 'Canceled', 'Defeated', 'Succeeded', 'Queued', 'Expired', 'Executed'];
        
        // Obtener votos
        const { againstVotes, forVotes, abstainVotes } = await governor.proposalVotes(proposalId);
        
        // Obtener quorum necesario
        const quorum = await governor.quorum(currentBlock);

        console.log("\n=== Estado de la Propuesta ===");
        console.log("Estado actual:", states[state]);
        console.log("\nProgreso de la votación:");
        console.log("✅ A favor:", ethers.formatEther(forVotes), "CAT");
        console.log("❌ En contra:", ethers.formatEther(againstVotes), "CAT");
        console.log("⚪ Abstenciones:", ethers.formatEther(abstainVotes), "CAT");
        console.log("\nQuorum necesario:", ethers.formatEther(quorum), "CAT");
        
        // Calcular tiempo restante
        const blocksRemaining = Number(deadline) - currentBlock;
        const timeRemaining = (blocksRemaining * 2) / 60; // aprox 2 segundos por bloque
        
        console.log("\nTiempo restante:");
        console.log("Bloques restantes:", blocksRemaining.toString());
        console.log("Tiempo estimado:", timeRemaining.toFixed(2), "minutos");
        
        // Calcular progreso usando valores convertidos
        const forVotesNum = parseFloat(ethers.formatEther(forVotes));
        const againstVotesNum = parseFloat(ethers.formatEther(againstVotes));
        const abstainVotesNum = parseFloat(ethers.formatEther(abstainVotes));
        const quorumNum = parseFloat(ethers.formatEther(quorum));
        
        const totalVotes = forVotesNum + againstVotesNum + abstainVotesNum;
        const quorumProgress = (totalVotes / quorumNum) * 100;
        
        console.log("\nProgreso del quorum:", quorumProgress.toFixed(2), "%");
        
        // Mostrar resultado provisional
        console.log("\nResultado provisional:");
        if (forVotesNum > againstVotesNum) {
            console.log("✅ APROBADA");
            console.log(`Diferencia a favor: ${(forVotesNum - againstVotesNum).toFixed(2)} CAT`);
        } else if (forVotesNum < againstVotesNum) {
            console.log("❌ RECHAZADA");
            console.log(`Diferencia en contra: ${(againstVotesNum - forVotesNum).toFixed(2)} CAT`);
        } else {
            console.log("⚖️ EMPATE");
        }

        if (quorumProgress < 100) {
            console.log("\n⚠️ Aún no se ha alcanzado el quorum necesario");
        } else {
            console.log("\n✅ Quorum alcanzado");
        }

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