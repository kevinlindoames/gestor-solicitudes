package com.kevinlindo.requestsapi.request;

import com.kevinlindo.requestsapi.request.dto.CreateRequestRequest;
import com.kevinlindo.requestsapi.request.dto.UpdateRequestPriorityRequest;
import com.kevinlindo.requestsapi.request.dto.UpdateRequestRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {
        "http://localhost:3000",
        "http://127.0.0.1:3000"
})
@RestController
@RequestMapping("/api/v1/solicitudes")
public class RequestController {

    private final RequestService requestService;

    public RequestController(RequestService requestService) {
        this.requestService = requestService;
    }

    @GetMapping
    public List<Request> findAll() {
        return requestService.findAll();
    }

    @PostMapping
    public ResponseEntity<Request> create(
            @Valid @RequestBody CreateRequestRequest payload
    ) {
        Request createdRequest = requestService.create(payload);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdRequest);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Request> findById(@PathVariable String id) {
        return requestService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Request> update(
            @PathVariable String id,
            @Valid @RequestBody UpdateRequestRequest payload
    ) {
        return requestService.update(id, payload)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Request> updatePriority(
            @PathVariable String id,
            @Valid @RequestBody UpdateRequestPriorityRequest payload
    ) {
        return requestService.updatePriority(id, payload)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Request> close(@PathVariable String id) {
        return requestService.close(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}