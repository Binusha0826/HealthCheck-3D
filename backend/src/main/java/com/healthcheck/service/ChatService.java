package com.healthcheck.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

@Service
public class ChatService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final ObjectMapper objectMapper = new ObjectMapper();

    private final HttpClient httpClient = HttpClient.newHttpClient();

    public String askHealthAI(String userMessage) {

        try {

            String prompt = """
                    You are HealthCheck AI, a friendly general wellness assistant.

                    Your purpose is to provide general educational information
                    about healthy lifestyle, exercise, nutrition, sleep,
                    hydration and general wellness.

                    Important rules:
                    - Do not diagnose diseases.
                    - Do not claim that your answer is 100%% accurate.
                    - Do not prescribe medication.
                    - For serious symptoms or medical concerns, recommend
                      consulting a qualified doctor or healthcare professional.
                    - Keep answers clear and easy to understand.
                    - Give practical and safe general wellness advice.

                    User question:
                    """ + userMessage;

            // Correct Gemini request structure
            var root = objectMapper.createObjectNode();

            var contents = root.putArray("contents");

            var content = contents.addObject();

            var parts = content.putArray("parts");

            parts.addObject().put("text", prompt);

            String jsonBody = objectMapper.writeValueAsString(root);

            String url =
                    "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent";

            HttpRequest request = HttpRequest.newBuilder()
                    .uri(URI.create(url))
                    .header("Content-Type", "application/json")
                    .header("x-goog-api-key", apiKey)
                    .POST(HttpRequest.BodyPublishers.ofString(jsonBody))
                    .build();

            HttpResponse<String> response =
                    httpClient.send(
                            request,
                            HttpResponse.BodyHandlers.ofString()
                    );

            if (response.statusCode() != 200) {

                System.out.println(
                        "Gemini API Error: "
                                + response.statusCode()
                                + " "
                                + response.body()
                );

                return "Sorry, I couldn't connect to the AI assistant right now.";
            }

            JsonNode rootResponse =
                    objectMapper.readTree(response.body());

            JsonNode textNode =
                    rootResponse
                            .path("candidates")
                            .path(0)
                            .path("content")
                            .path("parts")
                            .path(0)
                            .path("text");

            if (textNode.isMissingNode()) {

                System.out.println(
                        "Gemini response did not contain text: "
                                + response.body()
                );

                return "Sorry, I couldn't generate a response.";
            }

            return textNode.asText();

        } catch (Exception e) {

            e.printStackTrace();

            return "Sorry, something went wrong while contacting the AI assistant.";
        }
    }
}