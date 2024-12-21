# 🏛️ CAT DAO

![Club Argentino de Tecnología](https://clubargentinotecnologia.xyz/cat.png)

La DAO del Club Argentino de Tecnología - Impulsando la innovación tecnológica con impacto social positivo.

## 🚀 Descripción

Este repositorio contiene la implementación de la DAO (Organización Autónoma Descentralizada) del Club Argentino de Tecnología, desplegada en Polygon. Incluye los smart contracts del token CAT y el sistema de gobernanza, junto con scripts de utilidad para la gestión de la DAO.

## 🛠️ Tecnologías Utilizadas

- Solidity ^0.8.20
- OpenZeppelin Contracts
- Hardhat
- Polygon PoS Chain
- Ethers.js

## 📦 Estructura del Proyecto

```
cat-dao/
├── contracts/
│   ├── CATToken.sol       # Token ERC20 del CAT
│   └── CATGovernor.sol    # Contrato de gobernanza
├── scripts/
│   ├── deploy.js          # Script de despliegue
│   ├── propose.js         # Creación de propuestas
│   ├── vote.js            # Votación
│   ├── transfer.js        # Transferencia de tokens
│   └── monitor.js         # Monitoreo de propuestas
└── test/
    └── governance-test.js # Tests del sistema
```

## 🔧 Configuración del Entorno

```bash
# Clonar el repositorio
git clone https://github.com/clubargentinotecnologia/cat-dao

# Instalar dependencias
cd cat-dao
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus claves
```

## 📝 Contratos Principales

### Token CAT (CATToken.sol)
- ERC20 con capacidades de votación
- Supply total: 1,000,000 CAT
- Dirección en Polygon: `0xBB84E54C4e37bC06958947CEF3fbc8A587A38bb0`

### Gobernanza (CATGovernor.sol)
- Sistema de votación on-chain
- Quorum: 20%
- Período de votación: 1 semana
- Dirección en Polygon: `0xFF9c1C003fAa31E168D15CFF25CDc7F80D266A80`

## 🤝 Cómo Participar

1. **Obtener Tokens CAT**
   - Los tokens se distribuyen a miembros activos del club
   - Añadir el token a MetaMask usando la dirección del contrato

2. **Delegación de Votos**
   ```javascript
   // Ejemplo de delegación
   await catToken.delegate(addressToDelegate);
   ```

3. **Crear Propuestas**
   ```javascript
   // Ejemplo de propuesta
   await governor.propose(targets, values, calldatas, description);
   ```

4. **Votar**
   ```javascript
   // Ejemplo de voto
   await governor.castVote(proposalId, support);
   ```

## 📚 Documentación Adicional

- [White Paper del CAT](https://clubargentinotecnologia.xyz/whitepaper)
- [Sistema de Gobernanza](https://tally.xyz/gov/cat)
- [Guía de Contribución](CONTRIBUTING.md)

## 🔍 Auditorías y Seguridad

Los contratos están basados en implementaciones estándar de OpenZeppelin y han sido verificados en Polygonscan.

## 👥 Contribuir

Las contribuciones son bienvenidas. Por favor, lee nuestra [guía de contribución](CONTRIBUTING.md) antes de enviar PRs.

## 📫 Contacto

Para consultas o sugerencias:
- X: [@andycufari](https://x.com/andycufari)

## ⚖️ Licencia

Este proyecto está licenciado bajo MIT License - ver el archivo [LICENSE](LICENSE) para más detalles.

---
Hecho con 💾 por el Club Argentino de Tecnología