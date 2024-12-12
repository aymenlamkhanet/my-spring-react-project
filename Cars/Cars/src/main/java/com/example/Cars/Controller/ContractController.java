package com.example.Cars.Controller;


import com.example.Cars.Model.Contract;
import com.example.Cars.Service.ContractService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/Contract")
public class ContractController {

    private final ContractService contractService;

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
