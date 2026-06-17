package com.kevinlindo.requestsapi.request;

import java.time.Instant;

public class Request {

    private String id;
    private String title;
    private String description;
    private String requester;
    private String category;
    private RequestPriority priority;
    private RequestStatus status;
    private Instant creationDate;
    private Instant lastChangeDate;

    public Request() {
    }

    public Request(
            String id,
            String title,
            String description,
            String requester,
            String category,
            RequestPriority priority,
            RequestStatus status,
            Instant creationDate,
            Instant lastChangeDate
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.requester = requester;
        this.category = category;
        this.priority = priority;
        this.status = status;
        this.creationDate = creationDate;
        this.lastChangeDate = lastChangeDate;
    }

    public String getId() {
        return id;
    }

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

    public RequestStatus getStatus() {
        return status;
    }

    public Instant getCreationDate() {
        return creationDate;
    }

    public Instant getLastChangeDate() {
        return lastChangeDate;
    }

    public void update(
            String title,
            String description,
            String requester,
            String category,
            RequestPriority priority,
            RequestStatus status
    ) {
        this.title = title;
        this.description = description;
        this.requester = requester;
        this.category = category;
        this.priority = priority;
        this.status = status;
        this.lastChangeDate = Instant.now();
    }

    public void updatePriority(RequestPriority priority) {
        this.priority = priority;
        this.lastChangeDate = Instant.now();
    }

    public void close() {
        this.status = RequestStatus.CLOSED;
        this.lastChangeDate = Instant.now();
    }
}