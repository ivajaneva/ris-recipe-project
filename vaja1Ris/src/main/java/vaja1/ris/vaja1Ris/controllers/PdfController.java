package vaja1.ris.vaja1Ris.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import vaja1.ris.vaja1Ris.services.PdfExportService;
@RestController

public class PdfController {
    @Autowired
    private PdfExportService pdfExportService;

    @GetMapping("/recipes/{id}/export/pdf")
    public ResponseEntity<byte[]> exportRecipePdf(@PathVariable Long id) {
        try {
            byte[] pdf = pdfExportService.generatePdfForRecipe(id);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("attachment", "recipe_" + id + ".pdf");

            return new ResponseEntity<>(pdf, headers, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}
