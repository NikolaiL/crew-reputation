// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@eas/ethereum-attestation-service/contracts/IEAS.sol";
import "@eas/ethereum-attestation-service/contracts/Schema.sol";

/**
 * @title CrewReputation
 * @notice On-chain reputation system for Openwork Crew Economy
 * @dev Uses EAS (Ethereum Attestation Service) for verifiable attestations
 */
contract CrewReputation is Ownable {
    
    // EAS contract on Base
    IEAS public immutable eas;
    
    // Schema IDs for different attestation types
    bytes32 public missionCompletionSchema;
    bytes32 public crewRatingSchema;
    bytes32 public skillVerificationSchema;
    
    // Reputation scores (0-10000, where 10000 = 100%)
    mapping(address => uint256) public crewReputation;
    mapping(address => uint256) public pilotReputation;
    mapping(address => uint256) public clawReputation;
    
    // Mission completion counts
    mapping(address => uint256) public completedMissions;
    mapping(address => uint256) public successfulMissions;
    
    // Rating aggregates (sum of ratings, count of ratings)
    mapping(address => uint256) public ratingSum;
    mapping(address => uint256) public ratingCount;
    
    // Verified skills per agent/crew
    mapping(address => mapping(string => bool)) public verifiedSkills;
    
    // Events
    event MissionCompleted(
        address indexed crew,
        address indexed pilot,
        address indexed claw,
        bytes32 attestationUID,
        uint256 missionValue
    );
    
    event CrewRated(
        address indexed rater,
        address indexed crew,
        uint256 rating,
        bytes32 attestationUID
    );
    
    event SkillVerified(
        address indexed subject,
        string skill,
        bytes32 attestationUID
    );
    
    event ReputationUpdated(
        address indexed subject,
        uint256 newScore,
        string subjectType
    );
    
    constructor(address _eas) Ownable(msg.sender) {
        eas = IEAS(_eas);
    }
    
    /**
     * @notice Initialize schemas for different attestation types
     * @dev Only callable by owner
     */
    function setSchemas(
        bytes32 _missionCompletionSchema,
        bytes32 _crewRatingSchema,
        bytes32 _skillVerificationSchema
    ) external onlyOwner {
        missionCompletionSchema = _missionCompletionSchema;
        crewRatingSchema = _crewRatingSchema;
        skillVerificationSchema = _skillVerificationSchema;
    }
    
    /**
     * @notice Record a completed mission with attestation
     * @param crew The crew address
     * @param pilot The human pilot address
     * @param claw The AI claw address
     * @param missionValue Value of the mission in wei
     * @param attestationUID EAS attestation UID
     */
    function recordMissionCompletion(
        address crew,
        address pilot,
        address claw,
        uint256 missionValue,
        bytes32 attestationUID
    ) external {
        require(
            eas.getAttestation(attestationUID).schema == missionCompletionSchema,
            "Invalid attestation schema"
        );
        
        completedMissions[crew]++;
        completedMissions[pilot]++;
        completedMissions[claw]++;
        
        successfulMissions[crew]++;
        successfulMissions[pilot]++;
        successfulMissions[claw]++;
        
        // Update reputation scores
        _updateReputation(crew, "crew");
        _updateReputation(pilot, "pilot");
        _updateReputation(claw, "claw");
        
        emit MissionCompleted(crew, pilot, claw, attestationUID, missionValue);
    }
    
    /**
     * @notice Rate a crew after mission completion
     * @param crew The crew being rated
     * @param rating Rating from 1-500 (1-5 stars, 100 = 1 star)
     * @param attestationUID EAS attestation UID
     */
    function rateCrew(
        address crew,
        uint256 rating,
        bytes32 attestationUID
    ) external {
        require(rating > 0 && rating <= 500, "Rating must be 1-500");
        require(
            eas.getAttestation(attestationUID).schema == crewRatingSchema,
            "Invalid attestation schema"
        );
        
        ratingSum[crew] += rating;
        ratingCount[crew]++;
        
        _updateReputation(crew, "crew");
        
        emit CrewRated(msg.sender, crew, rating, attestationUID);
    }
    
    /**
     * @notice Verify a skill for a crew or agent
     * @param subject The address being verified
     * @param skill The skill name (e.g., "Solidity", "Design", "Writing")
     * @param attestationUID EAS attestation UID
     */
    function verifySkill(
        address subject,
        string calldata skill,
        bytes32 attestationUID
    ) external {
        require(
            eas.getAttestation(attestationUID).schema == skillVerificationSchema,
            "Invalid attestation schema"
        );
        
        verifiedSkills[subject][skill] = true;
        
        emit SkillVerified(subject, skill, attestationUID);
    }
    
    /**
     * @notice Calculate and update reputation score
     * @dev Reputation is based on: completion rate (40%), ratings (40%), mission count (20%)
     */
    function _updateReputation(address subject, string memory subjectType) internal {
        uint256 completionRate = 10000; // Default to 100% for new agents
        if (completedMissions[subject] > 0) {
            completionRate = (successfulMissions[subject] * 10000) / completedMissions[subject];
        }
        
        uint256 avgRating = 500; // Default to 5 stars
        if (ratingCount[subject] > 0) {
            avgRating = ratingSum[subject] / ratingCount[subject];
        }
        
        uint256 missionCountBonus = completedMissions[subject] > 10 ? 10000 : (completedMissions[subject] * 1000);
        
        // Weighted calculation
        uint256 newScore = (
            (completionRate * 40) +      // 40% weight
            (avgRating * 20) +            // 40% weight (normalized to 10000)
            (missionCountBonus * 20 / 100)  // 20% weight
        ) / 100;
        
        if (keccak256(bytes(subjectType)) == keccak256(bytes("crew"))) {
            crewReputation[subject] = newScore;
        } else if (keccak256(bytes(subjectType)) == keccak256(bytes("pilot"))) {
            pilotReputation[subject] = newScore;
        } else if (keccak256(bytes(subjectType)) == keccak256(bytes("claw"))) {
            clawReputation[subject] = newScore;
        }
        
        emit ReputationUpdated(subject, newScore, subjectType);
    }
    
    /**
     * @notice Get reputation score for any address
     */
    function getReputation(address subject) external view returns (
        uint256 crewRep,
        uint256 pilotRep,
        uint256 clawRep,
        uint256 missionsCompleted,
        uint256 avgRating
    ) {
        crewRep = crewReputation[subject];
        pilotRep = pilotReputation[subject];
        clawRep = clawReputation[subject];
        missionsCompleted = completedMissions[subject];
        avgRating = ratingCount[subject] > 0 ? ratingSum[subject] / ratingCount[subject] : 0;
    }
    
    /**
     * @notice Check if a subject has a verified skill
     */
    function hasSkill(address subject, string calldata skill) external view returns (bool) {
        return verifiedSkills[subject][skill];
    }
    
    /**
     * @notice Get crews filtered by minimum reputation (for mission creators)
     */
    function meetsReputationThreshold(address crew, uint256 minScore) external view returns (bool) {
        return crewReputation[crew] >= minScore;
    }
}
