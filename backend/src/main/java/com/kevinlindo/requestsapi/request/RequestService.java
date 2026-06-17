package com.kevinlindo.requestsapi.request;

import com.kevinlindo.requestsapi.request.dto.CreateRequestRequest;
import com.kevinlindo.requestsapi.request.dto.UpdateRequestPriorityRequest;
import com.kevinlindo.requestsapi.request.dto.UpdateRequestRequest;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;

@Service
public class RequestService {

    private final List<Request> requests = new ArrayList<>();

    public RequestService() {
        Instant now = Instant.now();

        requests.add(new Request(
                "REQ-001",
                "Acceso a plataforma interna",
                "Solicitud de acceso a la plataforma interna para revisar reportes del área.",
                "Kevin Lindo",
                "Accesos",
                RequestPriority.HIGH,
                RequestStatus.PENDING,
                now,
                now
        ));

        requests.add(new Request(
                "REQ-002",
                "Soporte para equipo lento",
                "El equipo presenta lentitud al iniciar sesión y abrir herramientas internas.",
                "María López",
                "Soporte técnico",
                RequestPriority.MEDIUM,
                RequestStatus.IN_REVIEW,
                now,
                now
        ));
    }

    public List<Request> findAll() {
        return requests
                .stream()
                .sorted(Comparator.comparing(Request::getCreationDate).reversed())
                .toList();
    }

    public Optional<Request> findById(String id) {
        return requests.stream()
                .filter(request -> request.getId().equalsIgnoreCase(id))
                .findFirst();
    }

    public Request create(CreateRequestRequest payload) {
        Instant now = Instant.now();

        Request request = new Request(
                generateNextId(),
                payload.getTitle(),
                payload.getDescription(),
                payload.getRequester(),
                payload.getCategory(),
                payload.getPriority(),
                RequestStatus.PENDING,
                now,
                now
        );

        requests.add(0, request);

        return request;
    }

    public Optional<Request> update(String id, UpdateRequestRequest payload) {
        return findById(id).map(request -> {
            request.update(
                    payload.getTitle(),
                    payload.getDescription(),
                    payload.getRequester(),
                    payload.getCategory(),
                    payload.getPriority(),
                    payload.getStatus()
            );

            return request;
        });
    }

    public Optional<Request> updatePriority(
            String id,
            UpdateRequestPriorityRequest payload
    ) {
        return findById(id).map(request -> {
            request.updatePriority(payload.getPriority());
            return request;
        });
    }

    public Optional<Request> close(String id) {
        return findById(id).map(request -> {
            request.close();
            return request;
        });
    }

    private String generateNextId() {
        int nextNumber = requests.size() + 1;
        return "REQ-%03d".formatted(nextNumber);
    }
}