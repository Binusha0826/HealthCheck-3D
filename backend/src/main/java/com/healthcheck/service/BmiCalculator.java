package com.healthcheck.service;

import org.springframework.stereotype.Service;

@Service
public class BmiCalculator {

    public double calculate(double weight, double heightCm) {

        if (weight <= 0 || heightCm <= 0) {
            return 0;
        }

        double heightMeters = heightCm / 100.0;

        return weight / (heightMeters * heightMeters);
    }

    public String getCategory(double bmi) {

        if (bmi < 18.5) {
            return "Underweight";
        } else if (bmi < 25) {
            return "Healthy Weight";
        } else if (bmi < 30) {
            return "Overweight";
        } else {
            return "Obesity";
        }
    }
}