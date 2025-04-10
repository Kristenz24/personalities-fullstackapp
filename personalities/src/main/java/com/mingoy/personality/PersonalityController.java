package com.mingoy.personality;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mingoy/personalities")
@CrossOrigin(origins = "http://localhost:5173")
public class PersonalityController {

    @Autowired
    private PersonalityRepository personalityRepository;

    // GET all personalities
    @GetMapping
    public List<Personality> getAllPersonalities() {
        return personalityRepository.findAll();
    }

    // GET single personality by ID
    @GetMapping("/{id}")
    public Personality getPersonalityById(@PathVariable Long id) {
        return personalityRepository.findById(id).orElse(null);
    }

    // GET count of personalities
    @GetMapping("/count")
    public long getPersonalityCount() {
        return personalityRepository.count();
    }

    // POST - Create new personality
    @PostMapping
    public Personality createPersonality(@RequestBody Personality newPersonality) {
        return personalityRepository.save(newPersonality);
    }

    // POST - Bulk create personalities
    @PostMapping("/bulk")
    public List<Personality> createBulkPersonalities(@RequestBody List<Personality> newPersonalities) {
        return personalityRepository.saveAll(newPersonalities);
    }

    // DELETE personality by ID
    @DeleteMapping("/{id}")
    public String deletePersonalityById(@PathVariable Long id) {
        if (personalityRepository.existsById(id)) {
            personalityRepository.deleteById(id);
            return "Personality with ID " + id + " has been deleted successfully.";
        } else {
            return "Personality with ID " + id + " not found.";
        }
    }
}
