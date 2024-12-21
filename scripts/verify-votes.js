// scripts/verify-votes.js
async function main() {
    try {
        // Dirección del token desplegado
        const tokenAddress = process.env.TOKEN_ADDRESS;
        const [signer] = await ethers.getSigners();

        console.log("Verificando token CAT...");
        console.log("Dirección del token:", tokenAddress);
        console.log("Cuenta:", signer.address);

        // Obtener el contrato
        const Token = await ethers.getContractFactory("CATToken");
        const token = Token.attach(tokenAddress);

        // Verificar implementación de interfaces
        console.log("\nVerificando funciones de ERC20Votes:");
        
        // 1. Verificar balance
        const balance = await token.balanceOf(signer.address);
        console.log("Balance:", ethers.formatEther(balance), "CAT");

        // 2. Verificar delegados actuales
        const delegates = await token.delegates(signer.address);
        console.log("Delegado actual:", delegates);

        // 3. Verificar poder de voto
        const votingPower = await token.getVotes(signer.address);
        console.log("Poder de voto actual:", ethers.formatEther(votingPower), "CAT");

        // 4. Intentar delegar
        console.log("\nIntentando delegar votos...");
        const tx = await token.delegate(signer.address);
        console.log("Transacción de delegación enviada:", tx.hash);
        await tx.wait();
        
        // 5. Verificar poder de voto después de delegar
        const newVotingPower = await token.getVotes(signer.address);
        console.log("Nuevo poder de voto:", ethers.formatEther(newVotingPower), "CAT");

    } catch (error) {
        console.error("Error durante la verificación:", error);
        throw error;
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });