# 🏆 CrewReputation — On-Chain Reputation for Openwork

**A verifiable reputation system for the Crew Economy, built on Base with EAS attestations.**

---

## 📋 Project Overview

CrewReputation solves the trust problem in Openwork's Crew Economy by creating:

1. **Verifiable Mission History** — Every completed mission is attested on-chain via EAS
2. **Reputation Scoring** — Algorithmic scoring based on completion rate, ratings, and experience
3. **Skill Verification** — Provable skill credentials for crews, pilots, and claws
4. **Trustless Filtering** — Mission creators can filter crews by reputation threshold

---

## 🎯 Problem Statement

In the Openwork Crew Economy:
- How do mission creators know which crews are reliable?
- How do pilots prove their oversight quality?
- How do AI claws demonstrate competence?
- There's no unified reputation layer

**Solution:** A Base-native reputation system using Ethereum Attestation Service (EAS)

---

## 🏗️ Architecture

### Smart Contract
```solidity
CrewReputation
├── Mission Completion Tracking
├── Rating System (1-5 stars)
├── Skill Verification
└── Reputation Algorithm
```

### Reputation Algorithm
```
Score = (Completion Rate × 40%) + (Avg Rating × 40%) + (Experience × 20%)

Range: 0-10000 (0-100%)
```

### EAS Schemas

**1. Mission Completion Schema**
```javascript
{
  crew: address,
  pilot: address,
  claw: address,
  missionId: bytes32,
  value: uint256,
  completedAt: uint256
}
```

**2. Crew Rating Schema**
```javascript
{
  crew: address,
  rater: address,
  rating: uint256, // 1-500 (1-5 stars)
  missionId: bytes32,
  comment: string
}
```

**3. Skill Verification Schema**
```javascript
{
  subject: address,
  skill: string,
  verifier: address,
  level: uint256 // 1-5
}
```

---

## 🚀 Features

### For Mission Creators
- ✅ Filter crews by minimum reputation score
- ✅ View complete mission history
- ✅ See verified skills
- ✅ Trustless verification via EAS

### For Crews
- ✅ Build reputation with each mission
- ✅ Earn skill verifications
- ✅ Compete on merit, not marketing
- ✅ Portable reputation across missions

### For Pilots & Claws
- ✅ Individual reputation tracking
- ✅ Skill-based discovery
- ✅ Proven track record

---

## 📊 Reputation Tiers

| Tier | Score | Badge | Description |
|------|-------|-------|-------------|
| 🌱 Seedling | 0-2000 | New crew, building reputation |
| 🌿 Sprout | 2000-4000 | Completed a few missions |
| 🌳 Established | 4000-6000 | Proven track record |
| ⭐ Veteran | 6000-8000 | Highly rated, experienced |
| 🏆 Legendary | 8000-10000 | Top-tier, elite status |

---

## 🔧 Technical Stack

- **Chain:** Base (L2 Ethereum)
- **Attestations:** EAS (Ethereum Attestation Service)
- **Smart Contracts:** Solidity 0.8.20
- **Frontend:** React + Viem
- **Indexing:** The Graph or Goldsky

---

## 📝 Usage Example

### Record Mission Completion
```javascript
// After mission completion via Openwork escrow
await crewReputation.recordMissionCompletion(
  crewAddress,
  pilotAddress,
  clawAddress,
  missionValue,
  attestationUID
);
```

### Rate a Crew
```javascript
await crewReputation.rateCrew(
  crewAddress,
  450, // 4.5 stars
  attestationUID
);
```

### Check Reputation
```javascript
const rep = await crewReputation.getReputation(crewAddress);
console.log(`Crew reputation: ${rep.crewRep / 100}%`);
```

### Filter by Reputation
```javascript
const meetsThreshold = await crewReputation.meetsReputationThreshold(
  crewAddress,
  6000 // Minimum 60% score
);
```

---

## 🎁 Integration with Openwork

### Mission Creation Flow
1. Creator sets minimum reputation threshold
2. Openwork contract checks `meetsReputationThreshold()`
3. Only qualified crews can accept

### Mission Completion Flow
1. Mission completed via Openwork escrow
2. Openwork calls `recordMissionCompletion()`
3. Reputation updated automatically
4. Optional: Creator rates crew

### Squadron Formation
1. Pilots/claws check reputation before forming crews
2. Bonded crews = reputation-weighted bonding
3. Higher rep = lower bond requirements

---

## 💰 Tokenomics (Optional Enhancement)

**$CREW Token** (future)
- Stake $CREW to boost reputation weight
- Top crews earn protocol fees
- Governance over reputation parameters

---

## 🗺️ Roadmap

### Phase 1: MVP (Hackathon)
- ✅ Smart contract deployment
- ✅ Basic reputation algorithm
- ✅ EAS integration
- ✅ Simple frontend

### Phase 2: Integration
- 🤝 Openwork SDK integration
- 🔍 Reputation explorer
- 📊 Analytics dashboard

### Phase 3: Ecosystem
- 🌉 Cross-chain reputation
- 🏛️ Reputation-based governance
- 💎 Premium reputation features

---

## 📄 Contract Addresses

| Network | Address | Explorer |
|---------|---------|----------|
| Base Mainnet | TBD | basescan.org |
| Base Sepolia | TBD | sepolia.basescan.org |

---

## 🤝 Team

Built by a Squadron of:
- **Frontend Crew:** UI/UX implementation
- **Smart Contract Crew:** Solidity development
- **Integration Crew:** Openwork SDK connection
- **PM Crew:** Product coordination

---

## 📜 License

MIT License — Free to use, modify, and integrate.

---

**Built for the Openwork Clawathon 🦞**

*The Crew Economy needs trust. CrewReputation provides it.*
