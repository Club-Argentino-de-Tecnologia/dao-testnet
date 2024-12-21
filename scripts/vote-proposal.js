// scripts/simple-vote.js
async function main() {
    try {
        const [signer] = await ethers.getSigners();
        console.log("Usando cuenta:", signer.address);

        const governorAddress = process.env.GOVERNOR_ADDRESS;
        const Governor = await ethers.getContractFactory("CATGovernor");
        const governor = Governor.attach(governorAddress);

        const proposalId = "62363289856984037396400653264550876904124485917437541152330187916735411493250";

        console.log("\nIntentando votar a favor...");
        const tx = await governor.castVote(
            proposalId,
            1, // 1 = a favor
            {
                gasLimit: 2000000,
                gasPrice: ethers.parseUnits("50", "gwei")
            }
        );
        
        console.log("Transacción de voto enviada:", tx.hash);
        const receipt = await tx.wait();
        console.log("Transacción confirmada en el bloque:", receipt.blockNumber);

        // Verificar el resultado
        const { againstVotes, forVotes, abstainVotes } = await governor.proposalVotes(proposalId);
        console.log("\nRecuento de votos:");
        console.log("A favor:", ethers.formatEther(forVotes), "CAT");
        console.log("En contra:", ethers.formatEther(againstVotes), "CAT");
        console.log("Abstenciones:", ethers.formatEther(abstainVotes), "CAT");

    } catch (error) {
        console.error("\nError en la transacción:");
        if (error.error) {
            console.error("Mensaje de error:", error.error.message);
            console.error("Data:", error.error.data);
        } else {
            console.error(error);
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });