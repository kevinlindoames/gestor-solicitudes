package com.kevinlindo.requestsapi.request.dto;

import com.kevinlindo.requestsapi.request.RequestPriority;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public class CreateRequestRequest {

    @NotBlank
    @Size(min = 3, max = 80)
    private String title;

    @NotBlank
    @Size(min = 10, max = 500)
    private String description;

    @NotBlank
    @Size(min = 3, max = 80)
    private String requester;

    @NotBlank
    private String category;

    @NotNull
    private RequestPriority priority;

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getRequester() {
        return requester;
    }

    public String getCategory() {
        return category;
    }

    public RequestPriority getPriority() {
        return priority;
    }
}