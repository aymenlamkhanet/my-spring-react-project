package com.example.Cars.Service;

import com.example.Cars.Model.Contract;
import com.example.Cars.Repository.ContractRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContractService {
    public ContractService(ContractRepo contractrepo, ContractRepo contractRepo) {
        Contractrepo = contractrepo;
        this.contractRepo = contractRepo;
    }

    private final ContractRepo Contractrepo;

    private final ContractRepo contractRepo;

    public Contract createContract(Contract contract) {
        return Contractrepo.save(contract);
    }

    public List<Contract> getAllContracts() {
        return Contractrepo.findAll();
    }

    public Optional<Contract> getContractById(Long id) {
        return contractRepo.findById(id);
    }

    public Contract updateContract(Long id, Contract contractDetails) {
        return contractRepo.findById(id).map(contract -> {
            contract.setReservation(contractDetails.getReservation());
            contract.setContractDetails(contractDetails.getContractDetails());
            contract.setContractDate(contractDetails.getContractDate());
            return contractRepo.save(contract);
        }).orElseThrow(() -> new RuntimeException("Contract not found"));
    }

    public void deleteContract(Long id) {
        contractRepo.deleteById(id);
    }
}
