package com.example.Cars.Controller;


import com.example.Cars.Model.Contract;
import com.example.Cars.Service.ContractService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpStatus;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@RestController
@RequestMapping("/Contract")
public class ContractController {

    private final ContractService contractService;
    private final String UPLOAD_DIR = "./Cars/Cars/src/main/resources/static/pdfs/";

    public ContractController(ContractService contractService) {
        this.contractService = contractService;
    }

    @PostMapping("/save-pdf")
    public ResponseEntity<String> savePdfFile(@RequestParam("file") MultipartFile file) {
        try {
            // Create directory if it doesn't exist
            File directory = new File(UPLOAD_DIR);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            // Save the file
            Path filePath = Paths.get(UPLOAD_DIR + file.getOriginalFilename());
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            return ResponseEntity.ok("File uploaded successfully");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to upload file: " + e.getMessage());
        }
    }


    @PostMapping("/add")
    public Contract createContract(@RequestBody Contract contract) {
        return contractService.createContract(contract);
    }

    @GetMapping("/{id}")
    public Optional<Contract> getContractById(@PathVariable Long id) {
        return contractService.getContractById(id);
    }

    @GetMapping("/AllContract")
    public List<Contract> getAllContracts() {
        return contractService.getAllContracts();
    }

    @PutMapping("/update/{id}")
    public Contract updateContract(@PathVariable Long id, @RequestBody Contract contractDetails) {
        return contractService.updateContract(id, contractDetails);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteContract(@PathVariable Long id) {
        contractService.deleteContract(id);
        return "Contract with ID " + id + " deleted successfully!";
    }

}
