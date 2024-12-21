// scripts/test-propose.js
async function main() {
    try {
        const [signer] = await ethers.getSigners();
        console.log("Usando cuenta:", signer.address);

        const governorAddress = process.env.GOVERNOR_ADDRESS;
        const Governor = await ethers.getContractFactory("CATGovernor");
        const governor = Governor.attach(governorAddress);

        console.log("Creando propuesta de prueba...");
        
        // Crear una propuesta que no haga nada (solo para probar)
        const targets = [governorAddress]; // Dirección del contrato
        const values = ["0"];  // Sin envío de ETH
        const calldatas = [governor.interface.encodeFunctionData("quorum", [0])]; // Una llamada de ejemplo
        const description = "Propuesta de Prueba: Verificacion del Sistema de Gobernanza del CAT";

        // Obtener el bloque actual
        const currentBlock = await ethers.provider.getBlockNumber();
        console.log("Bloque actual:", currentBlock);

        // Verificar poder de voto en el bloque actual
        const votingPower = await governor.getVotes(signer.address, currentBlock - 1);
        console.log("Poder de voto actual:", ethers.formatEther(votingPower), "CAT");

        // Codificar los datos de la propuesta
        const proposeTx = await governor.propose.populateTransaction(
            targets,
            values,
            calldatas,
            description
        );

        console.log("Datos de la transacción:", proposeTx.data);

        console.log("Enviando propuesta...");
        const tx = await governor.propose(
            targets,
            values,
            calldatas,
            description,
            {
                gasLimit: 2000000,
                gasPrice: ethers.parseUnits("50", "gwei")
            }
        );

        console.log("Transacción enviada:", tx.hash);
        console.log("Esperando confirmación...");
        
        const receipt = await tx.wait();
        console.log("Propuesta creada en el bloque:", receipt.blockNumber);
        
        // Obtener el ID de la propuesta
        const descriptionHash = ethers.id(description);
        const proposalId = await governor.hashProposal(targets, values, calldatas, descriptionHash);
        console.log("ID de la propuesta:", proposalId);
        
    } catch (error) {
        console.log("Error completo:", error);
        
        if (error.error) {
            console.log("Error interno:", error.error);
            if (error.error.data) {
                console.log("Error data:", error.error.data);
            }
        }
        
        if (error.transaction) {
            console.log("Datos de la transacción que falló:", {
                to: error.transaction.to,
                from: error.transaction.from,
                data: error.transaction.data
            });
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });