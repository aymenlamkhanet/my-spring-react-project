package com.example.Cars.Service;

import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.*;

@Service
public class ImageFileService {

    private final String TARGET_DIR = "./Cars/Cars/src/main/resources/static/images/";

    public String moveImageFile(String sourcePath) {
        try {
            // Log source path
            System.out.println("Source Path: " + sourcePath);

            // Check if source file exists
            Path source = Paths.get(sourcePath);
            if (!Files.exists(source)) {
                return "Error: Source file does not exist - " + sourcePath;
            }

            // Ensure target directory exists
            Path targetDir = Paths.get(TARGET_DIR);
            if (!Files.exists(targetDir)) {
                Files.createDirectories(targetDir);
            }

            // Get the file name and define target path
            String fileName = source.getFileName().toString();
            Path target = targetDir.resolve(fileName);

            // Copy file
            Files.copy(source, target, StandardCopyOption.REPLACE_EXISTING);

            // Log target path
            System.out.println("File moved to: " + target.toString());

            // Return relative path
            return "/images/" + fileName;

        } catch (IOException e) {
            e.printStackTrace();
            return "Error: " + e.getMessage();
        }
    }
}
