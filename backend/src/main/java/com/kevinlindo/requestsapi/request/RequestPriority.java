package com.kevinlindo.requestsapi.request;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum RequestPriority {
    LOW("low"),
    MEDIUM("medium"),
    HIGH("high"),
    CRITICAL("critical");

    private final String value;

    RequestPriority(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }

    @JsonCreator
    public static RequestPriority fromValue(String value) {
        for (RequestPriority priority : RequestPriority.values()) {
            if (priority.value.equalsIgnoreCase(value)) {
                return priority;
            }
        }

        throw new IllegalArgumentException("Prioridad inválida: " + value);
    }
}