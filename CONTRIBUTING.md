# Guía de Contribución CAT DAO

## 👋 ¡Bienvenido!

Gracias por considerar contribuir a la DAO del Club Argentino de Tecnología. Este documento provee los lineamientos y mejores prácticas para contribuir al proyecto.

## 🌱 Cómo Empezar

1. **Fork del repositorio**
2. **Crear una nueva branch**:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```
   O
   ```bash
   git checkout -b fix/error-a-corregir
   ```

## 💻 Estándares de Código

### Smart Contracts
- Seguir el estilo de Solidity definido por OpenZeppelin
- Documentar todas las funciones públicas con NatSpec
- Incluir pruebas para cada nueva funcionalidad
- Mantener la compatibilidad con las versiones existentes

### Scripts
- Usar async/await en lugar de callbacks
- Manejar errores apropiadamente
- Incluir logs claros y descriptivos
- Documentar los parámetros necesarios

## 🧪 Testing

Antes de enviar un PR:
1. Ejecutar todos los tests
   ```bash
   npx hardhat test
   ```
2. Asegurarse de que los contratos compilan sin warnings
   ```bash
   npx hardhat compile
   ```
3. Verificar el formato del código
   ```bash
   npm run lint
   ```

## 📝 Proceso de Pull Request

1. **Descripción Clara**
   - Explicar qué cambia y por qué
   - Incluir cualquier dependencia nueva
   - Mencionar issues relacionados

2. **Checklist**
   - [ ] Tests agregados/actualizados
   - [ ] Documentación actualizada
   - [ ] Código formateado
   - [ ] Branch actualizada con main

## 🔍 Review Process

- Cada PR necesita al menos una aprobación
- Los reviewers se asignarán automáticamente
- El CI debe pasar antes del merge

## 🚨 Reportar Bugs

Si encontrás un bug:
1. Usar el template de issues
2. Incluir pasos para reproducir
3. Mencionar el entorno (red, versiones)
4. Si es un problema de seguridad, reportar en privado a @andycufari

## 🌈 Tipos de Contribuciones Bienvenidas

- Fixes de bugs
- Mejoras de documentación
- Nuevas features
- Optimizaciones de gas
- Mejoras de UX/UI
- Tests adicionales

## ⚖️ Consideraciones de Governanza

Cambios significativos en:
- Parámetros de governanza
- Distribución de tokens
- Mecanismos de votación

Deben ser propuestos y aprobados a través de la DAO antes de su implementación.

## 📚 Recursos Útiles

- [Documentación de OpenZeppelin](https://docs.openzeppelin.com/)
- [Mejores Prácticas de Solidity](https://consensys.github.io/smart-contract-best-practices/)
- [Guía de Testing de Hardhat](https://hardhat.org/tutorial/testing-contracts.html)

## 💬 Comunidad

- Discord: [Club Argentino de Tecnología](https://discord.gg/DdSZxmr6Ay)
- X: [@andycufari](https://x.com/andycufari)

## 🙏 Código de Conducta

Nos adherimos al [Contributor Covenant](https://www.contributor-covenant.org/). Por favor, leelo antes de participar.

---

¿Preguntas? Contactá a @andycufari