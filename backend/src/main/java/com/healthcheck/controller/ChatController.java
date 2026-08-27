package com.healthcheck.controller;

import com.healthcheck.service.ChatService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin
public class ChatController {

    private final ChatService chatService;

    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping
    public Map<String, String> chat(@RequestBody Map<String, String> request) {

        String message = request.get("message");

        if (message == null || message.trim().isEmpty()) {
            return Map.of(
                    "reply",
                    "Please enter a question first."
            );
        }

        String reply = chatService.askHealthAI(message);

        return Map.of(
                "reply",
                reply
        );
    }
}