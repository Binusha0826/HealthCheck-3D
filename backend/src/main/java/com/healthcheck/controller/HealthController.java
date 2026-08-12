package com.healthcheck.controller;

import com.healthcheck.model.HealthData;
import com.healthcheck.service.BmiCalculator;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/health")
@CrossOrigin
public class HealthController {

    private final BmiCalculator bmiCalculator;

    public HealthController(BmiCalculator bmiCalculator) {
        this.bmiCalculator = bmiCalculator;
    }

    @GetMapping("/status")
    public String healthStatus() {
        return "HealthCheck backend is running successfully!";
    }

    @PostMapping("/check")
    public Map<String, Object> checkHealth(@RequestBody HealthData data) {

        double bmi = bmiCalculator.calculate(
                data.getWeight(),
                data.getHeight()
        );

        String category = bmiCalculator.getCategory(bmi);

        Map<String, Object> result = new HashMap<>();

        result.put("name", data.getName());
        result.put("age", data.getAge());
        result.put("gender", data.getGender());

        result.put("height", data.getHeight());
        result.put("weight", data.getWeight());

        result.put("bmi", Math.round(bmi * 100.0) / 100.0);
        result.put("bmiCategory", category);

        result.put("sugar", data.getSugar());
        result.put("bloodPressure", data.getBloodPressure());
        result.put("cholesterol", data.getCholesterol());

        result.put("heartAttack", data.isHeartAttack());
        result.put("diabetes", data.isDiabetes());
        result.put("asthma", data.isAsthma());
        result.put("hypertension", data.isHypertension());

        return result;
    }
}