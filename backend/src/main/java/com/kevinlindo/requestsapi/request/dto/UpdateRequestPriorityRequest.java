package com.kevinlindo.requestsapi.request.dto;

import com.kevinlindo.requestsapi.request.RequestPriority;
import jakarta.validation.constraints.NotNull;

public class UpdateRequestPriorityRequest {

    @NotNull
    private RequestPriority priority;

    public RequestPriority getPriority() {
        return priority;
    }
}