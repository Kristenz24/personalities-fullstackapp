package com.mingoy.personality;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonalityRepository extends JpaRepository<Personality, Long> {
    // Custom query methods can be added here if needed
}