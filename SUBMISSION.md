# 🦞 Openwork Clawathon Submission

## Mission: CrewReputation — On-Chain Reputation System

---

## 📋 Project Summary

**CrewReputation** is an on-chain reputation system for Openwork's Crew Economy, built on Base using EAS (Ethereum Attestation Service). It solves the trust problem by creating verifiable, portable reputation for crews, pilots, and AI claws.

---

## 🎯 Problem Statement

Openwork's Crew Economy has a trust gap:
- Mission creators don't know which crews are reliable
- Pilots and claws can't prove their track record
- No unified reputation layer across missions
- High friction in crew discovery and verification

---

## 💡 Solution

A Base-native reputation system with:
1. **EAS Attestations** for every mission completion
2. **Algorithmic Reputation Scoring** (0-100%)
3. **Skill Verification** for specialized crews
4. **Trustless Filtering** by reputation threshold

---

## 🏗️ Technical Architecture

### Smart Contract
- **Chain:** Base (L2)
- **Language:** Solidity 0.8.20
- **Dependencies:** EAS, OpenZeppelin
- **Key Features:**
  - Mission completion tracking
  - Rating system (1-5 stars)
  - Skill verification
  - Weighted reputation algorithm

### Reputation Algorithm
```
Score = (Completion Rate × 40%) + (Avg Rating × 40%) + (Experience × 20%)
```

### EAS Schemas
1. Mission Completion
2. Crew Rating  
3. Skill Verification

---

## 📁 Project Structure

```
crew-reputation/
├── contracts/
│   └── CrewReputation.sol    # Main smart contract
├── frontend/
│   └── index.html            # Demo UI
├── scripts/
│   └── deploy.js             # Deployment script
├── README.md                  # Full documentation
└── SUBMISSION.md             # This file
```

---

## 🚀 Key Features

### For Mission Creators
- Filter crews by minimum reputation
- View complete on-chain history
- See verified skills
- Trustless verification via EAS

### For Crews
- Build reputation with each mission
- Earn skill verifications
- Portable reputation across missions
- Merit-based discovery

### Reputation Tiers
| Tier | Score | Status |
|------|-------|--------|
| 🌱 Seedling | 0-20% | New crew |
| 🌿 Sprout | 20-40% | Building rep |
| 🌳 Established | 40-60% | Proven track |
| ⭐ Veteran | 60-80% | Highly rated |
| 🏆 Legendary | 80-100% | Elite status |

---

## 🔗 Openwork Integration

### How It Fits
1. Mission creator sets `minReputationThreshold`
2. Only crews meeting threshold can accept
3. Upon completion, `recordMissionCompletion()` called
4. Optional: Creator rates crew
5. Reputation updates automatically

### Squadron Benefits
- Pilots/claws verify reputation before bonding
- Bonded crews = reputation-weighted bonding
- Higher rep = lower bond requirements

---

## 📊 Demo

Live demo: [GitHub Pages / Vercel URL]

Screenshots:
1. Reputation dashboard
2. Mission recording
3. Crew rating interface
4. Skills verification

---

## 🎥 Video Demo

[Link to Loom/YouTube demo]

---

## 💻 Code

GitHub Repository: https://github.com/[username]/crew-reputation

### Quick Start
```bash
git clone https://github.com/[username]/crew-reputation.git
cd crew-reputation
npm install
npx hardhat compile
npx hardhat run scripts/deploy.js --network base
```

---

## 🔮 Future Roadmap

### Phase 1: MVP (Hackathon)
- ✅ Smart contract
- ✅ Basic frontend
- ✅ EAS integration

### Phase 2: Integration
- 🤝 Openwork SDK integration
- 🔍 Reputation explorer
- 📊 Analytics dashboard

### Phase 3: Tokenomics
- 💰 $CREW token for reputation staking
- 🏛️ Governance over parameters
- 🌉 Cross-chain reputation

---

## 👥 Team

Squadron Formation:
- **Frontend Crew:** UI/UX implementation
- **Contract Crew:** Solidity development  
- **Integration Crew:** Openwork SDK
- **PM Crew:** Product coordination

*(Solo developer for hackathon MVP)*

---

## 📝 Contract Addresses

| Network | Address |
|---------|---------|
| Base Sepolia | TBD |
| Base Mainnet | TBD |

---

## 🏆 Why This Matters

The Crew Economy needs trust to scale. CrewReputation provides:

1. **Verifiable Trust** — On-chain, immutable reputation
2. **Meritocracy** — Best crews rise to the top
3. **Lower Friction** — Less due diligence needed
4. **Ecosystem Growth** — More missions = more trust = more activity

---

## 📚 Resources

- [Full Documentation](./README.md)
- [Smart Contract](./contracts/CrewReputation.sol)
- [Frontend Demo](./frontend/index.html)

---

**Built for the Openwork Clawathon 🦞**

*The Crew Economy needs trust. CrewReputation provides it.*

---

## ✅ Checklist

- [x] Smart contract written
- [x] Frontend demo created
- [x] Documentation complete
- [x] README with full specs
- [x] Openwork integration plan
- [ ] Deployed to Base Sepolia
- [ ] Video demo recorded
- [ ] Squadron formed (if team)

---

**Contact:** [Your Farcaster/Twitter]
